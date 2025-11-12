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
  style,
}: AuthButtonProps) => {
  return (
    <Pressable style={[styles.authButton, style]} onPress={onPress}>
      <Ionicons
        name={icon as keyof typeof Ionicons.glyphMap}
        size={18}
        color={color}
      />
      <Text style={styles.authButtonText}>{title}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  authButton: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 17,
    borderRadius: 12,
    gap: 4,
  },
  authButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
});
export default AuthButton;
