/**
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import HomeScreen from './screens/Home';
import DetailsScreen from './screens/details/Details';
import {View, StyleSheet} from 'react-native';
import {colors} from './utils/colors';
import {isAndroid} from './utils/platformUtil';
import CustomText from './components/CustomText';
import {InfoIcon, RightArrowIcon} from './assets/svg/Icons';

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            header(props) {
              return <Header {...props} />;
            },
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            header(props) {
              return (
                <Header
                  {...props}
                  leftIcon={
                    <RightArrowIcon
                      onPress={() => props.navigation.navigate('Home')}
                      size={16}
                      rotate={180}
                    />
                  }
                  rightIcon={
                    <InfoIcon
                      size={16}
                      onPress={() =>
                        props.navigation.canGoBack() &&
                        props.navigation.goBack()
                      }
                    />
                  }
                />
              );
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

interface HeaderProps extends NativeStackHeaderProps {
  rightIcon?: any;
  handleGoBack?: () => void;
  leftIcon?: any;
  leftIconOnPress?: () => void;
}

const Header = ({navigation, route, leftIcon, rightIcon}: HeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      {navigation.canGoBack() && leftIcon ? leftIcon : <View />}
      <CustomText label={route.name} style={styles.headerTitle} />
      {rightIcon ? rightIcon : <View />}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.primary,
    height: isAndroid ? 50 : 80,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
    color: colors.white,
  },
});

export default App;
