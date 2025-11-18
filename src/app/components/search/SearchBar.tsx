import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
  type TextInputProps,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Fonts } from "../../constants/theme";
import { useTheme } from "../../hooks/useTheme";

interface SearchBarProps extends Omit<TextInputProps, "style"> {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
  containerStyle?: ViewStyle;
}

const SearchBar = ({
  value,
  onChangeText,
  onClear,
  placeholder = "Search hostels...",
  containerStyle,
  ...props
}: SearchBarProps) => {
  const { colors } = useTheme();

  const handleClear = () => {
    onClear?.();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.light,
          borderColor: colors.border,
        },
        containerStyle,
      ]}
    >
      {/* Search Icon */}
      <Ionicons
        name="search"
        size={moderateScale(20)}
        color={colors.muted}
        style={styles.searchIcon}
      />

      {/* Text Input */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        style={[
          styles.input,
          {
            color: colors.text,
          },
        ]}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        {...props}
      />

      {/* Clear Button */}
      {value.length > 0 && (
        <TouchableOpacity
          onPress={handleClear}
          style={[
            styles.clearButton,
            {
              backgroundColor: colors.muted + "20",
            },
          ]}
          activeOpacity={0.7}
        >
          <Ionicons
            name="close-circle"
            size={moderateScale(18)}
            color={colors.muted}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: scale(12),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(10),
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: verticalScale(1),
    },
    shadowOpacity: 0.05,
    shadowRadius: scale(4),
    elevation: 2,
  },
  searchIcon: {
    marginRight: scale(8),
  },
  input: {
    flex: 1,
    fontSize: moderateScale(15),
    fontFamily: Fonts.brand,
    paddingVertical: 0,
  },
  clearButton: {
    marginLeft: scale(8),
    padding: scale(4),
    borderRadius: scale(12),
    alignItems: "center",
    justifyContent: "center",
  },
});
