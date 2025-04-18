import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CallLogs from 'react-native-call-log';
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PermissionsAndroid } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const Latest = ({ route, navigation }) => {
  const [callLogs, setCallLogs] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const requestCallLogPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
            {
              title: 'Call Log Example',
              message: 'Access your call logs',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            fetchCallLogs();
          } else {
            console.log('Call log permission denied');
          }
        } catch (error) {
          console.log('Permission error: ', error);
        }
      };
      requestCallLogPermission();
    }, [])
  );

  const fetchCallLogs = async () => {
    try {
      const logs = await CallLogs.loadAll();
      console.log('Call Logs:', logs);
      setCallLogs(logs);
    } catch (error) {
      console.log('Error fetching call logs:', error);
    }
  };

  const updateCallLogs = (newCallDetails) => {
    setCallLogs((prevLogs) => [newCallDetails, ...prevLogs]);
  };

  useEffect(() => {
    if (route.params?.newCallDetails) {
      updateCallLogs(route.params.newCallDetails);
    }
  }, [route.params?.newCallDetails]);

  const renderCallItem = ({ item }) => {
    let callTypeIcon;
    if (item.type === 'OUTGOING') {
      callTypeIcon = <Icon name="phone-outgoing" size={20} color="#161d7d" />;
    } else if (item.type === 'INCOMING') {
      callTypeIcon = <Icon name="phone-incoming" size={20} color="#28b30c" />;
    } else if (item.type === 'MISSED') {
      callTypeIcon = <Icon name="phone-missed" size={20} color="#eb0707" />;
    }else if (item.type === 'INCOMING' && item.duration === 0) {
      callTypeIcon = <Icon name="phone-off" size={20} color="#ff4500" />;
    }
    const displayName = item?.name || 'Unknown';
    const phoneNumber = item?.phoneNumber || 'No Number';
    const formattedTime = new Date(parseInt(item.timestamp, 10)).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <TouchableOpacity style={styles.contactItem}>
        <View style={styles.profileImage}>
          <Text style={{ fontSize: 25 }}>{displayName[0]}</Text>
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{displayName}</Text>
          <Text style={styles.contactPhone}>{phoneNumber}</Text>
        </View>
        <View style={styles.callDetails}>
          {callTypeIcon}
          <Text style={styles.time}>{formattedTime}</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {callLogs.length > 0 ? (
        <FlatList
          data={callLogs}
          renderItem={renderCallItem}
          style={styles.contactList}
          keyExtractor={(item) => item.phoneNumber + item.timestamp}
        />
      ) : (
        <View style={styles.containerbox}>
          <Text style={{ fontSize: 25 }}>No call logs available</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerbox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactList: {
    flexGrow: 1,
    padding: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    paddingHorizontal:5,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f4a1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 16,
  },
  contactName: {
    fontSize: 20,
    fontWeight: '550',
    color:'#161d7d',
  },
  contactPhone: {
    fontSize: 18,
    color:'#a2a2ba',

  },
  callDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'flex-start',
  },
  time: {
    fontSize: 14,
    marginLeft: 5,
    color:'#a2a2ba',
  },
});

export default Latest;
