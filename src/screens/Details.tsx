import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../App';

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

function DetailsScreen({navigation}: DetailsProps) {
  const handleGoToHome = () => navigation.navigate('Home');

  return (
    <View style={styles.screenContainer}>
      <Text>Details Screen</Text>
      <Button title="Go to Home" onPress={handleGoToHome} />
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

export default DetailsScreen;
