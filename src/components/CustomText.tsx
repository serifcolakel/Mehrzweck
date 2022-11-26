import {StyleProp, Text, TextStyle} from 'react-native';
import React from 'react';
import {FONT_FAMILY} from '../constant';
import {colors} from '../utils/colors';
import {isAndroid} from '../utils/platformUtil';

type Props = {
  label: string;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
};

const CustomText = ({label, style, onPress}: Props) => {
  return (
    <Text
      onPress={onPress}
      style={[
        {
          fontFamily: isAndroid ? FONT_FAMILY.REGULAR : undefined,
          color: colors.black,
        },
        style,
      ]}>
      {label}
    </Text>
  );
};

export default CustomText;
