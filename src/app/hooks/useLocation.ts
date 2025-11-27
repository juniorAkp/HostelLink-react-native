// stores/useLocationStore.ts
import * as Location from "expo-location";
import { Alert, Linking } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { asyncZustandStorage } from "../utils/zutstandStorage";

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  country: string | null;
  isWatching: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setLocation: (
    lat: number,
    lng: number,
    country?: string,
    address?: string
  ) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  startWatching: () => Promise<void>;
  stopWatching: () => void;
  clear: () => void;

  // Internal
  _subscription: Location.LocationSubscription | null;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set, get) => ({
      latitude: null,
      longitude: null,
      address: null,
      country: null,
      isWatching: false,
      isLoading: false,
      error: null,
      _subscription: null,

      setLocation: (lat, lng, country, address) =>
        set({
          latitude: lat,
          longitude: lng,
          country: country ?? null,
          address: address ?? null,
          error: null,
        }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      clear: () =>
        set({
          latitude: null,
          longitude: null,
          address: null,
          error: null,
          isWatching: false,
        }),

      startWatching: async () => {
        const { isWatching, _subscription } = get();
        if (isWatching) return;

        set({ isLoading: true, error: null });

        try {
          // Enable network
          await Location.enableNetworkProviderAsync();

          //Request permission
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            set({ error: "Location permission denied", isLoading: false });
            // Use Alert with OK/Cancel, and only open settings if OK
            Alert.alert("Location Permission", "Enable location in settings", [
              { text: "Cancel", style: "cancel" },
              { text: "OK", onPress: () => Linking.openSettings() },
            ]);
            return;
          }

          // Start watching
          const subscription = await Location.watchPositionAsync(
            {
              accuracy: Location.Accuracy.BestForNavigation,
              timeInterval: 5000, // every 5 sec
              distanceInterval: 10, // every 10 meters
            },
            async (location) => {
              const { latitude, longitude } = location.coords;

              try {
                const reverse = await Location.reverseGeocodeAsync({
                  latitude,
                  longitude,
                });

                const address = reverse[0].name?.includes("+")
                  ? reverse[0].city
                  : reverse[0]?.name;

                const country = reverse[0].country ?? "";
                get().setLocation(
                  latitude,
                  longitude,
                  country,
                  address ?? undefined
                );
              } catch (err) {
                get().setLocation(latitude, longitude); // fallback
              }
            }
          );

          set({
            _subscription: subscription,
            isWatching: true,
            isLoading: false,
          });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },

      stopWatching: () => {
        const { _subscription } = get();
        if (_subscription) {
          _subscription.remove();
        }
        set({ _subscription: null, isWatching: false });
      },
    }),
    {
      name: "user-location",
      partialize: (state) => ({
        latitude: state.latitude,
        longitude: state.longitude,
        country: state.country,
        address: state.address,
      }),
      storage: createJSONStorage(() => asyncZustandStorage),
    }
  )
);
