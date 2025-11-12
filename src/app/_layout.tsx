import { Slot, SplashScreen } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync()
export default function RootLayout() {
  return <GestureHandlerRootView style={{flex: 1}}><Slot /></GestureHandlerRootView>;
}
