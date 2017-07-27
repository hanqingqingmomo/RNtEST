// @flow

import { combineReducers } from 'redux';

import application from './ducks/application';
import requests from './ducks/requests';
import user from './ducks/user';

const reducers = { application, requests, user };

export type Reducers = typeof reducers;

export default combineReducers(reducers);
