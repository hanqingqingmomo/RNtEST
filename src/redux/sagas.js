// @flow

import { all, fork } from 'redux-saga/effects';

import contentObjectSaga from './sagas/contentObjectSaga';
import timelineSaga from './sagas/timelineSaga';

const rootSaga = function*(): Generator<*, *, *> {
  yield all([fork(contentObjectSaga), fork(timelineSaga)]);
};

export default rootSaga;
