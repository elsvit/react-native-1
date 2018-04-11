// @flow
import { takeEvery, put } from 'redux-saga/effects';
import get from 'lodash/get';
import { NavigationActions } from 'react-navigation';

import {
  FORGOT_PASSWORD_SEND_EMAIL_SUCCESS,
  FORGOT_PASSWORD_SEND_CODE_SUCCESS,
  SEND_NEW_PASSWORD_SUCCESS,
} from '../modules/password';

function* sagaForgotPasswordSendEmail(data) {
  const accessToken = get(data, 'result.headers.password-reset-token', undefined);
  if (accessToken) {
    yield put(NavigationActions.navigate({ routeName: 'ConfirmationCode' }));
  }
}

function* sagaForgotPasswordSendCode(data) {
  const accessToken = get(data, 'result.headers.password-reset-token', undefined);
  if (accessToken) {
    yield put(NavigationActions.navigate({ routeName: 'NewPassword' }));
  }
}

function* sagaSendNewPassword(data) {
  yield put(NavigationActions.navigate({ routeName: 'LogIn' }));
}

export default function*(): Generator<*, *, *> {
  yield takeEvery(FORGOT_PASSWORD_SEND_EMAIL_SUCCESS, sagaForgotPasswordSendEmail);
  yield takeEvery(FORGOT_PASSWORD_SEND_CODE_SUCCESS, sagaForgotPasswordSendCode);
  yield takeEvery(SEND_NEW_PASSWORD_SUCCESS, sagaSendNewPassword);
}
