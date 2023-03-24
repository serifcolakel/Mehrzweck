import {TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {colors} from '../utils/colors';
import styled from 'styled-components';

export interface IconProps {
  height?: number;
  type?: 'outlined' | 'contained';
  color?: string;
}

const StyleButton = styled(TouchableOpacity)<IconProps>`
  width: 100%;
  margin-vertical: 5px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 0px;
  height: ${({height}) => height}px;
  ${props => {
    switch (props.type) {
      case 'outlined':
        return `
          border-width: 1px;
          border-color: ${props.color};
          background-color: transparent;
        `;
      case 'contained':
        return `
          background-color: ${props.color};
        `;
      default:
        return `
          background-color: ${props.color};
        `;
    }
  }}
`;

type Props = {
  onPress: () => void;
  label: string;
  color?: string;
  disabled?: boolean;
  type?: 'outlined' | 'contained';
  height?: number;
};

const CustomButton = ({
  onPress,
  label,
  color = colors.primary,
  disabled = false,
  type = 'contained',
  height = 44,
}: Props) => {
  return (
    <>
      <StyleButton
        color={color}
        disabled={disabled}
        activeOpacity={0.8}
        type={type}
        height={height}
        onPress={onPress}>
        <CustomText
          label={label}
          style={{
            ...styles.buttonText,
            color: disabled
              ? colors.primary
              : type === 'outlined'
              ? colors.primary
              : colors.white,
          }}
        />
      </StyleButton>
    </>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
  },
});
