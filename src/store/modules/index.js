// @flow
import { combineReducers } from 'redux';
// import { locationReducer as location } from 'redux-saga-location';

import navigation from './navigation';
import user from './user';
import cryoCenters from './cryoCenters';
import states from './states';
import siblings from './siblings';
import password from './password';
import chats from './chats';

export default combineReducers({
  navigation,
  user,
  cryoCenters,
  states,
  siblings,
  password,
  chats,
  // location,
});
