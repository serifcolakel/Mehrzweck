import {Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

type RegisterProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

const Register = ({}: RegisterProps) => {
  return (
    <View>
      <Text>Register</Text>
    </View>
  );
};

export default Register;
