// @flow
import api from '../../../api';
import { API_REQUEST } from '../../apiAction';

const SETTINGS_UPDATE: 'user/SETTINGS_UPDATE' = 'user/SETTINGS_UPDATE';
export const SETTINGS_UPDATE_SUCCESS: 'user/SETTINGS_UPDATE_SUCCESS' =
  'user/SETTINGS_UPDATE_SUCCESS';
const SETTINGS_UPDATE_FAILED: 'user/SETTINGS_UPDATE_FAILED' = 'user/SETTINGS_UPDATE_FAILED';

type UserSettingsT = {
  push_notification: ?boolean,
  show_siblings: ?boolean,
  show_location: ?boolean,
};

type UpdateError = {
  type: ?string,
  message: ?string,
};

type UpdateUserSettingsT = {|
  type: typeof SETTINGS_UPDATE,
|};

type UpdateUserSuccessT = {|
  type: typeof SETTINGS_UPDATE_SUCCESS,
|};

type UpdateUserFailedT = {|
  type: typeof SETTINGS_UPDATE_FAILED,
  error: ?{ response: { data: UpdateError } },
|};

type ActionType = UpdateUserSettingsT | UpdateUserSuccessT | UpdateUserFailedT;

export type UpdatingState = {
  error: ?UpdateError,
  updating: boolean,
};

export const initialUpdatingState = {
  error: null,
  updating: false,
};

export default function userUpdatingReducer(
  state: UpdatingState = initialUpdatingState,
  action: ActionType,
): UpdatingState {
  switch (action.type) {
    case SETTINGS_UPDATE:
      return {
        error: null,
        updating: true,
      };

    case SETTINGS_UPDATE_SUCCESS:
      return {
        error: null,
        updating: false,
      };

    case SETTINGS_UPDATE_FAILED: {
      const error =
        action.error && action.error.response && action.error.response.data
          ? { ...action.error.response.data }
          : { type: 'Update/Error', message: 'Update Error' };
      return {
        error,
        updating: false,
      };
    }

    default:
      return state;
  }
}

export function updateUserSettings(data: UserSettingsT) {
  return {
    type: API_REQUEST,
    types: [SETTINGS_UPDATE, SETTINGS_UPDATE_SUCCESS, SETTINGS_UPDATE_FAILED],
    call: () => api().user.updateSettings({ user: data }),
    data,
  };
}
