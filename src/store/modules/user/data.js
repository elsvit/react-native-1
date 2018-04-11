// @flow
import { SETTINGS_UPDATE_SUCCESS } from './settings';

export const CREATE_USER_SUCCESS: 'user/CREATE_USER_SUCCESS' = 'user/CREATE_USER_SUCCESS';
export const UPDATE_USER_SUCCESS: 'user/UPDATE_USER_SUCCESS' = 'user/UPDATE_USER_SUCCESS';
export const LOAD_USER_SUCCESS: 'user/LOAD_USER_SUCCESS' = 'user/LOAD_USER_SUCCESS';
export const LOGIN_USER_SUCCESS: 'user/LOGIN_USER_SUCCESS' = 'user/LOGIN_USER_SUCCESS';

export type User = ?{
  id: number,
  type: string,
  email: string,
  username: string,
  first_name: string,
  gender: string,
  state_id: number,
  city: string,
  last_name: ?string,
  address: ?string,
  contact_info: ?string,
  age: ?number,
  avatar: ?{
    url: ?string,
    thumb: {
      url: ?string,
    },
  },
  donor_infos: Array<{
    id: ?number,
    donor_id: string,
    cryo_center_id: number,
  }>,
  push_notification: boolean,
  show_siblings: boolean,
  show_location: boolean,
};

type CreateUserSuccessT = {|
  type: typeof CREATE_USER_SUCCESS,
  result: {
    data: User,
  },
|};

type UpdateUserSuccessT = {|
  type: typeof UPDATE_USER_SUCCESS,
  result: {
    data: User,
  },
|};

type LoadUserSuccessT = {|
  type: typeof LOAD_USER_SUCCESS,
  result: {
    data: User,
  },
|};

type LoginUserSuccessT = {|
  type: typeof LOGIN_USER_SUCCESS,
  result: {
    data: User,
  },
|};

type ActionType = CreateUserSuccessT | UpdateUserSuccessT | LoadUserSuccessT | LoginUserSuccessT;

export const initialState: ?User = null;

export default function userDataReducer(state: User = initialState, action: ActionType): User {
  switch (action.type) {
    case CREATE_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...action.result.data,
      };
    case SETTINGS_UPDATE_SUCCESS:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}
