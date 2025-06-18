import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import IcoN from 'react-native-vector-icons/MaterialCommunityIcons';



const Settings = ({ navigation }) => {

  const settingsOptions = [
    { icon: 'settings-outline', label: 'General' },
    { icon: 'language-outline', label: 'App Language' },
    { icon: 'call-outline', label: 'Calling' },
    { icon: 'server-outline', label: 'Data & Storage' },
    { icon: 'chatbubble-outline', label: 'Messaging' },
    { icon: 'ban-outline', label: 'Block' },
    { icon: 'server-security' , label:'cyber security', route: 'CyberSecurity'},
    { icon: 'location-outline', label: 'live location', route: 'ShareLocation' },
    { icon: 'color-palette-outline', label: 'Appearance' },
    { icon: 'cloud-upload-outline', label: 'Backup' },
    { icon: 'lock-closed-outline', label: 'Privacy Center' },
    { icon: 'information-circle-outline', label: 'About' },

  ];


  const renderIcon = (iconName) => {
    if (iconName === 'server-security') {
      return <IcoN name={iconName} size={25} color="#000" />;
    } else {
      return <Icon name={iconName} size={25} color="#000" />;
    }
  };

  return (

    
  <View style={styles.settingsList}>
   {settingsOptions.map((item, index) => (
     <TouchableOpacity key={index} style={styles.settingItem} onPress={() => navigation.navigate(item.route)}>
       <View style={styles.settingIcon}>
           {renderIcon(item.icon)}
       </View>
       <Text style={styles.settingLabel}>{item.label}</Text>
       <Icon name="chevron-forward-outline" size={25} color="#ccc" />
     </TouchableOpacity>
    ))}
  </View>
  );
};

const styles = StyleSheet.create({

  settingsList: {
    marginTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  settingIcon: {
    width: 30,
    
  },
  settingLabel: {
    fontSize: 18,
    flex: 1,
    marginLeft: 15,
    color : '#111',
    textTransform:'capitalize'
  },
});

export default Settings;

