import { View, Text, Switch, StyleSheet, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';

const CyberSecurity = () => {
  const [toggles, setToggles] = useState({
    phishing: false,
    camMic: false,
    spyware: false,
    otpDiv: false,
    inciResponse: false,
    fraudDetect: false,
    blockFraudPay: false,
    blockIP: false,
    antivirus: false,
  });

  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const options = [
    { key: 'phishing', label: 'Phishing Protection' },
    { key: 'camMic', label: 'Camera & Microphone Attack Prevention' },
    { key: 'spyware', label: 'Spyware & Remote Access Tool' },
    { key: 'otpDiv', label: 'OTP Diversion' },
    { key: 'inciResponse', label: 'Incident Response Tools' },
    { key: 'fraudDetect', label: 'Fraud Detection' },
    { key: 'blockFraudPay', label: 'Block Fraud Payments' },
    { key: 'blockIP', label: 'Block Reported IP Address' },
    { key: 'antivirus', label: 'Antivirus Security' },
  ];

  const images = [
    require('../assets/1cyba.jpg'),
    require('../assets/2cyba.png'),
    require('../assets/3cyba.webp'),
    require('../assets/4cyba.jpg'),
  ];

  return (
    <ScrollView style={styles.cyberList}>
      {options.map((item) => (
        <View key={item.key} style={styles.cyberItem}>
          <Text style={styles.cyberLabel}>{item.label}</Text>
          <Switch
            value={toggles[item.key]}
            onValueChange={() => handleToggle(item.key)}
            thumbColor={toggles[item.key] ? '#2196F3' : '#ccc'}
            trackColor={{ false: '#ccc', true: '#90CAF9' }}
          />
        </View>
      ))}

      <View style={styles.imageContainer}>
        {images.map((img, index) => (
          <Image key={index} source={img} style={styles.imageThumb} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cyberList: {
   
    flex: 1,
    backgroundColor: '#fff',
  },
  cyberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  cyberLabel: {
    fontSize: 18,
    flex: 1,
    color: '#111',
    textTransform: 'capitalize',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    marginTop:'30%',
    opacity:0.7,
  },
  imageThumb: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default CyberSecurity;





