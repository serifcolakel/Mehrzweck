import React from 'react';
import {View, TextInput} from 'react-native';
import {Controller, FieldError, UseControllerProps} from 'react-hook-form';
import {colors} from '../utils/colors';
import {FONT_FAMILY, FONT_SIZE, PADDING} from '../constant';
import CustomText from './CustomText';
import {isAndroid} from '../utils/platformUtil';
import styled from 'styled-components';
import {IconProps} from './CustomButton';

const StyledInputContainer = styled(View)`
  padding: ${PADDING.TEN / 2}px 0px;
`;

const InputContainer = styled(View)``;

const StyledTextInput = styled(TextInput)<{hasLeftIcon?: boolean}>`
  height: 40px;
  font-family: ${isAndroid ? FONT_FAMILY.REGULAR : 'HoeflerText-Black'};
  color: ${colors.primary};
  flex: 1;
  margin-left: ${({hasLeftIcon}) => (hasLeftIcon ? 10 : 0)}px;
  margin-top: 2px;
  text-align: left;
`;

const InputContentContainer = styled(View)<{error?: FieldError}>`
  background-color: ${colors.white};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${PADDING.SIXTEEN}px;
  border-width: 1px;
  border-radius: 8px;
  border-color: ${({error}) => (error ? colors.scarlet : colors.gray3)};
`;

const InputLeftContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const InputIconContainer = styled(View)`
  width: 5%;
  align-items: center;
  justify-content: center;
`;

const InputLabel = styled(CustomText)<{error?: FieldError}>`
  font-size: ${FONT_SIZE.EXTRA_SMALL}px;
  padding-bottom: 4px;
  align-self: stretch;
  padding-left: 5px;
  color: ${({error}) => (error ? colors.scarlet : colors.primary)};
`;

const InputErrorLabel = styled(CustomText)`
  color: ${colors.scarlet};
  align-self: stretch;
  padding-top: 10px;
  padding-left: 5px;
  font-size: ${FONT_SIZE.EXTRA_SMALL}px;
`;

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  label,
  leftIcon,
  rightIcon,
}: {
  control: any;
  name: string;
  rules?: UseControllerProps['rules'];
  placeholder: string;
  secureTextEntry?: boolean;
  label: string;
  rightIcon?: (props: IconProps) => React.ReactNode;
  leftIcon?: (props: IconProps) => React.ReactNode;
}) => {
  return (
    <StyledInputContainer>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
          <InputContainer>
            <InputLabel error={error} label={label} />
            <InputContentContainer error={error}>
              <InputLeftContainer>
                {leftIcon && (
                  <InputIconContainer>
                    {leftIcon({color: error && colors.scarlet})}
                  </InputIconContainer>
                )}
                <StyledTextInput
                  onTouchEnd={() => {}}
                  returnKeyType="done"
                  hasLeftIcon={!!leftIcon}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder={placeholder}
                  secureTextEntry={secureTextEntry}
                  placeholderTextColor={colors.gray}
                />
              </InputLeftContainer>
              {rightIcon && (
                <InputIconContainer>
                  {rightIcon({color: error && colors.scarlet})}
                </InputIconContainer>
              )}
            </InputContentContainer>
            {error && <InputErrorLabel label={error?.message!} />}
          </InputContainer>
        )}
      />
    </StyledInputContainer>
  );
};
export default CustomInput;
