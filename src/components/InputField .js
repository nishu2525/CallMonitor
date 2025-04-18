import React from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';

const InputField = ({heading, value, onChangeText, secureTextEntry = false , keyboardType = 'default', inputStyle = {}}) => {
  return (
    <View>
       <Text >{heading}</Text>
    <TextInput
       style={[styles.input, inputStyle]}
      placeholderTextColor="#6d6d6d"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    position:'relative',
    zIndex:-1,
    borderColor: '#4B0082',
    borderWidth: 2,
    borderRadius: 20,
    padding: 25,
    marginVertical: 10,
    color: '#000',
    backgroundColor: '#fff',
    fontSize: 20,
  },
});

export default InputField;
