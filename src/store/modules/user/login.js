// @flow
import api from '../../../api';
import { API_REQUEST } from '../../apiAction';

const LOGIN_USER: 'user/LOGIN_USER' = 'user/LOGIN_USER';
export const LOGIN_USER_SUCCESS: 'user/LOGIN_USER_SUCCESS' = 'user/LOGIN_USER_SUCCESS';
const LOGIN_USER_FAILED: 'user/LOGIN_USER_FAILED' = 'user/LOGIN_USER_FAILED';

export type LoginError = {
  type: ?string,
  message: ?string,
};

type UserLoginDataT = {
  email: string,
  password: string,
};

type LoginUserT = {|
  type: typeof LOGIN_USER,
  data: UserLoginDataT,
|};

type LoginUserSuccessT = {|
  type: typeof LOGIN_USER_SUCCESS ,
|};

type LoginUserFailedT = {|
  type: typeof LOGIN_USER_FAILED,
  error: ?{ response: { data: LoginError } },
|};

type ActionType = LoginUserT | LoginUserSuccessT | LoginUserFailedT;

export type LoginState = {
  error: ?LoginError,
  loading: boolean,
};

export const initialLoginState = {
  error: null,
  loading: false,
};

export default function userLoginReducer(
  state: LoginState = initialLoginState,
  action: ActionType,
): LoginState {
  switch (action.type) {
    case LOGIN_USER:
      return {
        error: null,
        loading: true,
      };

    case LOGIN_USER_SUCCESS:
      return {
        error: null,
        loading: false,
      };

    case LOGIN_USER_FAILED: {
      const error =
        action.error && action.error.response && action.error.response.data
          ? { ...action.error.response.data }
          : { type: 'Login/Error', message: 'Login Error' };
      return {
        error,
        loading: false,
      };
    }

    default:
      return state;
  }
}

export function loginUser(data: UserLoginDataT) {
  return {
    type: API_REQUEST,
    types: [LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILED],
    call: () => api().session.create(data),
  };
}
