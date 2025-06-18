import React, { useState } from 'react';
import {
  Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Header from './components/Header';
import InputField from './components/InputField ';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesignarrow from 'react-native-vector-icons/AntDesign';
const Numberlog = ({navigation}) => {
  const flag = require('./assets/canadaflag.jpg');
  const background = require('./assets/cnTower.png');

  const [mobileNumber, setMobileNumber] = useState('');
  const [isModalVisible,setIsModalVisible] = useState(false);

  return (
   <View  style={styles.container}>
    <View  style={styles.header}>
        <Header />
    </View>
        <View style={styles.header2}>
    <AntDesignarrow name={'arrowleft'} color="white" size={50}  onPress={() => navigation.navigate('Signup')}/>
        <Text style={styles.title}>What&apos;s your number?</Text>
        <Text style={styles.subtitle}>We&apos;ll text a code to verify your phone.</Text>
        </View>
    <View style={styles.main}>
    <Text style={styles.name1}>Mobile Number</Text>
    <View style={styles.ipt}>
    <Image source={flag} style={styles.flag}/>
    <Text style={styles.name2}>+1</Text>
    </View>
      <InputField
        value={mobileNumber}
        keyboardType="numeric"
        onChangeText={(text) => setMobileNumber(text)}
        inputStyle={{ paddingLeft: 90 , marginTop: 15}} 
      />
       <TouchableOpacity style={styles.loginButton} onPress={()=>setIsModalVisible(true)}>
          <Text style={styles.loginButtonText} onPress={()=>setIsModalVisible(true)}>Next</Text>
        </TouchableOpacity>
        <Image source={background} style={styles.bg}/>
        </View>

        <Modal
            visible={isModalVisible}
            onRequestClose={()=>setIsModalVisible(false)}
            animationType="fade"
            transparent={true}>
        <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
                <Text  style={styles.modalHeader}>Start with phone number:</Text>
                <Text style={styles.phoneNumber}>+1 {mobileNumber}</Text>
                <Text  style={styles.modalText}>We will send the authentication code
                to the phone number you entered.</Text>
                <Text style={styles.modalText}>Do you want continue?</Text>

                <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => {
                  setIsModalVisible(false);
                  navigation.navigate('OtpScreen', { mobileNumber: mobileNumber });
                }}
              >
                <Text style={styles.buttonText2}>Next</Text>
              </TouchableOpacity>
            </View>
            </View>

        </View>
        </Modal>
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
        flex:0.15,
        paddingLeft: 20,
        position:'absolute',
        top:45,
      },
      header2: {
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems: 'flex-start',
        flex:0.15,
        paddingLeft: 10,
        paddingTop:35,
        paddingBottom:10,
        position:'absolute',
        top:45},

      main:{
        flex:0.76,
        backgroundColor:'#fff',
        padding: 20,
        paddingBottom:0,
        marginTop:10,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        position:'relative',
        top:100,bottom:0,
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
      name1:{
        position:'absolute',
        top:30,
        left:15,
        zIndex:2,
        fontSize:24,
        backgroundColor:'#fff',
        marginLeft:20,
        padding:8,
        color:'#9e90bb',
      },
      name2:{
        zIndex:2,
        fontSize:26,
        padding:8,
        color:'#9e90bb',
        },
        loginButton: {
            backgroundColor:'#4B0082',
            paddingVertical: 15,
            alignItems: 'center',
            borderRadius: 30,
            // marginVertical: 20,
            marginHorizontal:'20%',
            paddingHorizontal:25,
            // marginTop:150,
          },
          loginButtonText: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
          },
          modalBackground: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(106, 83, 148, 0.9)',
          },
          modalContainer: {
            width: '90%',
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            padding: 15,
            alignItems: 'center',
          },
          modalHeader: {
            fontSize: 20,
            fontWeight: 'semibold',
            color: '#462C77',
          },
          phoneNumber: {
            fontSize: 22,
            color: '#462C77',
            fontWeight: 'bold',
            marginVertical:10,
          },
          modalText: {
            fontSize:20,
            color: '#462C77',
            fontWeight:'400',
            textAlign: 'center',
            marginBottom: 20,
          },
          buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '70%',
          },
          cancelButton: {
            backgroundColor: '#462C77',
            borderColor: '#462C77',
            color:'#fff',
            borderWidth: 1,
            padding: 10,
            borderRadius: 30,
            width: '45%',
            alignItems: 'center',
            paddingHorizontal:2,
          },
          nextButton: {
            borderColor: '#462C77',
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            padding: 10,
            // paddingHorizontal:1,
            borderRadius: 30,
            width: '45%',
            alignItems: 'center',
          },
          buttonText: {
            color:'#fff',
            fontSize: 18,
            fontWeight: 'bold',
          },
          buttonText2 :{
            fontWeight: 'bold',
             fontSize: 18,
            color:'#462C77',
          },
          flag:{
            height:40,
            width:40,
          },
          ipt:{
            flexDirection: 'row', 
          alignItems: 'center',
          position:'absolute',
            top:67,
            left:25,
          },
          bg:{
            height:150,
            width:350,
            flex:1,
            marginLeft:'5%',
            marginTop:'5%',
            marginBottom:'-3%',
            opacity:0.3,
          },
});

export default Numberlog;
