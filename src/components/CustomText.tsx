import {StyleProp, Text, TextStyle} from 'react-native';
import React from 'react';
import {FONT_FAMILY} from '../constant';
import {colors} from '../utils/colors';
import {isAndroid} from '../utils/platformUtil';

type Props = {
  label: string;
  style?: StyleProp<TextStyle>;
};

const CustomText = ({label, style}: Props) => {
  return (
    <Text
      style={[
        {
          fontFamily: isAndroid ? FONT_FAMILY.REGULAR : undefined,
          color: colors.scarlet,
        },
        style,
      ]}>
      {label}
    </Text>
  );
};

export default CustomText;
