import { Colors, Fonts } from "@/src/app/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Page = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location</Text>

      {/* Use Current Location */}
      <TouchableOpacity style={styles.locationItem}>
        <View style={styles.locationItemIcon}>
          <Ionicons name="locate-outline" size={18} color="#000" />
        </View>
        <Text style={styles.locationText}>Use my current location</Text>
      </TouchableOpacity>

      {/* Saved Addresses */}
      <TouchableOpacity style={styles.locationItem}>
        <View style={styles.locationItemIcon}>
          <Ionicons name="location-outline" size={18} color="#000" />
        </View>
        <View style={styles.addressInfo}>
          <Text style={styles.addressText}>Magdalenenstraße 21</Text>
          <Text style={styles.cityText}>Münster</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.locationItem}>
        <View style={styles.locationItemIcon}>
          <Ionicons name="location-outline" size={18} color="#000" />
        </View>
        <View style={styles.addressInfo}>
          <Text style={styles.addressText}>Schonebecker Weg 57A</Text>
          <Text style={styles.cityText}>Münster</Text>
        </View>
      </TouchableOpacity>

      {/* Add New Address */}
      <TouchableOpacity style={styles.locationItem}>
        <View style={styles.locationItemIcon}>
          <Ionicons name="add" size={18} color="#000" />
        </View>
        <Text style={styles.locationText}>Add new address</Text>
      </TouchableOpacity>

      {/* My Addresses */}
      <TouchableOpacity style={styles.locationItem}>
        <View style={styles.locationItemIcon}>
          <Ionicons name="list-outline" size={18} color="#000" />
        </View>
        <Text style={styles.locationText}>My addresses</Text>
      </TouchableOpacity>

      {/* Browse All Cities */}
      <TouchableOpacity
        style={[styles.locationItem, { paddingLeft: 10, gap: 22 }]}
      >
        <Ionicons name="map-outline" size={18} color="#009de0" />
        <View style={styles.addressInfo}>
          <Text style={styles.browseCitiesText}>Browse all Wolt cities</Text>
          <Text style={styles.browseCitiesSubtext}>Münster</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontFamily: Fonts.brandBold,
    fontSize: 32,
    fontWeight: 900,
    marginBottom: 12,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    gap: 16,
  },
  locationItemIcon: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.light,
  },
  locationText: {
    fontSize: 16,
    color: "#000",
  },
  addressInfo: {
    flex: 1,
  },
  addressText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 2,
  },
  cityText: {
    fontSize: 14,
    color: "#999",
  },
  browseCitiesText: {
    fontSize: 16,
    color: Colors.secondary,
    marginBottom: 2,
  },
  browseCitiesSubtext: {
    fontSize: 14,
    color: Colors.secondary,
  },
});

export default Page;
