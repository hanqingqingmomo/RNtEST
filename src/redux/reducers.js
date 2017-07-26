// @flow

import { combineReducers } from 'redux';

import application from './ducks/application';
import user from './ducks/user';

const reducers = { application, user };

export type Reducers = typeof reducers;

export default combineReducers(reducers);
