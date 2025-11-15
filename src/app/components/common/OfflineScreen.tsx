import { MaterialIcons } from "@expo/vector-icons";

import NetInfo from "@react-native-community/netinfo";
import { Button, StyleSheet, Text, View } from "react-native";
import { Fonts } from "../../constants/theme";

export default function OfflineScreen() {
  return (
    <View style={styles.container}>
      <MaterialIcons name="wifi-off" size={64} color="#999" />
      <Text style={styles.title}>No Internet Connection</Text>
      <Text style={styles.message}>
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
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: Fonts.brandBlack,
    marginTop: 16,
    color: "#333",
  },
  message: {
    fontSize: 16,
    color: "#666",
    fontFamily: Fonts.brandBold,
    textAlign: "center",
    marginTop: 8,
  },
});
