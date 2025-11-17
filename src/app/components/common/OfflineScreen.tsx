import { MaterialIcons } from "@expo/vector-icons";

import NetInfo from "@react-native-community/netinfo";
import { Button, StyleSheet, Text, View } from "react-native";
import { Fonts } from "../../constants/theme";
import { useTheme } from "../../hooks/useTheme";

export default function OfflineScreen() {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <MaterialIcons name="wifi-off" size={64} color={colors.muted} />
      <Text style={[styles.title, { color: colors.text }]}>
        No Internet Connection
      </Text>
      <Text style={[styles.message, { color: colors.muted }]}>
        Please check your network and try again.
      </Text>
      <Button title="Retry" onPress={() => NetInfo.refresh()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: Fonts.brandBlack,
    marginTop: 16,
  },
  message: {
    fontSize: 16,
    fontFamily: Fonts.brandBold,
    textAlign: "center",
    marginTop: 8,
  },
});
