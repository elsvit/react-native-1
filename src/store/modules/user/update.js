// @flow
import api from '../../../api';
import { API_REQUEST } from '../../apiAction';

const UPDATE_USER: 'user/UPDATE_USER' = 'user/UPDATE_USER';
export const UPDATE_USER_SUCCESS: 'user/UPDATE_USER_SUCCESS' = 'user/UPDATE_USER_SUCCESS';
const UPDATE_USER_FAILED: 'user/UPDATE_USER_FAILED' = 'user/UPDATE_USER_FAILED';

export type UpdateDataT = {
  email: string,
  first_name: string,
  last_name: string,
  username: string,
  donor_infos_attributes: Array<{
    donor_id: string,
    cryo_center_id: number,
  }>,
  age: ?number,
  contact_info: ?string,
  address: ?string,
  avatar: ?*,
};

export type UpdateErrorT = {
  type: ?string,
  message: string,
};

type UpdateUserT = {|
  type: typeof UPDATE_USER,
  data: $Shape<UpdateDataT>,
|};

type UpdateUserSuccessT = {|
  type: typeof UPDATE_USER_SUCCESS,
|};

type UpdateUserFailedT = {|
  type: typeof UPDATE_USER_FAILED,
  error: ?{ response: { data: UpdateErrorT } },
|};

type ActionType = UpdateUserT | UpdateUserSuccessT | UpdateUserFailedT;

export type UpdateState = {
  error: ?UpdateErrorT,
  loading: boolean,
};

export const initialUpdateState = {
  error: null,
  loading: false,
};

export default function userUpdateReducer(
  state: UpdateState = initialUpdateState,
  action: ActionType,
): UpdateState {
  switch (action.type) {
    case UPDATE_USER:
      return {
        error: null,
        loading: true,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
      };

    case UPDATE_USER_FAILED: {
      const error =
        action.error && action.error.response && action.error.response.data
          ? { ...action.error.response.data }
          : { type: 'Update/Error', message: 'Update Error' };
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

export function updateUser(user: *) {
  return {
    type: API_REQUEST,
    types: [UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED],
    call: () => api().user.update(user),
  };
}
