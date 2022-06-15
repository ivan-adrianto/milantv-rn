import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Splash, Login, SignUp, MovieDetail} from '../pages';
import {BottomNavigator} from '../components/';
import {useDispatch, useSelector} from 'react-redux';
import * as Keychain from 'react-native-keychain';
import {Creators as AuthActions} from '../redux/AuthRedux';
import MyReviews from '../pages/MyReviews';
import Profile from '../pages/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="MovieDetail" component={MovieDetail} />
    </HomeStack.Navigator>
  );
};

const MainApp = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      tabBar={props => <BottomNavigator {...props} />}
      screenOptions={{headerShown: false}}
      backBehavior="history">
      <Tab.Screen name="MyReviews" component={MyReviews} />
      <Tab.Screen name="HomeTab" component={HomeStackScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const Router = () => {
  const dispatch = useDispatch();
  const restoreLoginSession = () => dispatch(AuthActions.restoreLoginSession());

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const [loading, setLoading] = useState(true);

  const getToken = async () => {
    const token = await Keychain.getInternetCredentials('token');
    if (token) {
      restoreLoginSession();
    }
    setLoading(false);
  };

  useEffect(() => {
    getToken();
  }, []);
  if (loading) {
    return (
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  } else if (isLoggedIn) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MainApp"
          component={MainApp}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignUp}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }
};

export default Router;

const styles = StyleSheet.create({});
