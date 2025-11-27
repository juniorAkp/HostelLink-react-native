import useUserStore from "@/src/app/hooks/use-userStore";
import { useOwnerHostel } from "@/src/app/hooks/useHostels";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import HorizontalCard from "../../../components/home/HorizontalCard";
import { Fonts } from "../../../constants/theme";
import { useTheme } from "../../../hooks/useTheme";

const DashBoard = () => {
  const { colors } = useTheme();
  const { user } = useUserStore();

  if (!user) {
    return;
  }

  const { data: ownerHostels } = useOwnerHostel(user?.id);
  const router = useRouter();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <FlatList
        data={ownerHostels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <HorizontalCard hostel={item} />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.muted }]}>
              No hostels found. Create one!
            </Text>
          </View>
        }
      />

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => {
          router.push("/create");
        }}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(15),
  },
  title: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.brandBold,
  },
  listContent: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: verticalScale(20), // Space for FAB
  },
  cardContainer: {
    marginBottom: verticalScale(15),
  },
  fab: {
    position: "absolute",
    bottom: verticalScale(30),
    right: scale(20),
    width: moderateScale(56),
    height: moderateScale(56),
    borderRadius: moderateScale(28),
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(50),
  },
  emptyText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.brand,
  },
});
