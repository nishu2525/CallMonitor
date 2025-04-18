import React, { useState } from 'react';
import {
  Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Header from './components/Header';
import InputField from './components/InputField ';
import Icon from 'react-native-vector-icons/FontAwesome';
import EIconsfacebok from 'react-native-vector-icons/EvilIcons';




const Signup = ({ navigation }) => {
  const gimg = require('./assets/g_icon.png');
  const [fullName,setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  const [fullNameError, setFullNameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateInputs =()=>{
    let isValid = true;

    if (!fullName.trim()) {
      setFullNameError('Full Name is required');
      isValid = false;
    } else {
      setFullNameError('');
    }

    if (!mobileNumber) {
      setMobileError('Mobile number is required');
      isValid = false;
    } else if (!/^\d{10}$/.test(mobileNumber)) {
      setMobileError('Enter a valid 10-digit number');
      isValid = false;
    } else {
      setMobileError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // if (isValid) {
    //   // Temporarily navigate until API is integrated
    //   navigation.navigate('Numberlog');
    // }
  }
  return (
   <View style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>
        <View style={styles.header2}>
        <Text style={styles.title}>Signup</Text>
        <Text style={styles.subtitle}>Experience the best alternate to Cash</Text>
        </View>
      <View style={styles.main}>
      <View>
      <Text style={styles.name}>Full Name</Text>
      <InputField
        value={fullName}
        onChangeText={setFullName}
      />
      {fullNameError ? <Text style={styles.errorText}>{fullNameError}</Text> : null}
      <Text style={styles.name1}>Mobile Number</Text>
      <InputField
        value={mobileNumber}
        onChangeText={setMobileNumber}
         keyboardType="numeric"
      />
        {mobileError ? <Text style={styles.errorText}>{mobileError}</Text> : null}
       <Text style={styles.name2}>Password</Text>
      <InputField
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
       {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> :null }

        <TouchableOpacity style={styles.loginButton} onPress={()=>navigation.navigate('Numberlog')}>
          <Text style={styles.loginButtonText} >Next</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.signupText}>
        Already have an account?{' '}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate('Signin')}>Login
          </Text>
        </Text>
        <Text style={styles.orText}>Or you can login using below option </Text>
        <View style={styles.socialBtn}>
        <TouchableOpacity style={styles.socialBtnTxt}>
            <EIconsfacebok name={'sc-facebook'} color ="white" size={42}/>
            <Text style={{fontSize:20 , color:'#fff'}}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtnTxtG}>
            <Image source={gimg} style={styles.gimg}/>
            <Text  style={{fontSize:20 , color:'#fff'}}>Google Plus</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
   </View>
  );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    height:'auto',
    flexDirection:'column',
    backgroundColor: '#462C77',
    justifyContent: 'space-around',
  },
  header: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    flex:0.2,
    paddingLeft: 20,
    position:'absolute',
    top:45,
  },
  header2: {
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems: 'flex-start',
    flex:0.2,
    paddingLeft: 10,
    paddingTop:35,
    position:'absolute',
    top:45},
  main:{
    flex:0.8,
    backgroundColor:'#fff',
    padding: 20,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    position:'relative',
    top:100,bottom:0,
    height:'80%',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'semibold',
    zIndex:5,
  },
  subtitle: {
    color:'#fff',
    fontSize: 20,
  },
  name:{
    position:'absolute',
    top:8,
    left:2,
    zIndex:2,
    fontSize:20,
    backgroundColor:'#fff',
    marginLeft:20,
    padding:8,
   color:"#654E90"
  },
  name1:{
    position:'absolute',
    top:130,
    left:2,
    zIndex:2,
    fontSize:20,
    backgroundColor:'#fff',
    marginLeft:20,
    padding:8,
   color:"#654E90"
  },
  name2:{
    position:'absolute',
    top:250,
    left:2,
    zIndex:2,
    fontSize:20,
    backgroundColor:'#fff',
    marginLeft:20,
    padding:8,
    color:"#654E90"
    },
    errorText: {
      color: 'red',
      fontSize: 10,
      marginLeft: 20,
      marginTop: 4,
    },
  loginButton: {
    backgroundColor:'#4B0082',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 30,
    marginVertical: 20,
    marginHorizontal:'20%',
    paddingHorizontal:25,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    marginTop: 5,
  },
  signupText: {
    color: '#4B0082',
    fontSize: 20,
  },
  signupLink: {
    color: '#4B0082',

    textDecorationLine:'underline',
  },
  orText:{
    color:'#595959',
    fontSize: 18,
    marginTop:15,
  },
  socialBtn:{
    position:'absolute',
    top:80,
    flex:1,
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between',
  },
  socialBtnTxt:{
    fontSize:16,
    backgroundColor:'#0033cc',
    justifyContent:'space-evenly',
    flexDirection:'row',
    textAlignVertical:'center',
    paddingHorizontal:22,
    paddingVertical:15,

  },
  socialBtnTxtG:{
    fontSize:16,
    backgroundColor:'#e60000',
    justifyContent:'space-evenly',
    flexDirection:'row',
    textAlignVertical:'center',
    paddingHorizontal:22,
    paddingVertical:15,
  },
  gimg:{
    height:30,
    width:30,
  },
});

export default Signup;

