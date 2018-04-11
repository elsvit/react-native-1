// @flow
import api from '../../../api';
import { API_REQUEST } from '../../apiAction';

export const LOGOUT_USER: 'user/LOGOUT_USER' = 'user/LOGOUT_USER';
export const LOGOUT_USER_SUCCESS: 'user/LOGOUT_USER_SUCCESS' = 'user/LOGOUT_USER_SUCCESS';
const LOGOUT_USER_FAILED: 'user/LOGOUT_USER_FAILED' = 'user/LOGOUT_USER_FAILED';

export type LogoutError = {
  type: ?string,
  message: ?string,
};

type LogoutUserT = {|
  type: typeof LOGOUT_USER,
|};

type LogoutUserSuccessT = {|
  type: typeof LOGOUT_USER_SUCCESS,
|};

type LogoutUserFailedT = {|
  type: typeof LOGOUT_USER_FAILED,
  error: ?{ response: { data: LogoutError } },
|};

type ActionType = LogoutUserT | LogoutUserSuccessT | LogoutUserFailedT;

export type LogoutState = {
  error: ?LogoutError,
  loading: boolean,
};

export const initialLogoutState = {
  error: null,
  loading: false,
};

export default function userLogoutReducer(
  state: LogoutState = initialLogoutState,
  action: ActionType,
): LogoutState {
  switch (action.type) {
    case LOGOUT_USER:
      return {
        error: null,
        loading: true,
      };

    case LOGOUT_USER_SUCCESS:
      return {
        error: null,
        loading: false,
      };

    case LOGOUT_USER_FAILED: {
      const error =
        action.error && action.error.response && action.error.response.data
          ? { ...action.error.response.data }
          : { type: 'Logout/Error', message: 'Logout Error' };
      return {
        error,
        loading: false,
      };
    }

    default:
      return state;
  }
}

export function logoutUser() {
  return {
    type: API_REQUEST,
    types: [LOGOUT_USER, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILED],
    call: () => api().session.deleteByToken(),
  };
}
