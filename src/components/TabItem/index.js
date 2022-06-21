import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  IconHome,
  IconHomeActive,
  IconProfile,
  IconReview,
  IconReviewActive,
} from '../../assets';
import { uriFormatter } from '../../helpers/uri';
import {WARNA_UTAMA, WARNA_DISABLE} from '../../utils/constant';

const TabItem = ({isFocused, onPress, onLongPress, label}) => {
  const data = useSelector(state => state.profile.dataGetProfile);

  const Profile = () => {
    return data?.avatar ? (
      <Image source={{uri: uriFormatter(data?.avatar)}} style={styles.profilePicture} />
    ) : (
      <IconProfile width={25} height={25} />
    );
  };
  const Icon = () => {
    if (label === 'Your Reviews')
      return isFocused ? <IconReviewActive /> : <IconReview />;

    if (label === 'HomeTab')
      return isFocused ? <IconHomeActive /> : <IconHome />;

    if (label === 'Profile') return <Profile />;

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
  profilePicture: {
    height: 25,
    width: 25,
    borderRadius: 50,
  },
});
