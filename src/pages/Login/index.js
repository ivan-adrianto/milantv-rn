import {
  View,
  Image,
  StyleSheet,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SplashLogo} from '../../assets';
import {Button, Text} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {Creators as AuthActions} from '../../redux/AuthRedux';

const Login = ({navigation}) => {
  const isLoading = useSelector(state => state.auth.isLoadingLogin);
  const data = useSelector(state => state.auth.dataLogin);
  const error = useSelector(state => state.auth.errorLogin);

  const dispatch = useDispatch();
  const login = data => dispatch(AuthActions.loginRequest(data));
  const resetData = () => dispatch(AuthActions.resetLoginState());

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const validate = () => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let result = false;
    if (!email) {
      showToast('Email is required');
    } else if (!regex.test(email)) {
      showToast('Email is invalid');
    } else if (!password) {
      showToast('Password is required');
    } else if (password.length < 6) {
      showToast('Password must be at least 6 characters');
    } else {
      result = true;
    }
    return result;
  };

  const submit = () => {
    if (validate()) {
      const data = {
        email,
        password,
      };
      login(data);
    }
  };

  if (error) {
    showToast(error);
    resetData();
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={SplashLogo} style={styles.image} />
        <Text style={styles.logoTitle}>MovReact</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={'white'}
          autoCapitalize="none"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={'white'}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <Text style={styles.forgotPassword}>Forgot your password?</Text>
      <View style={styles.buttonContainer}>
        <Button type={'login'} onPress={submit}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text color={'black'} bold size={18}>SIGN IN</Text>
          )}
        </Button>
      </View>
      <Text
        style={styles.noAccount}
        onPress={() => navigation.navigate('Sign Up')}>
        Don't have an account? Sign Up
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  logoContainer: {
    marginTop: 50,
    marginBottom: 20,
    textAlign: 'center',
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
  },
  logoTitle: {
    fontFamily: 'Schoolbell-Regular',
    fontSize: 20,
    color: 'white',
  },
  inputContainer: {
    paddingHorizontal: 30,
  },
  input: {
    color: 'white',
    borderBottomWidth: 1,
    borderColor: 'white',
    fontFamily: 'Roboto-Regular',
    marginBottom: 10,
  },
  forgotPassword: {
    color: 'white',
    fontFamily: 'Roboto-Regular',
    fontWeight: 'bold',
    paddingHorizontal: 30,
    textAlign: 'right',
    marginTop: 19,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 35,
  },
  noAccount: {
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 15,
    paddingVertical: 15,
  },
});
