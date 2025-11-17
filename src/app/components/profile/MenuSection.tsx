import { StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Fonts } from "../../constants/theme";
import { useTheme } from "../../hooks/useTheme";

const MenuSection = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  const { colors } = useTheme();
  return (
    <View style={styles.section}>
      {title && (
        <Text style={[styles.sectionTitle, { color: colors.muted }]}>
          {title}
        </Text>
      )}
      <View
        style={[
          styles.menuContainer,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

export default MenuSection;

const styles = StyleSheet.create({
  section: {
    marginBottom: verticalScale(24),
    paddingHorizontal: scale(6),
  },
  sectionTitle: {
    fontSize: moderateScale(13),
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: verticalScale(12),
    paddingHorizontal: scale(4),
    fontFamily: Fonts.brandBold,
  },
  menuContainer: {
    borderRadius: scale(12),
    overflow: "hidden",
    borderWidth: 1,
  },
});
