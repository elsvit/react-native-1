// @flow
import type { ReqType } from '../index';
import API from '../base/api';
import { convertModelToFormData } from '../../helpers/convert';

class UserAPI extends API {
  create(data) {
    return this.r({
      method: 'POST',
      url: '/registrations',
      data,
    });
  }

  update(user) {
    const data = convertModelToFormData(user, null, 'user');
    return this.r({
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'PUT',
      url: '/accounts',
      data,
    });
  }

  updateSettings(data) {
    return this.r({
      method: 'PUT',
      url: '/settings',
      data,
    });
  }
}

export default function userApi(request: ReqType) {
  return new UserAPI(request);
}
