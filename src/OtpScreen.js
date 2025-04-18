import React, { useEffect, useRef, useState } from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Header from './components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesignarrow from 'react-native-vector-icons/AntDesign';
import EvilIconsnarrow from 'react-native-vector-icons/Fontisto';
import InputField from './components/InputField ';

const OtpScreen = ({route, navigation}) => {

    const [timer, setTimer] = useState(30);
    const [otp, setOtp] = useState(['', '', '', '']);
  const {mobileNumber} = route.params;

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);

  const inputRefs = useRef([]);
  const handleInputChange = (text, index) => {
    if (/^\d$/.test(text)) {
      let newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>
      <View style={styles.header2}>
        <AntDesignarrow
          name={'arrowleft'}
          color="white"
          size={50}
          onPress={() => navigation.navigate('Numberlog')}
        />
        <Text style={styles.title}>What’s the code?</Text>
        <Text style={styles.subtitle}>
          Enter the code sent to +91 {mobileNumber}
        </Text>
      </View>
      <View style={styles.main}>
      <View style={styles.otpinput}>
      {otp.map((_, index) => (
            <TextInput
              key={index}
              ref={(ref) => inputRefs.current[index] = ref}
              style={styles.inputStyle}
              keyboardType="numeric"
              maxLength={1}
              value={otp[index]}
              onChangeText={(text) => handleInputChange(text, index)}
            />
          ))}
</View>
        <View style={styles.butNcontainer}>
          <View>
            <TouchableOpacity style={styles.resenBtn}><Text style={styles.resenBtntext}>Resend Code</Text></TouchableOpacity>
          </View>
          <View style={styles.timerContan}>
            <EvilIconsnarrow name={'clock'} size={22} style={{marginTop:10,  color:'#c1c4c9'}}/>
            <Text style={styles.resenBtn2}>{timer}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.loginButton}   onPress={() => navigation.navigate('Home', { screen: 'Latest' })}>
          <Text style={styles.loginButtonText} >Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 'auto',
    flexDirection: 'column',
    backgroundColor: '#462C77',
    justifyContent: 'space-around',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 0.15,
    paddingLeft: 20,
    position: 'absolute',
    top: 45,
  },
  header2: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 0.15,
    paddingLeft: 10,
    paddingTop: 35,
    paddingBottom: 10,
    position: 'absolute',
    top: 45,
  },

  main: {
    flex: 0.76,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 0,
    marginTop: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: 'relative',
    top: 100,
    bottom: 0,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'semibold',
    zIndex: 5,
  },
  subtitle: {
    color: '#fff',
    fontSize: 20,
  },
  otpinput: {
    flex: 0.25,
    fontSize: 25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  butNcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  resenBtn: {
    marginTop: 15,
    backgroundColor: '#dce5f7',
    borderRadius: 10,
  },
  resenBtntext: {
    fontSize: 22,
    padding: 10,
  },
  resenBtn2: {
    borderRadius: 10,
    fontSize: 32,
    color: '#c1c4c9',
  },
  timerContan: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 10,
    marginRight: 15,
  },
  loginButton: {
    backgroundColor: '#4B0082',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 30,
    marginVertical: 20,
    marginHorizontal: '20%',
    paddingHorizontal: 25,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputStyle: {
    fontSize: 25,
    textAlign: 'center',
    borderColor: '#462C77',
    borderWidth: 1,
    marginHorizontal: 10,
    padding:20,
    borderRadius: 10,
    textDecorationLine: 'underline',
    textDecorationColor: '#4B0082',
  },
});

export default OtpScreen;
