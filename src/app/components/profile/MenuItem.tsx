import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "../../constants/theme";

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
}) => (
  <TouchableOpacity
    style={[styles.menuItem, disabled && styles.menuItemDisabled]}
    onPress={onPress}
    disabled={disabled || !onPress}
    activeOpacity={0.7}
  >
    <View style={styles.menuItemLeft}>
      {icon && (
        <View
          style={[styles.menuItemIcon, danger && styles.menuItemIconDanger]}
        >
          <Ionicons
            name={icon}
            size={20}
            color={danger ? "#FF3B30" : Colors.muted}
          />
        </View>
      )}
      <View style={styles.menuItemTextContainer}>
        <Text
          style={[styles.menuItemTitle, danger && styles.menuItemTitleDanger]}
        >
          {title}
        </Text>
        {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    {showChevron && onPress && (
      <Ionicons name="chevron-forward" size={20} color="#999" />
    )}
  </TouchableOpacity>
);

export default MenuItem;
const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 56,
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
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.light,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuItemIconDanger: {
    backgroundColor: "#FFE5E5",
  },
  menuItemTextContainer: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.dark,
    marginBottom: 2,
    fontFamily: Fonts.brandBold,
  },
  menuItemTitleDanger: {
    color: "#FF3B30",
  },
  menuItemSubtitle: {
    fontSize: 13,
    color: Colors.muted,
    marginTop: 2,
  },
});
