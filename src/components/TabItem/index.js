import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  IconHome,
  IconHomeActive,
  IconProfile,
  IconReview,
  IconReviewActive,
} from '../../assets';
import {
  WARNA_UTAMA,
  WARNA_DISABLE,
  REVIEW,
  PROFILE,
  HOME,
} from '../../utils/constant';

const TabItem = ({isFocused, onPress, onLongPress, label}) => {
  const Icon = () => {
    if (label === 'Your Reviews')
      return isFocused ? <IconReviewActive /> : <IconReview />;

    if (label === 'HomeTab') return isFocused ? <IconHomeActive /> : <IconHome />;

    if (label === 'Profile') return <IconProfile width={25} height={25} />;

    return <IconHome />;
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Icon />
    </TouchableOpacity>
  );
};

export default TabItem;

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    width: windowWidth / 3,
    backgroundColor: 'white',
  },
  text: isFocused => ({
    fontSize: 13,
    color: isFocused ? WARNA_UTAMA : WARNA_DISABLE,
    marginTop: 8,
  }),
});
