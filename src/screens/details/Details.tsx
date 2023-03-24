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
import {FONT_SIZE, PADDING} from '../../constant';
import styled from 'styled-components';
import {CalendarIcon, FavoriteIcon} from '../../assets/svg/Icons';

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

const ScreenContainer = styled(View)`
  background-color: ${colors.white};
  flex: 1;
`;

const TabBarContainer = styled(TabBar)`
  background-color: ${colors.white};
  elevation: 0;
`;

const RouteContainer = styled(View)`
  flex: 1;
  padding: ${PADDING.FIFTEEN}px;
`;

const InputContainer = styled(View)`
  padding: ${PADDING.TEN / 2}px 0px;
`;

const DetailsTitle = styled(CustomText)`
  font-size: ${FONT_SIZE.LARGE}px;
  text-align: right;
  color: ${colors.scarlet};
  padding-bottom: 10px;
`;

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

type FormValues = {
  username: string;
  password: string;
};

const FirstRoute = ({navigation}: DetailsProps) => {
  const handleGoToHome = () => navigation.navigate('Home');
  const {control, handleSubmit} = useForm<FormValues>({
    context: {locale: 'en'},
    criteriaMode: 'all',
    defaultValues: {username: '', password: ''},
    shouldFocusError: true,
    delayError: 0,
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: undefined,
    shouldUnregister: true,
    shouldUseNativeValidation: false,
  });
  const onSubmit: SubmitHandler<FormValues> = formValues => {
    console.warn(formValues);
    handleGoToHome();
  };

  return (
    <RouteContainer>
      <CustomText label={'Firs Screen is about to be implemented'} />
      <DetailsTitle
        label={'Below is a form with react-hook-form and styled-components'}
      />
      <InputContainer>
        <CustomInput
          label="Kullanıcı Adı"
          control={control}
          name="username"
          placeholder="Kullanıcı Adı"
          rules={{required: 'Kullanıcı Adı zorunludur'}}
        />
      </InputContainer>
      <InputContainer>
        <CustomInput
          leftIcon={iconProps => <CalendarIcon {...iconProps} />}
          rightIcon={iconProps => <FavoriteIcon {...iconProps} />}
          label="Şifre"
          control={control}
          name="password"
          placeholder="Şifre"
          rules={{
            required: 'Şifre zorunludur',
            minLength: {
              value: 3,
              message: 'Şifre en az 3 karakter olmalıdır',
            },
            maxLength: {
              value: 10,
              message: 'Şifre en fazla 10 karakter olmalıdır',
            },
          }}
        />
      </InputContainer>
      <CustomButton label="Onayla" onPress={handleSubmit(onSubmit)} />
      <CustomButton label="Anasayfa" type="outlined" onPress={handleGoToHome} />
    </RouteContainer>
  );
};

const SecondRoute = ({navigation}: DetailsProps) => {
  const handleGoToHome = () => navigation.navigate('Home');
  const {control, handleSubmit, watch, ...otherProps} = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => console.warn(data);
  console.log(watch('username'), otherProps.formState.errors);

  return (
    <RouteContainer>
      <CustomText
        style={{
          paddingVertical: PADDING.TEN,
        }}
        label={'Firs Screen is about to be implemented'}
      />
      <InputContainer>
        <CustomInput
          label="Kullanıcı Adı"
          control={control}
          name="username"
          placeholder="Kullanıcı Adı"
          rules={{required: 'Kullanıcı Adı is required'}}
        />
      </InputContainer>
      <InputContainer>
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
      </InputContainer>
      <CustomButton label="Submit" onPress={handleSubmit(onSubmit)} />
      <CustomButton
        label="Go to Home"
        type="outlined"
        onPress={handleGoToHome}
      />
    </RouteContainer>
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
    <ScreenContainer>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={tabProps => (
          <TabBarContainer
            {...tabProps}
            indicatorStyle={{backgroundColor: colors.primary}}
            style={styles.tabBar}
            renderLabel={({route, focused}) => (
              <CustomText
                label={route.title!}
                style={{color: focused ? colors.primary : colors.gray}}
              />
            )}
          />
        )}
        initialLayout={{width: layout.width, height: layout.height}}
        accessibilityLabel="TabView"
      />
    </ScreenContainer>
  );
}

export default DetailsScreen;
