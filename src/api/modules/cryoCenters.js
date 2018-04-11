// @flow
import type { ReqType } from '../index';
import API from '../base/api';

export type CryoCenterT = {
  id: number,
  name: string,
  state_id: number,
  city: string,
  street: string,
};

class CryoCentersAPI extends API {
  getCryoCenters() {
    return this.r({
      method: 'GET',
      url: '/cryo_centers',
    });
  }
}

export default function(request: ReqType): CryoCentersAPI {
  return new CryoCentersAPI(request);
}
