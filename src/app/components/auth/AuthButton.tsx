import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { Colors } from "../../constants/theme";

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  buttonColor: string;
  style?: ViewStyle;
}
const AuthButton = ({
  title,
  onPress,
  color,
  icon,
  buttonColor,
  style,
}: AuthButtonProps) => {
  return (
    <Pressable 
      style={[styles.authButton, { backgroundColor: buttonColor }, style]} 
      onPress={onPress}
    >
      <Ionicons
        name={icon as keyof typeof Ionicons.glyphMap}
        size={20}
        color={color}
      />
      <Text style={[styles.authButtonText, { color }]}>{title}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  authButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  authButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
export default AuthButton;
