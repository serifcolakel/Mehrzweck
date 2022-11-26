import React from 'react';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import CustomText from './CustomText';
import styled from 'styled-components';
import {colors} from '../utils/colors';
import {isAndroid} from '../utils/platformUtil';
import {FONT_SIZE} from '../constant';

const HeaderContainer = styled(View)`
  background-color: ${colors.primary};
  height: ${isAndroid ? 50 : 80}px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 10px 16px 10px;
`;

const HeaderTitle = styled(CustomText)`
  font-size: ${FONT_SIZE.MEDIUM}px;
  flex: 1;
  text-align: center;
  color: ${colors.white};
`;

interface HeaderProps extends NativeStackHeaderProps {
  rightIcon?: any;
  handleGoBack?: () => void;
  leftIcon?: any;
  leftIconOnPress?: () => void;
}

const Header = ({navigation, route, leftIcon, rightIcon}: HeaderProps) => {
  return (
    <HeaderContainer>
      {navigation.canGoBack() && leftIcon ? leftIcon : <View />}
      <HeaderTitle label={route.name} />
      {rightIcon ? rightIcon : <View />}
    </HeaderContainer>
  );
};

export default Header;
