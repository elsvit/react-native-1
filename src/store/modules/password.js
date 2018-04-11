// @flow
import get from 'lodash/get';

import api from '../../api/index';
import { API_REQUEST } from '../apiAction';

import type { ApiRequest } from '../apiAction';

const FORGOT_PASSWORD_SEND_EMAIL: 'user/FORGOT_PASSWORD_SEND_EMAIL' =
  'user/FORGOT_PASSWORD_SEND_EMAIL';
export const FORGOT_PASSWORD_SEND_EMAIL_SUCCESS: 'user/FORGOT_PASSWORD_SEND_EMAIL_SUCCESS' =
  'user/FORGOT_PASSWORD_SEND_EMAIL_SUCCESS';
const FORGOT_PASSWORD_SEND_EMAIL_FAILED: 'user/FORGOT_PASSWORD_SEND_EMAIL_FAILED' =
  'user/FORGOT_PASSWORD_SEND_EMAIL_FAILED';
const FORGOT_PASSWORD_SEND_CODE: 'user/FORGOT_PASSWORD_SEND_CODE' =
  'user/FORGOT_PASSWORD_SEND_CODE';
export const FORGOT_PASSWORD_SEND_CODE_SUCCESS: 'user/FORGOT_PASSWORD_SEND_CODE_SUCCESS' =
  'user/FORGOT_PASSWORD_SEND_CODE_SUCCESS';
const FORGOT_PASSWORD_SEND_CODE_FAILED: 'user/FORGOT_PASSWORD_SEND_CODE_FAILED' =
  'user/FORGOT_PASSWORD_SEND_CODE_FAILED';
const SEND_NEW_PASSWORD: 'user/SEND_NEW_PASSWORD' = 'user/SEND_NEW_PASSWORD';
export const SEND_NEW_PASSWORD_SUCCESS: 'user/SEND_NEW_PASSWORD_SUCCESS' =
  'user/SEND_NEW_PASSWORD_SUCCESS';
const SEND_NEW_PASSWORD_FAILED: 'user/SEND_NEW_PASSWORD_FAILED' = 'user/SEND_NEW_PASSWORD_FAILED';
const CHANGE_PASSWORD: 'user/CHANGE_PASSWORD' = 'user/CHANGE_PASSWORD';
export const CHANGE_PASSWORD_SUCCESS: 'user/CHANGE_PASSWORD_SUCCESS' =
  'user/CHANGE_PASSWORD_SUCCESS';
const CHANGE_PASSWORD_FAILED: 'user/CHANGE_PASSWORD_FAILED' = 'user/CHANGE_PASSWORD_FAILED';

type NewPasswordT = {
  password: string,
  password_confirmation: string,
};

type ChangePasswordT = {
  old_password: string,
  new_password: string,
  new_password_confirmation: string,
};

type SendForgotPasswordEmailActionT = {|
  type: typeof FORGOT_PASSWORD_SEND_EMAIL,
|};

type SendForgotPasswordEmailSuccessActionT = {
  type: typeof FORGOT_PASSWORD_SEND_EMAIL_SUCCESS,
  result: {
    token: string,
  },
};

type SendForgotPasswordEmailFailedActionT = {|
  type: typeof FORGOT_PASSWORD_SEND_EMAIL_FAILED,
  error: {
    response: {
      data: {
        message: string,
      },
    },
  },
|};

type SendForgotPasswordCodeActionT = {|
  type: typeof FORGOT_PASSWORD_SEND_CODE,
|};

type SendForgotPasswordCodeSuccessActionT = {
  type: typeof FORGOT_PASSWORD_SEND_CODE_SUCCESS,
  result: {
    token: string,
  },
};

type SendForgotPasswordCodeFailedActionT = {|
  type: typeof FORGOT_PASSWORD_SEND_CODE_FAILED,
  error: {
    response: {
      data: {
        message: string,
      },
    },
  },
|};

type SendNewPasswordActionT = {|
  type: typeof SEND_NEW_PASSWORD,
|};

type SendNewPasswordSuccessActionT = {
  type: typeof SEND_NEW_PASSWORD_SUCCESS,
};

type SendNewPasswordFailedActionT = {|
  type: typeof SEND_NEW_PASSWORD_FAILED,
  error: {
    response: {
      data: {
        message: string,
      },
    },
  },
|};

type SendChangePasswordActionT = {|
  type: typeof CHANGE_PASSWORD,
|};

type SendChangePasswordSuccessActionT = {
  type: typeof CHANGE_PASSWORD_SUCCESS,
};

type SendChangePasswordFailedActionT = {|
  type: typeof CHANGE_PASSWORD_FAILED,
  error: {
    response: {
      data: {
        message: string,
      },
    },
  },
|};

