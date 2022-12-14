/**
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/Home';
import DetailsScreen from './screens/details/Details';
import {InfoIcon, RightArrowIcon, SettingsIcon} from './assets/svg/Icons';
import ChatHomeScreen from './screens/chat/ChatHomeScreen';
import Header from './components/Header';
import {Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './store';
import Login from './screens/Login';
import Register from './screens/Register';
import Carousel from './components/ProductCarousel';
import MovieCarousel from './components/MovieCarousel';

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Chat: undefined;
  Home2: undefined;
  Login: undefined;
  Register: undefined;
  Product: undefined;
  MovieCarousel: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Home2 = () => {
  return (
    <View>
      <Text>Home2</Text>
    </View>
  );
};

const App = () => {
  return (
    <Provider store={store}>
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
            name="Product"
            component={Carousel}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MovieCarousel"
            component={MovieCarousel}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'Giriş Yap',
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
                  />
                );
              },
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: 'Giriş Yap',
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
                  />
                );
              },
            }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatHomeScreen}
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
                      <SettingsIcon
                        size={18}
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
          <Stack.Group
            screenOptions={{
              presentation: 'containedModal',
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
            }}>
            <Stack.Screen name="Home2" component={Home2} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
