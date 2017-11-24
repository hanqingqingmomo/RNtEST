// @flow

import { combineReducers } from 'redux';

import { reducer as timeline } from './ducks/timelines';
import application from './ducks/application';
import entities from './ducks/entities';
import requests from './ducks/requests';
import user from './ducks/user';

// import './ducks/contentObject';

const reducers = {
  application,
  entities,
  requests,
  user,
  timeline,
};

export type Reducers = typeof reducers;

export default combineReducers(reducers);
