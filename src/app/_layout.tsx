import {
  Nunito_400Regular,
  Nunito_700Bold,
  Nunito_900Black,
} from "@expo-google-fonts/nunito";
import NetInfo from "@react-native-community/netinfo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import OfflineScreen from "./components/common/OfflineScreen";
// Prevent splash from hiding too early
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
      retry: 1,
    },
  },
});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_900Black,
  });

  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  // Subscribe to network changes
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isInternetReachable ?? false);
    });

    // Initial check
    NetInfo.fetch().then((state) => {
      setIsOnline(state.isInternetReachable ?? false);
    });

    return () => unsubscribe();
  }, []);

  console.log("is online? ", isOnline);

  // Hide splash when fonts + connection are ready
  useEffect(() => {
    if (fontError) console.error(fontError);

    if (fontsLoaded && isOnline !== null) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, isOnline]);

  // Still loading fonts or checking connection
  if (!fontsLoaded || isOnline === null) {
    return null;
  }

  // Offline  show offline screen
  if (!isOnline) {
    return <OfflineScreen />;
  }

  // Online → render app
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="auto" animated />
        <KeyboardProvider>
          <Slot />
        </KeyboardProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
