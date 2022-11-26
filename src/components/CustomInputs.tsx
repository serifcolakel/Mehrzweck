import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import {colors} from '../utils/colors';
import {FONT_FAMILY, FONT_SIZE} from '../constant';
import CustomText from './CustomText';
import {isAndroid} from '../utils/platformUtil';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  label,
}: {
  control: any;
  name: string;
  rules?: any;
  placeholder: string;
  secureTextEntry?: boolean;
  label: string;
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <CustomText style={styles.label} label={label} />
          <View
            style={[
              styles.container,
              {borderColor: error ? colors.scarlet : colors.gray3},
            ]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry}
              placeholderTextColor={colors.gray4}
            />
          </View>
          {error && (
            <CustomText
              style={styles.errorText}
              label={error.message || 'Error'}
            />
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    height: 40,
    width: '100%',
    paddingHorizontal: 10,
    fontFamily: isAndroid ? FONT_FAMILY.REGULAR : undefined,
    color: colors.black,
  },
  errorText: {
    color: colors.scarlet,
    alignSelf: 'stretch',
    paddingTop: 5,
    fontSize: FONT_SIZE.EXTRA_SMALL,
  },
  label: {
    color: colors.primary,
    alignSelf: 'stretch',
    paddingBottom: 4,
    fontSize: FONT_SIZE.EXTRA_SMALL,
  },
});

export default CustomInput;
