import {StyleSheet, View} from 'react-native';
import React, { useState } from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {IconSearch} from '../../assets';

const SearchBar = ({activeGenre}) => {
  const [search, setSearch] = useState('');
  const onChangeText = text => {
    setSearch(text);
  };
  console.log('search', search)
  return (
    <View>
      <TextInput
        style={styles.searchBar}
        onChangeText={onChangeText}
        value={search}
      />
      <IconSearch style={styles.searchIcon} />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 36,
    paddingLeft: 30,
    marginBottom: 20,
  },
  searchIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});
