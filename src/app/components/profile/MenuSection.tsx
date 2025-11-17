import { StyleSheet, Text, View } from "react-native";
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
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
    paddingHorizontal: 4,
    fontFamily: Fonts.brandBold,
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.light,
  },
});
