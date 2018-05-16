// @flow

import { takeEvery, select } from 'redux-saga/effects';
import { APP_START_SESSION, APP_END_SESSION } from '../ducks/application';
import { selectIsAuthenticated } from '../selectors';
import '../../services/PushNotifications';
import {
  RQDisablePushNotifications,
  RQEnablePushNotifications,
} from '../../utils/requestFactory';

/**
 * Register or unregister Push notifications service
 */
const doRegisterOrUnregisterSaga = function* doRegisterOrUnregisterSaga() {
  const isAuthenticated = yield select(selectIsAuthenticated);
  if (isAuthenticated) {
    RQEnablePushNotifications();
  } else {
    RQDisablePushNotifications();
  }
};

const pushNotifSaga = function* pushNotifSaga(): Generator<*, *, *> {
  yield takeEvery(APP_START_SESSION, doRegisterOrUnregisterSaga);
  yield takeEvery(APP_END_SESSION, doRegisterOrUnregisterSaga);
};

export default pushNotifSaga;
