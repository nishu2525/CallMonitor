import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


const Settings = () => {

  const settingsOptions = [
    { icon: 'settings-outline', label: 'General' },
    { icon: 'language-outline', label: 'App Language' },
    { icon: 'call-outline', label: 'Calling' },
    { icon: 'server-outline', label: 'Data & Storage' },
    { icon: 'chatbubble-outline', label: 'Messaging' },
    { icon: 'ban-outline', label: 'Block' },
    { icon: 'color-palette-outline', label: 'Appearance' },
    { icon: 'cloud-upload-outline', label: 'Backup' },
    { icon: 'lock-closed-outline', label: 'Privacy Center' },
    { icon: 'information-circle-outline', label: 'About' },
  ];

  return (
  <View style={styles.settingsList}>
   {settingsOptions.map((item, index) => (
     <TouchableOpacity key={index} style={styles.settingItem}>
       <View style={styles.settingIcon}>
         <Icon name={item.icon} size={25} color="#000" />
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
  },
});

export default Settings;

