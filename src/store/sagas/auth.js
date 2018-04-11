// @flow
import { AsyncStorage } from 'react-native';
import { put } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';

import { AUTH_TOKEN_KEY, GUIDE_SHOWED, LOCATION_DURATION_FIELD } from '../../constants/data';
import { loadUser } from '../modules/user/load';
import api from '../../api';
import notify from '../../helpers/notify';

export default function*(): Generator<*, *, *> {
  let guideShowed = null;
  try {
    guideShowed = yield AsyncStorage.getItem(GUIDE_SHOWED);
  } catch (err) {
    notify(`AsyncStorage.getItem(GUIDE_SHOWED) ERROR, ${err.messag}`);
  }
  if (guideShowed === 'showed') {
    let authToken = null;
    try {
      authToken = yield AsyncStorage.getItem(AUTH_TOKEN_KEY);
    } catch (err) {
      notify(`AsyncStorage.getItem(AUTH_TOKEN_KEY) ERROR, ${err.message}`);
    }
    if (authToken) {
      api().setToken(authToken);
      yield put(loadUser());
    }
  } else {
    yield AsyncStorage.setItem(GUIDE_SHOWED, 'showed');
    yield AsyncStorage.setItem(LOCATION_DURATION_FIELD, '1000');
    yield put(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'AppTour' })],
      }),
    );
  }
}
