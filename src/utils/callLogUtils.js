import CallLogs from 'react-native-call-log';
import { PermissionsAndroid } from 'react-native';

export const requestCallLogPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      {
        title: 'Call Log Access',
        message: 'This app requires access to your call logs.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    console.log('Permission error:', error);
    return false;
  }
};

export const fetchCallLogs = async () => {
  try {
    const logs = await CallLogs.loadAll();
    console.log(JSON.stringify(logs));
    return logs;
  } catch (error) {
    console.log('Error fetching call logs:', error);
    return [];
  }
};
