import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
// import { requestCallLogPermission, fetchCallLogs } from '../utils/callLogUtils';

const CallScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { displayName, phoneNumber } = route.params;
  const onCallEndRef = route.params.onCallEndRef;

  const getInitial = (name) => {
    return name ? name[0].toUpperCase() : 'U';
  };

  const endCall = () => {
    const callDetails = {
      name: displayName,
      phoneNumber,
      timestamp: Date.now(),
      type: 'OUTGOING',
    };
    if (route.params.onCallEndRef && route.params.onCallEndRef.current) {
      route.params.onCallEndRef.current(callDetails);
    }
    navigation.navigate('Call');
  };


  return (
    <View style={styles.container}>

    <View style={styles.circle}>
      <Text style={styles.initial}>{getInitial(displayName)}</Text>
    </View>

    <Text style={styles.name}>{displayName}</Text>
    <Text style={styles.phone}>{phoneNumber}</Text>


    <View style={styles.actionsContainer}>

      <View style={[styles.actionsRow , styles.extra]}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="mic-off" size={35} color="#ccc" />
          <Text style={styles.actionText}>Mute</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="bluetooth" size={32} color="#ccc" />
          <Text style={styles.actionText}>Bluetooth</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="pause" size={35} color="#ccc" />
          <Text style={styles.actionText}>Hold</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="grid" size={35} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={endCall}>
          <Icon name="phone-off" size={35} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="volume-2" size={35} color="#ccc" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
      },
      circle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#FFD4DC',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
      },
      initial: {
        fontSize: 60,
        color: '#fff',
      },
      name: {
        fontSize: 28,
        color: '#111',
        fontWeight: 'bold',
        marginBottom: 8,
      },
      phone: {
        fontSize: 20,
        color: '#111',
        marginBottom: 40,
      },
      actionsContainer: {
        width: '90%',
        paddingHorizontal: 30,
        borderTopWidth:1,
        paddingTop:20,
        borderTopColor:'#ccc',
      },
      actionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 50,
        gap:5,
      },
      actionButton: {
        flex: 1,
        alignItems: 'center',
      },
      extra:{
        gap:65,
      },

  });

export default CallScreen;
