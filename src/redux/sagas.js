// @flow

import { all, fork } from 'redux-saga/effects';

import contentObjectSaga from './sagas/contentObjectSaga';
import pushNotificationSaga from './sagas/pushNotificationSaga';
import timelineSaga from './sagas/timelineSaga';

const rootSaga = function*(): Generator<*, *, *> {
  yield all([
    fork(contentObjectSaga),
    fork(pushNotificationSaga),
    fork(timelineSaga),
  ]);
};

export default rootSaga;
