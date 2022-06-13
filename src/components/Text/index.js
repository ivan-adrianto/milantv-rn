import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CustomText = ({style, children, onPress, ...props}) => {
  return (
    <Text onPress={onPress} style={[styles.text, style]}>
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Regular',
    color: 'white',
  },
});
