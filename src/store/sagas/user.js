// @flow
import { AsyncStorage } from 'react-native';
import { put, takeEvery } from 'redux-saga/effects';
import get from 'lodash/get';
import { NavigationActions } from 'react-navigation';

import { CREATE_USER_SUCCESS, LOGIN_USER_SUCCESS, LOAD_USER_SUCCESS } from '../modules/user/data';
import { AUTH_TOKEN_KEY, LOCATION_DURATION_FIELD } from '../../constants/data';
import api from '../../api';
import notify from '../../helpers/notify';
import { LOGOUT_USER_SUCCESS } from '../modules/user/logout';
import { getChats } from '../modules/chats';
import { getLocationDuration } from '../modules/user/location';

function* sagaLoadUserSuccess() {
  yield put(
    NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Drawers' })],
    }),
  );
  yield put(getChats());
  yield put(getLocationDuration(LOCATION_DURATION_FIELD));
}

function* sagaLoginUserSuccess(data) {
  const accessToken = get(data, 'result.headers.access-token', undefined);
  if (accessToken) {
    api().setToken(accessToken);
    try {
      AsyncStorage.setItem(AUTH_TOKEN_KEY, accessToken);
    } catch (error) {
      notify('AsyncStorage save error');
    }
    yield put(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Drawers' })],
      }),
    );
    yield put(getChats());
    yield put(getLocationDuration('locationDuration'));
  }
}

function* sagaLogoutUser() {
  api().setToken('');
  try {
    AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (error) {
    notify('AsyncStorage save error');
  }
  yield put(
    NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'LogIn' })],
    }),
  );
}

export default function*(): Generator<*, *, *> {
  yield takeEvery([LOGIN_USER_SUCCESS, CREATE_USER_SUCCESS], sagaLoginUserSuccess);
  yield takeEvery(LOAD_USER_SUCCESS, sagaLoadUserSuccess);
  yield takeEvery(LOGOUT_USER_SUCCESS, sagaLogoutUser);
}
