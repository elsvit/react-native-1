// @flow
import type { ReqType } from '../index';

class API {
  r: ReqType;

  constructor(request: ReqType) {
    this.r = request;
  }
}

export default API;
