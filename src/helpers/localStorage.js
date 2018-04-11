// @flow
import { AsyncStorage } from 'react-native';

export const saveToLocalStorage = (field: string, value: string) =>
  AsyncStorage.setItem(field, value);

export const getLocalStorage = (field: string) => AsyncStorage.getItem(field);
