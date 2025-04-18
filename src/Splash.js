import React, { useEffect } from 'react';
import {
    Image,
    StyleSheet,
    View,
} from 'react-native';

const logoimg = require('./assets/logo.png');
const Splash = ({navigation}) => {

    useEffect(()=>{
        setTimeout(()=> {
            navigation.navigate('Signin');
        },2000);
    });

  return (
   <View style={styles.back}>
    <Image source={logoimg} style={styles.img}/>
   </View>
  );
};

const styles = StyleSheet.create({
    back:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#462C77',
    },
    img : {
      width:400,
      height:400,
    },
});

export default Splash;
