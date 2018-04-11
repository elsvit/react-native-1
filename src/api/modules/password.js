// @flow
import type { ReqType } from '../index';
import API from '../base/api';

export type CryoCenter = {
  id: number,
  name: string,
  state_id: number,
  city: string,
  street: string,
};

class CryoCentersAPI extends API {
  sendForgotPasswordEmail(data) {
    return this.r({
      method: 'POST',
      url: '/password_resets',
      data,
    });
  }

  sendForgotPasswordCode(token, code) {
    return this.r({
      method: 'GET',
      url: `/password_resets/${token}?password_code=${code}`,
    });
  }

  saveNewPassword(token, data) {
    return this.r({
      method: 'PUT',
      url: `/password_resets/${token}`,
      data,
    });
  }

  changePassword(data) {
    return this.r({
      method: 'PUT',
      url: '/passwords',
      data,
    });
  }
}

export default function(request: ReqType): CryoCentersAPI {
  return new CryoCentersAPI(request);
}
