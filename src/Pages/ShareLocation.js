import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  PermissionsAndroid,
  Platform,
  Alert,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Contacts from 'react-native-contacts';

const ShareLocation = () => {
  const [contacts, setContacts] = useState([]);
  const [showContacts, setShowContacts] = useState(false);

  const getContactsPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts Permission',
            message: 'This app needs access to your contacts.',
            buttonPositive: 'OK',
          }
        );

        if (permission === PermissionsAndroid.RESULTS.GRANTED) {
          fetchContacts();
        } else {
          Alert.alert('Permission Denied', 'Cannot access contacts without permission');
        }
      } else {
        fetchContacts();
      }
    } catch (error) {
      console.error('Permission error:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const allContacts = await Contacts.getAll();
      const sorted = allContacts.sort((a, b) =>
        a.displayName.localeCompare(b.displayName)
      );
      setContacts(sorted);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      Alert.alert('Error', 'Could not load contacts. Please try again.');
    }
  };

  const handleSelectContacts = () => {
    console.log('Select contacts pressed');
  };

  const handleAddContactPress = () => {
    setShowContacts(true);
    getContactsPermission();
  };

  const renderContactItem = ({ item }) => (
    <TouchableOpacity style={styles.contactItem}>
      <View style={styles.profileImage}>
        <Text style={{ fontSize: 25 }}>{item?.displayName[0]}</Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item?.displayName}</Text>
        <Text style={styles.contactPhone}>{item?.phoneNumbers[0]?.number}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
    {!showContacts && (
      <>
        <View style={styles.heading}>
          <TouchableOpacity style={styles.Item} onPress={handleSelectContacts}>
            <View style={styles.Iconman}>
              <Icon name="person-add-outline" size={25} color="#000" />
            </View>
            <Text style={styles.label}>Select contacts to share your location</Text>
            <Icon name="chevron-forward-outline" size={25} color="#ccc" />
          </TouchableOpacity>
        </View>
  
        <View style={styles.AddBtn}>
          <Button title="Add Contact to Share location   +" onPress={handleAddContactPress} />
        </View>
      </>
    )}
  
    {showContacts && (
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.recordID}
        renderItem={renderContactItem}
        contentContainerStyle={styles.contactList}
      />
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  heading: {
    flex: 0.1,
    marginTop: 20,
  },
  Item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  Iconman: {
    width: 30,
  },
  label: {
    fontSize: 18,
    flex: 1,
    marginLeft: 15,
    color: '#111',
    textTransform: 'capitalize',
  },
  AddBtn: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactList: {

  },
  contactItem: {
    paddingLeft:20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
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
    fontWeight: 'bold',
  },
  contactPhone: {
    fontSize: 18,
    color: 'gray',
  },
});

export default ShareLocation;
