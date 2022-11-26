import {TouchableOpacity, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {colors} from '../utils/colors';
import {isAndroid} from '../utils/platformUtil';
import {FONT_FAMILY} from '../constant';

type Props = {
  onPress: () => void;
  label: string;
  color?: string;
  disabled?: boolean;
  type?: 'outlined' | 'contained';
  extraStyle?: StyleProp<ViewStyle>;
  height?: number;
};

const CustomButton = ({
  onPress,
  label,
  color = colors.primary,
  disabled = false,
  type = 'contained',
  extraStyle = {},
  height = 44,
}: Props) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        {
          ...styles.button,
          height: height,
          borderColor: disabled ? colors.gray2 : color,
          backgroundColor: disabled
            ? colors.white
            : type === 'outlined'
            ? 'transparent'
            : color,
        },
        extraStyle,
      ]}>
      <CustomText
        label={label}
        style={{
          ...styles.buttonText,
          color: disabled
            ? colors.primary
            : type === 'outlined'
            ? colors.primary
            : colors.white,
          fontFamily: isAndroid ? FONT_FAMILY.REGULAR : undefined,
        }}
      />
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    padding: 6,
    width: '100%',
    borderWidth: 1,
    borderRadius: 25,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
});
