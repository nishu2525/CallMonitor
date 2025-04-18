import React, {useEffect, useState} from 'react';
import {StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator,} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {PermissionsAndroid} from 'react-native';
import CallLogs from 'react-native-call-log';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { requestAndroidPermissions } from './src/utils/permissions'
// import Splash from './src/Splash';
import Signin from './src/Signin';
import Signup from './src/Signup';
import Numberlog from './src/Numberlog';
import OtpScreen from './src/OtpScreen';
import Latest from './src/contacts/Latest';
import ContactList from './src/contacts/ContactList';
import Invite from './src/Pages/Invite';
import Settings from './src/Pages/Settings';
import Premium from './src/Pages/Premium';
import IncomingCall from './src/contacts/IncomingCall';
import OutgoingCall from './src/contacts/OutgoingCall';
import MissedCall from './src/contacts/MissedCall';
import MenuButton from './src/components/MenuButton';
import SplashScreen from 'react-native-splash-screen';




const MoreButton = ({onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Icon name="more-vert" size={24} color="#fff" />
  </TouchableOpacity>
);

const screenOptions = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    let iconName;
    let IconComponent = Icon;

    if (route.name === 'Call') {
      iconName = 'call-outline';
      IconComponent = Ionicons;
    } else if (route.name === 'Contact') {
      iconName = 'contacts';
      IconComponent = AntDesign;
    } else if (route.name === 'Invite') {
      iconName = 'gift';
      IconComponent = AntDesign;
    } else if (route.name === 'Premium') {
      iconName = 'crown-outline';
      IconComponent = MaterialCommunityIcons;
    }
    return (
      <View
        style={{
          borderBottomWidth: focused ? 3 : 0,
          borderBottomColor: focused ? '#462C77' : 'transparent',
          paddingBottom: 5,
          alignItems: 'center',
        }}>
        <IconComponent name={iconName} size={30} color={color} />
        <Text style={{color, fontSize: 12}}>{route.name}</Text>
      </View>
    );
  },
  tabBarActiveTintColor: '#462C77',
  tabBarInactiveTintColor: '#462C77',
  tabBarLabel: () => null,
  tabBarLabelStyle: {
    fontSize: 18,
  },
  tabBarStyle: {
    height: 70,
    shadowColor: '#000',
    shadowOffset: { height: -5},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
});

const TabNavigator = ({callLogs, updateCallLogs}) => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Call"
        component={Latest}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: 'Latest Activity',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#462C77'},
          headerTintColor: '#fff',
          headerLeft: () => (
            <MenuButton navigation={navigation} callLogs={callLogs} />
          ),
          headerRight: () => (
            <MoreButton onPress={() => navigation.navigate('Settings')} />
          ),
        })}
      />
      <Tab.Screen
        name="Contact"
        component={ContactList}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: 'Contact List',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#462C77'},
          headerTintColor: '#fff',
          headerRight: () => (
            <MoreButton onPress={() => navigation.navigate('Settings')} />
          ),
        })}
      />
      <Tab.Screen
        name="Invite"
        component={Invite}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: 'Invite Friends',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#462C77'},
          headerTintColor: '#fff',
          headerRight: () => (
            <MoreButton onPress={() => navigation.navigate('Settings')} />
          ),
        })}
      />
      <Tab.Screen
        name="Premium"
        component={Premium}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: 'Premium',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#462C77'},
          headerTintColor: '#fff',
          headerRight: () => (
            <MoreButton onPress={() => navigation.navigate('Settings')} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const App = () => {

  const Stack = createNativeStackNavigator();
  const [callLogs, setCallLogs] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);
  
  useEffect(() => {
    requestAndroidPermissions();
  }, []);
  const fetchCallLogs = async () => {
    try {
      const logs = await CallLogs.loadAll();
      setCallLogs(logs);
    } catch (error) {
      console.error('Error fetching call logs:', error);
    }
  };

  const updateCallLogs = newCallDetails => {
    setCallLogs(prevLogs => [newCallDetails, ...prevLogs]);
  };

  useEffect(() => {
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
          },
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
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#462C77" barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Signin"
          screenOptions={{
            headerShown: true,
            headerBackVisible: false,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#462C77',
            },
            headerTintColor: '#fff',
          }}>
          {/* <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          /> */}
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Numberlog"
            component={Numberlog}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OtpScreen"
            component={OtpScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="IncomingCall"
            component={IncomingCall}
            options={({navigation}) => ({
              headerShown: true,
              headerTitle: 'Incoming Calls',
              headerRight: () => (
                <MoreButton onPress={() => navigation.navigate('Settings')} />
              ),
            })}
          />
          <Stack.Screen
            name="OutgoingCall"
            component={OutgoingCall}
            options={({navigation}) => ({
              headerShown: true,
              headerTitle: 'Outgoing Calls',
              headerRight: () => (
                <MoreButton onPress={() => navigation.navigate('Settings')} />
              ),
            })}
          />
          <Stack.Screen
            name="MissedCall"
            component={MissedCall}
            options={({navigation}) => ({
              headerShown: true,
              headerTitle: 'Missed Calls',
              headerRight: () => (
                <MoreButton onPress={() => navigation.navigate('Settings')} />
              ),
            })}
          />
          <Stack.Screen name="Home" options={{headerShown: false}}>
            {props => (
              <TabNavigator
                {...props}
                callLogs={callLogs}
                updateCallLogs={updateCallLogs}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              title: 'Settings',
              headerBackVisible: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
