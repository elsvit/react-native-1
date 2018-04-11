// @flow
import { combineReducers } from 'redux';

import data from './data';
import create from './create';
import load from './load';
import login from './login';
import location from './location';
import update from './update';
import logout from './logout';

export default combineReducers({
  data,
  create,
  load,
  login,
  location,
  update,
  logout,
});
