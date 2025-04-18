import React from 'react';
import {
    Image,
    StyleSheet,
    View,
} from 'react-native';

const Header = () => {
const logoimg = require('../assets/logo.png');

  return (
   <View style={styles.container}>
   <View style={styles.circleTopLeft} />
   <View style={styles.circleBottomRight} />
   <View style={styles.content}>
   {/* <Image source={logoimg} style={styles.img}/> */}
   </View>
   </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      circleTopLeft: {
        position: 'absolute',
        top: -220,
        left: 150,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: '#553B85',
      },
      circleBottomRight: {
        position: 'absolute',
        bottom: -80,
        right: -120,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: '#654E90',
      },
      content: {
        alignItems: 'center',
        zIndex: 2,
      },
      img : {
        width:150,
        height:100,
        position:'relative',
        left:100,
        top: -35
        ,
      },
});

export default Header;
