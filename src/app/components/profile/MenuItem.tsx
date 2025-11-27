import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Fonts } from "../../constants/theme";
import { useTheme } from "../../hooks/useTheme";

const MenuItem = ({
  icon,
  title,
  subtitle,
  onPress,
  showChevron = true,
  danger = false,
  disabled = false,
}: {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showChevron?: boolean;
  danger?: boolean;
  disabled?: boolean;
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.menuItem, disabled && styles.menuItemDisabled]}
      onPress={onPress}
      disabled={disabled || !onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        {icon && (
          <View
            style={[
              styles.menuItemIcon,
              { backgroundColor: colors.card },
              danger && styles.menuItemIconDanger,
            ]}
          >
            <Ionicons
              name={icon}
              size={scale(15)}
              color={danger ? "#FF3B30" : colors.muted}
            />
          </View>
        )}
        <View style={styles.menuItemTextContainer}>
          <Text
            style={[
              styles.menuItemTitle,
              { color: colors.text },
              danger && styles.menuItemTitleDanger,
            ]}
          >
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.menuItemSubtitle, { color: colors.muted }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {showChevron && onPress && (
        <Ionicons
          name="chevron-forward"
          size={scale(15)}
          color={colors.muted}
        />
      )}
    </TouchableOpacity>
  );
};

export default MenuItem;
const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(16),
    minHeight: moderateScale(56),
  },
  menuItemDisabled: {
    opacity: 0.5,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  menuItemIcon: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: scale(8),
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(12),
  },
  menuItemIconDanger: {
    backgroundColor: "#FFE5E5",
  },
  menuItemTextContainer: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    marginBottom: verticalScale(2),
    fontFamily: Fonts.brandBold,
  },
  menuItemTitleDanger: {
    color: "#FF3B30",
  },
  menuItemSubtitle: {
    fontSize: moderateScale(13),
    marginTop: verticalScale(2),
  },
});
