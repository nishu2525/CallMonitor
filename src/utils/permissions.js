import { PermissionsAndroid, Platform, Alert } from 'react-native';

/**
 * Request all required Android permissions at runtime.
 */
export async function requestAndroidPermissions() {
  if (Platform.OS !== 'android') return; // No need to request on iOS

  try {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,
    ];

    const results = await PermissionsAndroid.requestMultiple(permissions);

    const allGranted = Object.values(results).every(
      (result) => result === PermissionsAndroid.RESULTS.GRANTED
    );

    if (allGranted) {
      console.log('✅ All permissions granted.');
    } else {
      console.warn('⚠️ Some permissions denied:', results);
      Alert.alert(
        'Permissions Required',
        'Please enable required permissions in app settings for full functionality.'
      );
    }
  } catch (error) {
    console.error('❌ Permission error:', error);
  }
}
