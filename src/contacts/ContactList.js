import React, { useEffect, useState } from 'react';
import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform
} from 'react-native';
import Contacts from 'react-native-contacts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Searchbar from '../components/Searchbar';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CallLogs from 'react-native-call-log';

const ContactList = ({ route }) => {
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('Saved');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (activeTab === 'Saved') {
      getContactsPermission();
    }
  }, [activeTab]);

  useEffect(() => {
    const checkCallStatus = async () => {
      if (isCalling) {
        const callLog = await CallLogs.load(10);
        const lastCall = callLog[0];
        if (lastCall) {
          setIsCalling(false);
          navigation.navigate('Call');
        }
      }
    };
    const interval = setInterval(() => {
      checkCallStatus();
    }, 2000);

    return () => clearInterval(interval);
  }, [isCalling, navigation]);

  
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
          setContacts([]);
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
      console.log('Fetched Contacts:', allContacts.length);

      if (allContacts.length === 0) {
        Alert.alert('No Contacts Found', 'Your device does not contain any contacts.');
      }

      const sorted = allContacts.sort((a, b) =>
        a.displayName.localeCompare(b.displayName)
      );
      setContacts(sorted);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      Alert.alert('Error', 'Could not load contacts. Please try again.');
    }
  };

  const filterdContact = contacts.filter((contact) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      contact.displayName.toLowerCase().includes(lowerCaseQuery) ||
      contact.phoneNumbers[0]?.number.includes(searchQuery)
    );
  });

  const handleCall = (item) => {
    const phoneNumber = item.phoneNumbers[0]?.number;
    if (!phoneNumber) {
      console.log('No phone number available');
      return;
    }

    const cleanedPhoneNumber = phoneNumber.replace(/[^\d+]/g, '');
    if (cleanedPhoneNumber.length === 0) {
      console.log('Invalid phone number format');
      return;
    }

    Linking.openURL(`tel:${cleanedPhoneNumber}`)
      .then(() => {
        setIsCalling(true);
      })
      .catch((err) => console.error('Failed to open dialer:', err));
  };

  const handleDelete = (recordID) => {
    console.log(`Delete contact with ID: ${recordID}`);
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

  const renderHiddenItem = (data) => (
    <View style={styles.rowBack}>
      <TouchableOpacity onPress={() => handleCall(data.item)}>
        <Icon name="call" size={30} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleDelete(data.item.recordID)}>
        <Icon name="delete" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );

  const renderTabContent = () => {
    if (activeTab === 'Saved') {
      if (filterdContact.length === 0) {
        return (
          <View style={styles.blankPage}>
            <Text style={styles.blankText}>No saved contacts found.</Text>
          </View>
        );
      }
      return (
        <SwipeListView
          data={filterdContact}
          keyExtractor={(item) => item.recordID}
          renderItem={renderContactItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-75}
          disableRightSwipe={true}
          recalculateHiddenLayout={true}
          style={styles.contactList}
        />
      );
    } else {
      return (
        <View style={styles.blankPage}>
          <Text style={styles.blankText}>No identified contacts.</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Saved' && styles.activeTab]}
          onPress={() => setActiveTab('Saved')}
        >
          <Icon name="person" size={20} color={activeTab === 'Saved' ? '#462C77' : '#999'} />
          <Text style={[styles.tabText, activeTab === 'Saved' && styles.activeTabText]}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Identified' && styles.activeTab]}
          onPress={() => setActiveTab('Identified')}
        >
          <Icon name="lock" size={20} color={activeTab === 'Identified' ? '#462C77' : '#999'} />
          <Text style={[styles.tabText, activeTab === 'Identified' && styles.activeTabText]}>Identified</Text>
        </TouchableOpacity>
      </View>

      {renderTabContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  rowBack: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    alignItems: 'center',
    backgroundColor: '#462C77',
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#f4f4f4',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tabButton: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabText: {
    color: '#999',
    fontWeight: 'bold',
    marginTop: 4,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#462C77',
  },
  activeTabText: {
    color: '#462C77',
  },
  contactList: {
    padding: 16,
  },
  contactItem: {
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
  blankPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blankText: {
    fontSize: 24,
    color: 'gray',
  },
});

export default ContactList;
