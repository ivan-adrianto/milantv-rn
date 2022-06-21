import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {IconCheck, IconClose, IconEdit, ImageHeader} from '../../assets';
import {Button, Text} from '../../components';
import {useState} from 'react';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {uriFormatter} from '../../helpers/uri';
import {useDispatch} from 'react-redux';
import {Creators as AuthActions} from '../../redux/AuthRedux';
import * as Keychain from 'react-native-keychain';
import {removeBearerToken} from '../../services/apiServices';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const logout = () => dispatch(AuthActions.logout());
  const data = useSelector(state => state.profile.dataGetProfile);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setName(data?.fullname);
    setUsername(data?.username);
    setEmail(data?.email);
  }, []);


  const logoutHandler = () => {
    Keychain.resetInternetCredentials('token');
    logout();
    removeBearerToken();
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
        <IconCheck height={23} width={25} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.photoProfileContainer}>
          <Image
            source={{uri: uriFormatter(data?.avatar)}}
            style={styles.photoProfile}
          />
          <IconEdit height={30} width={30} style={styles.iconEdit} />
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
        <TouchableOpacity onPress={logoutHandler} style={styles.buttonContainer}>
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
  iconEdit: {
    position: 'relative',
    marginTop: -33,
    left: 35,
  },
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
