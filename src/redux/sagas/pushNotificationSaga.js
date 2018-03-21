// @flow

import { takeEvery, put, select } from 'redux-saga/effects';

import {
  APP_START_SESSION,
  APP_END_SESSION,
  setPushToken,
} from '../ducks/application';
import { selectIsAuthenticated } from '../selectors';
import PushNotificationsHandler from '../../services/PushNotifications';
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
    const { token } = yield PushNotificationsHandler.register();
    yield put(setPushToken(token));
    RQEnablePushNotifications(token);
  } else {
    RQDisablePushNotifications();
  }
};

const pushNotifSaga = function* pushNotifSaga(): Generator<*, *, *> {
  yield takeEvery(APP_START_SESSION, doRegisterOrUnregisterSaga);
  yield takeEvery(APP_END_SESSION, doRegisterOrUnregisterSaga);
};

export default pushNotifSaga;
