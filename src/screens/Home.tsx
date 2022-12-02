import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import {RootStackParamList} from '../App';
import CustomButton from '../components/CustomButton';
import styled from 'styled-components';

const ScreenContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({navigation}: HomeScreenProps) {
  const handleGoToDetails = () => navigation.navigate('Details');
  const handleGoChat = () => navigation.navigate('Chat');
  const handleGoHome2 = () => navigation.navigate('Home2');
  const handleGoLogin = () => navigation.navigate('Login');

  return (
    <ScreenContainer>
      <CustomButton label="Go to Details" onPress={handleGoToDetails} />
      <CustomButton label="Go to Chat" onPress={handleGoChat} />
      <CustomButton label="Go to Home2" onPress={handleGoHome2} />
      <CustomButton label="Go to Signin" onPress={handleGoLogin} />
    </ScreenContainer>
  );
}

export default HomeScreen;
