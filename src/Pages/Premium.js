import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

const Premium = () => {
  return (
    <View style={styles.containerbox}>
    <Text style={{ fontSize: 25 }} >Buy Premium Services</Text>
  </View>
  );
};

const styles = StyleSheet.create({
  containerbox:{
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    color: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Premium;
