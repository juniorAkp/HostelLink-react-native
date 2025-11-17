import { useColorScheme as useRNColorScheme } from "react-native";
import { DarkColors, LightColors } from "../constants/theme";

export const useTheme = () => {
  const colorScheme = useRNColorScheme();
  const isDark = colorScheme === "dark";

  const colors = isDark ? DarkColors : LightColors;

  return {
    colors,
    isDark,
    colorScheme,
  };
};
