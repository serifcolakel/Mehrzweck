import {View} from 'react-native';
import React from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import CustomInput from '../components/CustomInputs';
import CustomButton from '../components/CustomButton';
import styled from 'styled-components';
import {PADDING} from '../constant';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {useAppDispatch, useAppSelector} from '../store';
import {login} from '../features/slices/authSlice';
import CustomText from '../components/CustomText';

const LoginContainer = styled(View)`
  padding: ${PADDING.SIXTEEN}px;
  flex: 1;
`;

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

type FormValues = {
  username: string;
  password: string;
};

const Login = ({navigation}: LoginProps) => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);
  const {control, handleSubmit} = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = loginFormData => {
    dispatch(login(loginFormData));
    if (user) {
      navigation.navigate('Home');
    }
  };

  return (
    <LoginContainer>
      {user && <CustomText label={JSON.stringify(user)} />}
      <CustomInput
        label="Kullanıcı Adı"
        control={control}
        name="username"
        placeholder="Kullanıcı Adı"
        rules={{required: 'Kullanıcı Adı alanı zorunludur'}}
      />
      <CustomInput
        label="Şifre"
        control={control}
        name="password"
        placeholder="Lütfen şifrenizi giriniz"
        rules={{required: 'Şifre alanı zorunludur'}}
        secureTextEntry
      />
      <CustomButton label="Onayla" onPress={handleSubmit(onSubmit)} />
    </LoginContainer>
  );
};

export default Login;
