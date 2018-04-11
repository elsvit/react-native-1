// @flow
import { AsyncStorage } from 'react-native';

import { API_REQUEST } from '../../apiAction';
import { LOCATION_DURATION_ALL_TIME } from '../../../constants/data';
import api from '../../../api';

const UPDATE_LOCATION: 'user/UPDATE_LOCATION' = 'user/UPDATE_LOCATION';
export const UPDATE_LOCATION_SUCCESS: 'user/UPDATE_LOCATION_SUCCESS' =
  'user/UPDATE_LOCATION_SUCCESS';
const UPDATE_LOCATION_FAILED: 'user/UPDATE_LOCATION_FAILED' = 'user/UPDATE_LOCATION_FAILED';
export const SAVE_LOCATION_DURATION: 'user/SAVE_LOCATION_DURATION' = 'user/SAVE_LOCATION_DURATION';
export const SAVE_LOCATION_DURATION_SUCCESS: 'user/SAVE_LOCATION_DURATION_SUCCESS' =
  'user/SAVE_LOCATION_DURATION_SUCCESS';
export const SAVE_LOCATION_DURATION_FAILED: 'user/SAVE_LOCATION_DURATION_FAILED' =
  'user/SAVE_LOCATION_DURATION_FAILED';
export const GET_LOCATION_DURATION: 'user/GET_LOCATION_DURATION' = 'user/GET_LOCATION_DURATION';
export const GET_LOCATION_DURATION_SUCCESS: 'user/GET_LOCATION_DURATION_SUCCESS' =
  'user/GET_LOCATION_DURATION_SUCCESS';
export const GET_LOCATION_DURATION_FAILED: 'user/GET_LOCATION_DURATION_FAILED' =
  'user/GET_LOCATION_DURATION_FAILED';
export const CANCEL_WATCH_LOCATION: 'user/CANCEL_WATCH_LOCATION' = 'user/CANCEL_WATCH_LOCATION';

type LocationT = {
  longitude: ?number,
  latitude: ?number,
};

type UpdateUserLocationT = {
  type: typeof UPDATE_LOCATION,
};

type UpdateUserLocationSuccessT = {
  type: typeof UPDATE_LOCATION_SUCCESS,
  coords: ?LocationT,
};

type UpdateUserLocationFailedT = {
  type: typeof UPDATE_LOCATION_FAILED,
  error: ?string,
};

type SaveLocationDurationT = {
  type: typeof SAVE_LOCATION_DURATION,
  value: string,
};

type SaveLocationDurationSuccessT = {
  type: typeof SAVE_LOCATION_DURATION_SUCCESS,
};

type SaveLocationDurationFailedT = {
  type: typeof SAVE_LOCATION_DURATION_FAILED,
  error: ?string,
};

type GetLocationDurationT = {
  type: typeof GET_LOCATION_DURATION,
};

type GetLocationDurationSuccessT = {
  type: typeof GET_LOCATION_DURATION_SUCCESS,
  result: string,
};

type GetLocationDurationFailedT = {
  type: typeof GET_LOCATION_DURATION_FAILED,
  error: ?string,
};

type ActionType =
  | UpdateUserLocationT
  | UpdateUserLocationSuccessT
  | UpdateUserLocationFailedT
  | SaveLocationDurationT
  | SaveLocationDurationSuccessT
  | SaveLocationDurationFailedT
  | GetLocationDurationT
  | GetLocationDurationSuccessT
  | GetLocationDurationFailedT;

export type LocationState = {
  coords: ?LocationT,
  error: ?string,
  loading: boolean,
  duration: number,
  errorSaveDuration: *,
  loadingSaveDuration: boolean,
  errorGetDuration: *,
  loadingGetDuration: boolean,
};

export const initialLocationState = {
  coords: {
    latitude: null,
    longitude: null,
  },
  error: null,
  loading: false,
  duration: LOCATION_DURATION_ALL_TIME,
  errorSaveDuration: null,
  loadingSaveDuration: false,
  errorGetDuration: null,
  loadingGetDuration: false,
};

export default function userLocationReducer(
  state: LocationState = initialLocationState,
  action: ActionType,
): LocationState {
  switch (action.type) {
    case UPDATE_LOCATION:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case UPDATE_LOCATION_SUCCESS: {
      if (action.coords) {
        return {
          ...state,
          error: null,
          loading: false,
          coords: { ...action.coords },
        };
      }
      return state;
    }

    case UPDATE_LOCATION_FAILED: {
      const error = action.error ? action.error : 'Location Error';
      return {
        ...state,
        error,
        loading: false,
      };
    }

    case SAVE_LOCATION_DURATION:
      return {
        ...state,
        duration: +action.value,
        errorSaveDuration: null,
        loadingSaveDuration: true,
      };

    case SAVE_LOCATION_DURATION_SUCCESS: {
      return {
        ...state,
        errorGetDuration: null,
        loadingGetDuration: false,
      };
    }

    case SAVE_LOCATION_DURATION_FAILED: {
      const errorSaveDuration = action.error ? action.error : 'Location Error';
      return {
        ...state,
        errorSaveDuration,
        loadingSaveDuration: false,
      };
    }

    case GET_LOCATION_DURATION:
      return {
        ...state,
        errorGetDuration: null,
        loadingGetDuration: true,
      };

    case GET_LOCATION_DURATION_SUCCESS: {
      const duration = action.result ? +action.result : LOCATION_DURATION_ALL_TIME;
      return {
        ...state,
        duration,
        errorGetDuration: null,
        loadingGetDuration: false,
      };
    }

    case GET_LOCATION_DURATION_FAILED: {
      const errorGetDuration = action.error ? action.error : 'Location Error';
      return {
        ...state,
        duration: LOCATION_DURATION_ALL_TIME,
        errorGetDuration,
        loadingGetDuration: false,
      };
    }

    case 'LOCATION_CHANGE': {
      return state;
    }

    default:
      return state;
  }
}

export function updateLocation(coords: LocationT) {
  return {
    type: API_REQUEST,
    types: [UPDATE_LOCATION, UPDATE_LOCATION_SUCCESS, UPDATE_LOCATION_FAILED],
    call: () =>
      api().location.update({
        location: { latitude: `${coords.latitude}`, longitude: `${coords.longitude}` },
      }),
    coords,
  };
}

export function saveLocationDuration(field: string, value: string) {
  return {
    type: API_REQUEST,
    types: [SAVE_LOCATION_DURATION, SAVE_LOCATION_DURATION_SUCCESS, SAVE_LOCATION_DURATION_FAILED],
    call: () => AsyncStorage.setItem(field, `${value}`),
    value,
  };
}

export function getLocationDuration(field: string) {
  return {
    type: API_REQUEST,
    types: [GET_LOCATION_DURATION, GET_LOCATION_DURATION_SUCCESS, GET_LOCATION_DURATION_FAILED],
    call: () => AsyncStorage.getItem(field),
  };
}

export function cancelWatchLocation() {
  return {
    type: CANCEL_WATCH_LOCATION,
  };
}
