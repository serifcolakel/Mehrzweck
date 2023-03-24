import {StyleProp, Text, TextStyle} from 'react-native';
import React from 'react';
import {FONT_FAMILY} from '../constant';
import {colors} from '../utils/colors';
import {isAndroid} from '../utils/platformUtil';
import styled from 'styled-components';

type Props = {
  label: string;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  numberOfLines?: number;
};

const StyledText = styled(Text)`
  font-family: ${isAndroid ? FONT_FAMILY.REGULAR : 'HoeflerText-Black'};
  color: ${colors.white};
`;

const CustomText = ({label, onPress, style, numberOfLines}: Props) => {
  return (
    <StyledText onPress={onPress} numberOfLines={numberOfLines} style={style}>
      {label}
    </StyledText>
  );
};

export default CustomText;
