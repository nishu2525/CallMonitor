import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import IconCrs from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Feather';

const OutgoingCall = ({ route, navigation }) => {

  const { filteredCalls } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Call')}>
          <IconCrs name="close" size={30} color="#fff" style={{ marginRight: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const renderCallItem = ({ item }) => {
    const formattedTime = new Date(parseInt(item.timestamp, 10)).toLocaleString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    let callTypeIcon;
    if (item.type === 'OUTGOING') {
      callTypeIcon = <Icon name="phone-outgoing" size={20} color="#161d7d" />;
    } else if (item.type === 'INCOMING') {
      callTypeIcon = <Icon name="phone-incoming" size={20} color="#28b30c" />;
    } else if (item.type === 'MISSED') {
      callTypeIcon = <Icon name="phone-missed" size={20} color="#eb0707" />;
    }


   return(
    <TouchableOpacity style={styles.contactItem}>
    <View style={styles.profileImage}>
      <Text style={{ fontSize: 25 }}>{item?.name ? item.name[0] : 'U'}</Text>
    </View>
    <View style={styles.contactInfo}>
      <Text style={styles.contactName}>{item?.name || 'Unknown'}</Text>
      <Text style={styles.contactPhone}>{item?.phoneNumber}</Text>
    </View>
    <View style={styles.callDetails}>
      {callTypeIcon}
      <Text style={styles.time}>{formattedTime}</Text>
    </View>
  </TouchableOpacity>
   );
};

  return (
<View style={styles.container}>
        {filteredCalls.length > 0 ? (
        <FlatList
          data={filteredCalls}
          renderItem={renderCallItem}
          style={styles.contactList}
          keyExtractor={(item) => item.phoneNumber + item.timestamp}
        />
      ) : (
        <View style={styles.containerbox}>
          <Text style={{ fontSize: 25 }} >No Outgoing calls yet</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    containerbox:{
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
      color: '#eee',
      alignItems: 'center',
      justifyContent: 'center',
    },
    contactItem: {
      padding: 10,
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
    contactList: {
      flexGrow: 1,
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
    },
    time: {
      fontSize: 14,
      marginLeft: 5,
      color:'#a2a2ba',
    },
});
export default OutgoingCall;
