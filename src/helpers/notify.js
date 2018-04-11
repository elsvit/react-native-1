// @flow
import { ToastAndroid, Alert, Platform } from 'react-native';

export default function notify(text: string = ''): void {
  if (Platform.OS === 'android') {
    ToastAndroid.show(text, ToastAndroid.LONG);
    return;
  }

  Alert.alert('', text);
}
