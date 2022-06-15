import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CustomText = ({
  style,
  children,
  onPress,
  color,
  size,
  bold,
  ...props
}) => {
  return (
    <Text onPress={onPress} style={[styles.text(color, size, bold), style]}>
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: (color, size, bold) => ({
    fontFamily: 'Roboto-Regular',
    color: color || 'white',
    fontSize: size || 14,
    fontWeight: bold ? 'bold' : 'normal',
  }),
});
