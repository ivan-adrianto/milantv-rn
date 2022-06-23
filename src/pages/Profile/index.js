import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  IconCheck,
  IconClose,
  IconEdit,
  IconProfile,
  ImageHeader,
  SignUpImage,
} from '../../assets';
import {Button, Text} from '../../components';
import {useState} from 'react';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {uriFormatter} from '../../helpers/uri';
import {useDispatch} from 'react-redux';
import {Creators as AuthActions} from '../../redux/AuthRedux';
import {Creators as ProfileActions} from '../../redux/ProfileRedux';
import * as Keychain from 'react-native-keychain';
import {removeBearerToken} from '../../services/apiServices';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {useIsFocused} from '@react-navigation/native';

const Profile = ({navigation}) => {
  const isFocused = useIsFocused();

  const dispatch = useDispatch();
  const logout = () => dispatch(AuthActions.logout());
  const updateProfile = data =>
    dispatch(ProfileActions.updateProfileRequest(data));
  const resetState = () => dispatch(ProfileActions.resetStateUpdateProfile());
  const getProfile = () => dispatch(ProfileActions.getProfileRequest());

  const data = useSelector(state => state.profile.dataGetProfile);
  const isLoading = useSelector(state => state.profile.isLoadingUpdateProfile);
  const error = useSelector(state => state.profile.errorUpdateProfile);
  const dataUpdate = useSelector(state => state.profile.dataUpdateProfile);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    if (isFocused) {
      setName(data?.fullname);
      setUsername(data?.username);
      setEmail(data?.email);
      setPhoto(data?.avatar);
    }
  }, [isFocused]);

  useEffect(() => {
    if (dataUpdate) {
      showToast('Profile updated');
      getProfile();
      navigation.navigate('HomeTab');
      resetState();
    } else if (error) {
      showToast(error);
      resetState();
    }
  }, [dataUpdate, error]);

  const logoutHandler = () => {
    Keychain.resetInternetCredentials('token');
    logout();
    removeBearerToken();
  };

  const validate = () => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let result = false;
    if (!username) {
      showToast('Username is required');
    } else if (!name) {
      showToast('Name is required');
    } else if (!email) {
      showToast('Email is required');
    } else if (!regex.test(email)) {
      showToast('Email is not valid');
    } else {
      result = true;
    }
    return result;
  };

  const updateProfileHandler = () => {
    if (validate()) {
      const payload = {
        fullname: name,
        username,
        email,
        photo,
      };
      ((photo === data?.avatar) || !photo) && delete payload.photo;
      updateProfile(payload);
    }
  };

  const showToast = message => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const uploadPhoto = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: 'image/*',
      });
      if (pickerResult.size > 5000000) {
        showToast('Image size too large');
      } else {
        RNFS.readFile(pickerResult.uri, 'base64').then(res => {
          setPhoto(`data:image/jpeg;base64,${res}`);
        });
      }
    } catch (error) {
      DocumentPicker.isCancel(() => {});
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconClose height={35} width={35} />
          </TouchableOpacity>
          <Text bold size={18} style={styles.titleText}>
            Edit Profile
          </Text>
        </View>
        {isLoading ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <TouchableOpacity onPress={updateProfileHandler}>
            <IconCheck height={23} width={25} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.photoProfileContainer}>
          <TouchableOpacity onPress={uploadPhoto}>
            <Image
              source={photo ? {uri: uriFormatter(photo)} : SignUpImage}
              style={styles.photoProfile}
            />
            <IconEdit height={30} width={30} style={styles.iconEdit(photo)} />
          </TouchableOpacity>
        </View>
        <TextInput
          placeholderTextColor={'white'}
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          placeholderTextColor={'white'}
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          placeholderTextColor={'white'}
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TouchableOpacity
          onPress={logoutHandler}
          style={styles.buttonContainer}>
          <Button type={'login'}>LOGOUT</Button>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 62,
    backgroundColor: '#848282',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 15,
  },
  headerTitle: {
    flexDirection: 'row',
    aliginItems: 'center',
  },
  titleText: {
    marginTop: 4,
  },
  photoProfileContainer: {
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 52,
  },
  photoProfile: {
    height: 107,
    width: 107,
    borderRadius: 107 / 2,
  },
  iconEdit: photo => ({
    position: 'relative',
    marginTop: photo ? -33 : -38,
    left: 74,
  }),
  contentContainer: {
    paddingHorizontal: 31,
  },
  input: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    color: 'white',
    fontSize: 18,
    marginBottom: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
});
