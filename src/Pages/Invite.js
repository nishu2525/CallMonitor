import React from 'react';
import {Alert, Image, Share, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
const invite = require('../assets/invite.png');
import Icon from 'react-native-vector-icons/FontAwesome';
import ShareIcon from 'react-native-vector-icons/Feather';


const Invite = () => {
  const inviteMessage =
    'Hey! Check out this cool Call Monitor app: click below to download';
  const inviteLink = 'https://www.google.com';

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:`${inviteMessage} ${inviteLink}`,
      });
      if (result.action === Share.sharedAction) {
        Alert.alert('Shared', 'Link shared successfully!');
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={invite} style={styles.img} />
      <Text style={styles.text1}>
        Free upgrade to Premium for 1 week when your friends install Call Monitor
      </Text>
      <Text style={styles.text2}>
        Premium badge, see who viewed your profile, remove all ads and more.
      </Text>
      <View style={styles.logocontainer}>
        <TouchableOpacity style={styles.fBg}>
          <Icon name="facebook"  onPress={onShare} size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.fBg, styles.wBg]}>
          <Icon name="whatsapp"  onPress={onShare} size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.fBg, styles.sBg]}>
          <ShareIcon name="share-2" onPress={onShare} size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  fBg:{
    backgroundColor:'blue',
    padding:5,
    width:60,
    height:60,
    alignItems: 'center',
    borderRadius:30,
 justifyContent: 'center',
  },
  wBg:{backgroundColor:'green'},
  sBg:{ backgroundColor:'indigo'},

  img: {
    marginTop: -100,
  },
  text1: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 'bold',
    color: '#383735',
  },
  text2: {
    paddingHorizontal: 15,
    textAlign: 'center',
    fontSize: 15,
    marginTop: 10,
    color: '#383735',
  },
  logocontainer: {
    marginTop: 50,
    flex: 0.15,
    width: '70%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
});

export default Invite;
