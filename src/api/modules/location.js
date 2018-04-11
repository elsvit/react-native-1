// @flow
import type { ReqType } from '../index';
import API from '../base/api';

// export type Location = {
//   location: {
//     latitude: string,
//     longitude: string,
//   },
// };

class LocationAPI extends API {
  update(data) {
    return this.r({
      method: 'PUT',
      url: '/locations',
      data,
    });
  }
}

export default function locationAPI(request: ReqType) {
  return new LocationAPI(request);
}
