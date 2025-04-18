import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Searchbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.searchBarContainer}>
      <View style={styles.searchBarCont}>
        <TextInput
          placeholder="Search Name/ Mobile No."
          style={styles.searchBar}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Icon name="search" size={30} color="#462C77" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    searchBarContainer:{
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    },

    searchBarCont: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor:'#4B0082',
    borderRadius:30,
  },
  searchBar: {
    flex: 1,
    fontSize:20,
    paddingVertical: 8,
    color:'#462C77',
  },
});

export default Searchbar;
