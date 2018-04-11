// @flow
import api from '../../../api';
import { API_REQUEST } from '../../apiAction';

const CREATE_USER: 'user/CREATE_USER' = 'user/CREATE_USER';
export const CREATE_USER_SUCCESS: 'user/CREATE_USER_SUCCESS' = 'user/CREATE_USER_SUCCESS';
const CREATE_USER_FAILED: 'user/CREATE_USER_FAILED' = 'user/CREATE_USER_FAILED';

export type CreateDataT = {
  type: string,
  email: string,
  username: string,
  first_name: string,
  gender: string,
  state_id: number,
  city: string,
  donor_infos_attributes: Array<{
    donor_id: string,
    cryo_center_id: number,
  }>,
  password: string,
  password_confirmation: string,
};

export type CreateErrorT = {
  type: ?string,
  message: string,
};

type CreateUserT = {|
  type: typeof CREATE_USER,
  data: $Shape<CreateDataT>,
|};

type CreateUserSuccessT = {|
  type: typeof CREATE_USER_SUCCESS,
|};

type CreateUserFailedT = {|
  type: typeof CREATE_USER_FAILED,
  error: ?{ response: { data: CreateErrorT } },
|};

type ActionType = CreateUserT | CreateUserSuccessT | CreateUserFailedT;

export type CreateState = {
  error: ?CreateErrorT,
  loading: boolean,
  data: ?CreateDataT,
};

export const initialCreateState = {
  error: null,
  loading: false,
  data: null,
};

export default function userCreateReducer(
  state: CreateState = initialCreateState,
  action: ActionType,
): CreateState {
  switch (action.type) {
    case CREATE_USER:
      return {
        error: null,
        loading: true,
        data: action.data,
      };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
      };

    case CREATE_USER_FAILED: {
      const error =
        action.error && action.error.response && action.error.response.data
          ? { ...action.error.response.data }
          : { type: 'Create/Error', message: 'Create Error' };
      return {
        ...state,
        error,
        loading: false,
      };
    }

    default:
      return state;
  }
}

export function createUser(data: CreateDataT) {
  return {
    type: API_REQUEST,
    types: [CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAILED],
    call: () => api().user.create(data),
    data,
  };
}
