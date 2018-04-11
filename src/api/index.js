// @flow
import axios from 'axios';

import session from './modules/session';
import user from './modules/user';
import cryoCenters from './modules/cryoCenters';
import states from './modules/states';
import location from './modules/location';
import password from './modules/password';
import chats from './modules/chats';

export type ReqType = (config: Object) => Promise<*>;

class Client {
  token: ?string;
  req: ReqType;
  // modules
  session: *;
  user: *;
  cryoCenters: *;
  states: *;
  location: *;
  password: *;
  chats: *;

  constructor(baseURL: ?string) {
    const reqHeaderURL = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      baseURL: baseURL || '',
    };
    this.req = axios.create(reqHeaderURL);

    this.req.interceptors.request.use(config => {
      if (!this.token) {
        return config;
      }

      // eslint-disable-next-line no-param-reassign
      config.headers = Object.assign({}, config.headers, {
        'Access-Token': this.token,
      });
      return config;
    });

    this.session = session(this.req);
    this.user = user(this.req);
    this.cryoCenters = cryoCenters(this.req);
    this.states = states(this.req);
    this.location = location(this.req);
    this.password = password(this.req);
    this.chats = chats(this.req);
  }

  setToken(token: string): void {
    this.token = token;
  }
}

let instance;
export default function api(baseUrl: ?string) {
  if (!instance) {
    instance = new Client(baseUrl);
  }

  return instance;
}