type ForgotPasswordActionsT =
  | SendForgotPasswordEmailActionT
  | SendForgotPasswordEmailSuccessActionT
  | SendForgotPasswordEmailFailedActionT
  | SendForgotPasswordCodeActionT
  | SendForgotPasswordCodeSuccessActionT
  | SendForgotPasswordCodeFailedActionT
  | SendNewPasswordActionT
  | SendNewPasswordSuccessActionT
  | SendNewPasswordFailedActionT
  | SendChangePasswordActionT
  | SendChangePasswordSuccessActionT
  | SendChangePasswordFailedActionT;

type PasswordStateT = {
  token: ?string,
  sendingEmail: boolean,
  errorSendEmail: ?string,
  sendingCode: boolean,
  errorSendCode: ?string,
  savingNewPassword: boolean,
  errorSaveNewPassword: ?string,
  savingChangePassword: boolean,
  errorChangePassword: ?string,
};

type InitialStateT = PasswordStateT;

const initialState: InitialStateT = {
  token: null,
  sendingEmail: false,
  errorSendEmail: null,
  sendingCode: false,
  errorSendCode: null,
  savingNewPassword: false,
  errorSaveNewPassword: null,
};

export default function forgotPasswordReducer(
  state: InitialStateT = initialState,
  action: ForgotPasswordActionsT,
): InitialStateT {
  switch (action.type) {
    case FORGOT_PASSWORD_SEND_EMAIL:
      return {
        ...state,
        sendingEmail: true,
        errorSendEmail: null,
      };

    case FORGOT_PASSWORD_SEND_EMAIL_SUCCESS: {
      if (action.result.headers['password-reset-token']) {
        return {
          ...state,
          token: action.result.headers['password-reset-token'],
          sendingEmail: null,
          errorSendEmail: false,
        };
      }
      return state;
    }

    case FORGOT_PASSWORD_SEND_EMAIL_FAILED:
      return {
        ...state,
        sendingEmail: false,
        errorSendEmail: get(action.error, 'response.data.message', String(action.error)),
      };

    case FORGOT_PASSWORD_SEND_CODE:
      return {
        ...state,
        sendingCode: true,
        errorSendCode: null,
      };

    case FORGOT_PASSWORD_SEND_CODE_SUCCESS: {
      if (action.result.headers['password-reset-token']) {
        return {
          ...state,
          token: action.result.headers['password-reset-token'],
          sendingCode: null,
          errorSendCode: false,
        };
      }
      return state;
    }

    case FORGOT_PASSWORD_SEND_CODE_FAILED:
      return {
        ...state,
        sendingCode: false,
        errorSendCode: get(action.error, 'response.data.message', String(action.error)),
      };

    case SEND_NEW_PASSWORD:
      return {
        ...state,
        savingNewPassword: true,
        errorSaveNewPassword: null,
      };

    case SEND_NEW_PASSWORD_SUCCESS: {
      return {
        ...state,
        savingNewPassword: null,
        errorSaveNewPassword: false,
      };
    }

    case SEND_NEW_PASSWORD_FAILED:
      return {
        ...state,
        savingNewPassword: false,
        errorSaveNewPassword: get(action.error, 'response.data.message', String(action.error)),
      };

    case CHANGE_PASSWORD:
      return {
        ...state,
        changePassword: true,
        errorChangePassword: null,
      };

    case CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        changePassword: null,
        errorChangePassword: false,
      };
    }

    case CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        changePassword: false,
        errorChangePassword: get(action.error, 'response.data.message', String(action.error)),
      };

    default:
      return state;
  }
}

export function sendForgotPasswordEmail(email: string): ApiRequest<*> {
  return {
    type: API_REQUEST,
    types: [
      FORGOT_PASSWORD_SEND_EMAIL,
      FORGOT_PASSWORD_SEND_EMAIL_SUCCESS,
      FORGOT_PASSWORD_SEND_EMAIL_FAILED,
    ],
    call: () => api().password.sendForgotPasswordEmail({ email }),
  };
}

export function sendForgotPasswordCode(token: string, code: string): ApiRequest<*> {
  return {
    type: API_REQUEST,
    types: [
      FORGOT_PASSWORD_SEND_CODE,
      FORGOT_PASSWORD_SEND_CODE_SUCCESS,
      FORGOT_PASSWORD_SEND_CODE_FAILED,
    ],
    call: () => api().password.sendForgotPasswordCode(token, code),
  };
}

export function saveNewPassword(token: string, data: NewPasswordT): ApiRequest<*> {
  return {
    type: API_REQUEST,
    types: [
      SEND_NEW_PASSWORD,
      SEND_NEW_PASSWORD_SUCCESS,
      SEND_NEW_PASSWORD_FAILED,
    ],
    call: () => api().password.saveNewPassword(token, { user: data }),
  };
}

export function changePassword(data: ChangePasswordT): ApiRequest<*> {
  return {
    type: API_REQUEST,
    types: [
      CHANGE_PASSWORD,
      CHANGE_PASSWORD_SUCCESS,
      CHANGE_PASSWORD_FAILED,
    ],
    call: () => api().password.changePassword({ user: data }),
  };
}
