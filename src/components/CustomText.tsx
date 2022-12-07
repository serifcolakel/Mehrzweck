import {StyleProp, Text, TextStyle} from 'react-native';
import React from 'react';
import {FONT_FAMILY} from '../constant';
import {colors} from '../utils/colors';
import {isAndroid} from '../utils/platformUtil';

type Props = {
  label: string;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  numberOfLines?: number;
};

const defaultStyle = {
  fontFamily: isAndroid ? FONT_FAMILY.REGULAR : 'HoeflerText-Black', // https://github.com/react-native-training/react-native-fonts
  color: colors.black,
};

const CustomText = ({label, style, onPress, numberOfLines}: Props) => {
  return (
    <Text
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[{...defaultStyle}, style]}>
      {label}
    </Text>
  );
};

export default CustomText;
