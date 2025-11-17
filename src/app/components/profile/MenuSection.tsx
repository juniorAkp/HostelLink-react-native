import { StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Colors, Fonts } from "../../constants/theme";

const MenuSection = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    {title && <Text style={styles.sectionTitle}>{title}</Text>}
    <View style={styles.menuContainer}>{children}</View>
  </View>
);

export default MenuSection;

const styles = StyleSheet.create({
  section: {
    marginBottom: verticalScale(24),
    paddingHorizontal: scale(6),
  },
  sectionTitle: {
    fontSize: moderateScale(13),
    fontWeight: "600",
    color: Colors.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: verticalScale(12),
    paddingHorizontal: scale(4),
    fontFamily: Fonts.brandBold,
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: scale(12),
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.light,
  },
});
