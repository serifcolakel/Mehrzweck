import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, StyleSheet, View} from 'react-native';
import {RootStackParamList} from '../App';
import CustomText from '../components/CustomText';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({navigation}: HomeScreenProps) {
  const handleGoToDetails = () => navigation.navigate('Details');

  return (
    <View style={styles.screenContainer}>
      <CustomText label="Home Screen" />
      <Button title="Go to Details" onPress={handleGoToDetails} />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
