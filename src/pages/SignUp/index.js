import {
  StyleSheet,
  View,
  Image,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Button} from '../../components';
import {IconEdit, SignUpImage} from '../../assets';
import {useDispatch, useSelector} from 'react-redux';
import {Creators as AuthActions} from '../../redux/AuthRedux';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const SignUp = ({navigation}) => {
  const isLoading = useSelector(state => state.auth.isLoadingRegister);
  const data = useSelector(state => state.auth.dataRegister);
  const error = useSelector(state => state.auth.errorRegister);

  const dispatch = useDispatch();
  const register = data => dispatch(AuthActions.registerRequest(data));
  const resetData = () => dispatch(AuthActions.resetRegisterState());

  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState('');
  const [base64Photo, setBase64Photo] = useState('');

  if (error) {
    showToast(error);
    resetData();
  }

  const uploadPhoto = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
      });
      setPhoto([pickerResult]);
      RNFS.readFile(pickerResult.uri, 'base64').then(res => {
        setBase64Photo(`data:image/jpeg;base64,${res}`);
      });
    } catch (error) {
      showToast(error);
    }
  };

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const validate = () => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let result = false;
    if (!username) {
      showToast('Username is required');
    } else if (!fullname) {
      showToast('Name is required');
    } else if (!email) {
      showToast('Email is required');
    } else if (!regex.test(email)) {
      showToast('Email is not valid');
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
        username,
        fullname,
        email,
        password,
        photo: base64Photo,
      };
      register(data);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={uploadPhoto}>
          <IconEdit style={styles.editIcon} />
          <Image
            source={photo ? {uri: photo[0].uri} : SignUpImage}
            style={[{marginTop: photo[0]?.uri ? 70 : 80}, styles.image]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor={'white'}
          onChangeText={text => setFullname(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={'white'}
          autoCapitalize="none"
          onChangeText={text => setUsername(text)}
        />
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
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          type="login"
          text={isLoading ? 'SIGNING UP...' : 'SIGN UP'}
          onPress={submit}
        />
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  uri: {
    fontSize: 50,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 35,
  },
  image: {
    height: 107,
    width: 107,
    borderRadius: 100,
  },
  editIcon: {
    position: 'relative',
    zIndex: 1,
    marginTop: -30,
    top: 175,
    marginLeft: 67,
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
  buttonContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
});
