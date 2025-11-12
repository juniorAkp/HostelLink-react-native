import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  buttonColor: string;
}
const AuthButton = ({ title, onPress, color, icon }: AuthButtonProps) => {
  return (
    <TouchableOpacity style={styles.authButton} onPress={onPress}>
      <Ionicons
        name={icon as keyof typeof Ionicons.glyphMap}
        size={18}
        color={color}
      />
      <Text style={styles.authButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  authButton: {
    flexDirection: "row",
    backgroundColor: "#4285F4",
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
