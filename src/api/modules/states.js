// @flow
import type { ReqType } from '../index';
import API from '../base/api';

export type State = {
  id: number,
  name: string,
  cities: ?Array<*>,
};

class StatesAPI extends API {
  getStates() {
    return this.r({
      method: 'GET',
      url: '/states',
    });
  }

  getCities(stateId: string) {
    return this.r({
      method: 'GET',
      url: `/states/${stateId}`,
    });
  }
}

export default function(request: ReqType): StatesAPI {
  return new StatesAPI(request);
}
