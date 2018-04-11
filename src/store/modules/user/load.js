// @flow
import api from '../../../api';
import { API_REQUEST } from '../../apiAction';

const LOAD_USER: 'user/LOAD_USER' = 'user/LOAD_USER';
export const LOAD_USER_SUCCESS: 'user/LOAD_USER_SUCCESS' = 'user/LOAD_USER_SUCCESS';
const LOAD_USER_FAILED: 'user/LOAD_USER_FAILED' = 'user/LOAD_USER_FAILED';

type LoadError = {
  type: ?string,
  message: ?string,
};

type LoadUserT = {|
  type: typeof LOAD_USER,
|};

type LoadUserSuccessT = {|
  type: typeof LOAD_USER_SUCCESS,
|};

type LoadUserFailedT = {|
  type: typeof LOAD_USER_FAILED,
  error: ?{ response: { data: LoadError } },
|};

type ActionType = LoadUserT | LoadUserSuccessT | LoadUserFailedT;

export type LoadingState = {
  error: ?LoadError,
  loading: boolean,
};

export const initialLoadingState = {
  error: null,
  loading: false,
};

export default function userLoadingReducer(
  state: LoadingState = initialLoadingState,
  action: ActionType,
): LoadingState {
  switch (action.type) {
    case LOAD_USER:
      return {
        error: null,
        loading: true,
      };

    case LOAD_USER_SUCCESS:
      return {
        error: null,
        loading: false,
      };

    case LOAD_USER_FAILED: {
      const error =
        action.error && action.error.response && action.error.response.data
          ? { ...action.error.response.data }
          : { type: 'Load/Error', message: 'Load Error' };
      return {
        error,
        loading: false,
      };
    }

    default:
      return state;
  }
}

export function loadUser() {
  return {
    type: API_REQUEST,
    types: [LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAILED],
    call: () => api().session.get(),
  };
}
