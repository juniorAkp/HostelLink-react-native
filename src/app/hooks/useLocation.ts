import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { asyncZustandStorage } from "../utils/zutstandStorage";

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  isLoading: boolean;
  error: string | null;

  setLocation: (lat: number, lng: number, address?: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clear: () => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      latitude: null,
      longitude: null,
      address: null,
      isLoading: false,
      error: null,

      setLocation: (lat, lng, address) =>
        set({
          latitude: lat,
          longitude: lng,
          address: address ?? null,
          error: null,
        }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      clear: () =>
        set({ latitude: null, longitude: null, address: null, error: null }),
    }),
    {
      name: "user-location",
      storage: createJSONStorage(() => asyncZustandStorage),
    }
  )
);
