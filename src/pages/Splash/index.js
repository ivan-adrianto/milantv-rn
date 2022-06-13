import React, {useEffect} from 'react';
import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import {SplashLogo} from '../../assets';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image source={SplashLogo} style={styles.logo} />
      <Text style={styles.text}>MovReact</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Schoolbell-Regular',
  },
});
