import React, {useEffect, useState} from 'react';
import {Linking, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Splash, Login, SignUp, MovieDetail, MovieReviews} from '../pages';
import {BottomNavigator} from '../components/';
import {useDispatch, useSelector} from 'react-redux';
import * as Keychain from 'react-native-keychain';
import {Creators as AuthActions} from '../redux/AuthRedux';
import {Creators as ProfileActions} from '../redux/ProfileRedux';
import MyReviews from '../pages/MyReviews';
import Profile from '../pages/Profile';
import {addBearerToken} from '../services/apiServices';
import {IconBack} from '../assets';
import * as RootNavigation from '../helpers/RootNavigation';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const options = route => {
  return {
    headerShown: true,
    title: route.name === 'MovieReviews' ? route.params.title : 'Your Reviews',
    headerStyle: {backgroundColor: '#848282'},
    headerTitleStyle: {color: 'white', fontSize: 18, fontWeight: 'bold'},
    headerTintColor: 'white',
    headerBackImage: () => <IconBack height={18} width={10} />,
  };
};

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="MovieDetail" component={MovieDetail} />
      <HomeStack.Screen
        options={({route}) => options(route)}
        name="MovieReviews"
        component={MovieReviews}
      />
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
      <Tab.Screen
        name="MyReviews"
        component={MyReviews}
        options={({route}) => options(route)}
      />
      <Tab.Screen name="HomeTab" component={HomeStackScreen} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{tabBarVisible: false}}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  const dispatch = useDispatch();
  const restoreLoginSession = () => dispatch(AuthActions.restoreLoginSession());
  const getProfile = () => dispatch(ProfileActions.getProfileRequest());

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const profile = useSelector(state => state.profile.dataGetProfile);

  const [loading, setLoading] = useState(true);
  const [linkAccessed, setLinkAccessed] = useState(false);

  const getToken = async () => {
    const token = await Keychain.getInternetCredentials('token');
    if (token) {
      restoreLoginSession();
      addBearerToken(token.password);
      getProfile();
    }
    setLoading(false);
  };

  const handleURL = url => {
    if (url) {
      const id = parseInt(url.split('/')[4]);
      !linkAccessed && RootNavigation.navigate('MovieDetail', {id});
      setLinkAccessed(true);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (profile) {
      Linking.getInitialURL()
        .then(url => {
          handleURL(url);
        })
        .catch(() => {});
    }
  }, [profile]);

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
