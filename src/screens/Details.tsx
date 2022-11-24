import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, StyleSheet, View} from 'react-native';
import {RootStackParamList} from '../App';
import {SubmitHandler, useForm} from 'react-hook-form';
import CustomInput from '../components/CustomInputs';
import CustomText from '../components/CustomText';

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

type FormValues = {
  firstName: string;
  lastName: string;
};

function DetailsScreen({navigation}: DetailsProps) {
  const handleGoToHome = () => navigation.navigate('Home');
  const {control, handleSubmit} = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });
  const onSubmit: SubmitHandler<FormValues> = data => console.warn(data);

  return (
    <View style={styles.screenContainer}>
      <CustomText label="Detail Screen" />
      <Button title="Go to Home" onPress={handleGoToHome} />
      <View style={styles.inputContainer}>
        <CustomInput
          control={control}
          name="firstName2"
          placeholder="First Name"
          rules={{required: 'First Name is required'}}
        />
      </View>
      <View style={styles.inputContainer}>
        <CustomInput
          control={control}
          name="firstName"
          placeholder="First Name"
          rules={{
            required: 'First Name is required',
            minLength: {
              value: 3,
              message: 'First Name should be at least 3 characters',
            },
            maxLength: {
              value: 10,
              message: 'First Name should be at most 10 characters',
            },
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    margin: 12,
    width: '100%',
    minWidth: 370,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  inputContainer: {
    paddingVertical: 10,
  },
  buttonContainer: {
    width: '80%',
  },
});

export default DetailsScreen;
