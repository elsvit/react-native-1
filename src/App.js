// @flow
import React from 'react';
import { Provider } from 'react-redux';

import configureApi from './api';
import config from './constants/config';
import store from './store/index';
import Navigator from './Router';
import setupI18n from './i18n';

setupI18n();

configureApi(`${config.baseURL}${config.apiPath}`);

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
