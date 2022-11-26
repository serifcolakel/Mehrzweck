import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {RootStackParamList} from '../../App';
import {SubmitHandler, useForm} from 'react-hook-form';
import CustomInput from '../../components/CustomInputs';
import CustomText from '../../components/CustomText';
import CustomButton from '../../components/CustomButton';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {colors} from '../../utils/colors';
import {isAndroid} from '../../utils/platformUtil';
import {FONT_FAMILY, PADDING} from '../../constant';

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

type FormValues = {
  username: string;
  password: string;
};

const FirstRoute = ({navigation}: DetailsProps) => {
  const handleGoToHome = () => navigation.navigate('Home');
  const {control, handleSubmit} = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => console.warn(data);
  return (
    <View style={styles.routeContainer}>
      <CustomText label={'Firs Screen is about to be implemented'} />
      <View style={styles.inputContainer}>
        <CustomInput
          label="Kullanıcı Adı"
          control={control}
          name="username"
          placeholder="Kullanıcı Adı"
          rules={{required: 'Kullanıcı Adı is required'}}
        />
      </View>
      <View style={styles.inputContainer}>
        <CustomInput
          label="Şifre"
          control={control}
          name="password"
          placeholder="Şifre"
          rules={{
            required: 'Şifre is required',
            minLength: {
              value: 3,
              message: 'Şifre should be at least 3 characters',
            },
            maxLength: {
              value: 10,
              message: 'Şifre should be at most 10 characters',
            },
          }}
        />
      </View>
      <CustomButton label="Submit" onPress={handleSubmit(onSubmit)} />
      <CustomButton
        label="Go to Home"
        type="outlined"
        onPress={handleGoToHome}
      />
    </View>
  );
};

const SecondRoute = ({navigation}: DetailsProps) => {
  const handleGoToHome = () => navigation.navigate('Home');
  const {control, handleSubmit} = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => console.warn(data);
  return (
    <View style={styles.routeContainer}>
      <CustomText
        style={{
          paddingVertical: PADDING.TEN,
        }}
        label={'Firs Screen is about to be implemented'}
      />
      <View style={styles.inputContainer}>
        <CustomInput
          label="Kullanıcı Adı"
          control={control}
          name="username"
          placeholder="Kullanıcı Adı"
          rules={{required: 'Kullanıcı Adı is required'}}
        />
      </View>
      <View style={styles.inputContainer}>
        <CustomInput
          label="Şifre"
          control={control}
          name="password"
          placeholder="Şifre"
          secureTextEntry
          rules={{
            required: 'Şifre is required',
            minLength: {
              value: 3,
              message: 'Şifre should be at least 3 characters',
            },
            maxLength: {
              value: 10,
              message: 'Şifre should be at most 10 characters',
            },
          }}
        />
      </View>
      <CustomButton label="Submit" onPress={handleSubmit(onSubmit)} />
      <CustomButton
        label="Go to Home"
        type="outlined"
        onPress={handleGoToHome}
      />
    </View>
  );
};

function DetailsScreen({...props}: DetailsProps) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const renderScene = SceneMap({
    first: () => <FirstRoute {...props} />,
    second: () => <SecondRoute {...props} />,
  });

  const [routes] = React.useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);

  return (
    <View style={styles.detailsContainer}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={tabProps => (
          <TabBar
            {...tabProps}
            indicatorStyle={{backgroundColor: colors.primary}}
            style={styles.tabBar}
            renderLabel={({route, focused}) => (
              <CustomText
                label={route.title}
                style={{
                  color: focused ? colors.primary : colors.gray,
                  fontFamily: isAndroid ? FONT_FAMILY.REGULAR : undefined,
                }}
              />
            )}
          />
        )}
        initialLayout={{width: layout.width, height: layout.height}}
        accessibilityLabel="TabView"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: colors.white,
    flex: 1,
  },
  tabBar: {backgroundColor: colors.white, elevation: 0},
  routeContainer: {flex: 1, padding: PADDING.FIFTEEN},
  screenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
  },
  inputContainer: {
    paddingVertical: 5,
  },
});

export default DetailsScreen;
