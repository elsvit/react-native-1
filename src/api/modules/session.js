// @flow
import CRUD from '../base/crud';

import type { ReqType } from '../index';

export type SessionType = {
  id: number,
  type: string,
  email: string,
  first_name: string,
  username: string,
  gender: string,
  city: string,
  state_id: number,
  donor_infos: Array<{ id: number, donor_id: string, cryo_center_id: number }>,
};

export default function sessionCrud(request: ReqType) {
  const crud: CRUD<SessionType> = new CRUD({
    url: '/sessions',
    request,
    id: 'session_id',
  });

  return crud;
}
