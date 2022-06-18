import {Image, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {IconCheck, IconClose, IconEdit, ImageHeader} from '../../assets';
import {Button, Text} from '../../components';

const Profile = () => {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <IconClose height={35} width={35} />
          <Text bold size={18} style={styles.titleText}>
            Edit Profile
          </Text>
        </View>
        <IconCheck height={23} width={25} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.photoProfileContainer}>
          <Image source={ImageHeader} style={styles.photoProfile} />
          <IconEdit height={30} width={30} style={styles.iconEdit} />
        </View>
        <TextInput
          placeholderTextColor={'white'}
          style={styles.input}
          placeholder="Name"
        />
        <TextInput
          placeholderTextColor={'white'}
          style={styles.input}
          placeholder="Username"
        />
        <TextInput
          placeholderTextColor={'white'}
          style={styles.input}
          placeholder="Email"
        />
        <TextInput
          placeholderTextColor={'white'}
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Button type={'login'}>LOGOUT</Button>
        </View>
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
    marginTop: 50
  }
});
