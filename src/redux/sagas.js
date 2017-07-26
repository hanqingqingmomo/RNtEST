// @flow

import { all, fork } from 'redux-saga/effects';

import { saga as userSaga } from './ducks/user';

const rootSaga = function*(): Generator<*, *, *> {
  yield all([fork(userSaga)]);
};

export default rootSaga;
