// @flow

import { takeEvery, put, select } from 'redux-saga/effects';

import {
  APP_SET_USER_DATA,
  setPushToken,
  type UserSetDataAction,
} from '../ducks/application';
import { selectIsLoggedIn, selectPushToken } from '../selectors';
import PushNotificationsHandler from '../../services/PushNotifications';
import {
  RQDisablePushNotifications,
  RQEnablePushNotifications,
} from '../../utils/requestFactory';

/**
 * Register or unregister Push notifications service
 */
const registerOrUnregisterSaga = function* registerOrUnregisterSaga(
  action: UserSetDataAction
) {
  const isAuthenticated = yield select(selectIsLoggedIn);
  const storedPushToken = yield select(selectPushToken);
  if (isAuthenticated) {
    const { token } = yield PushNotificationsHandler.register();
    if (!storedPushToken) {
      yield put(setPushToken(token));
      RQEnablePushNotifications(token);
    }
  } else {
    RQDisablePushNotifications(storedPushToken);
  }
};

const pushNotifSaga = function* pushNotifSaga(): Generator<*, *, *> {
  yield takeEvery(APP_SET_USER_DATA, registerOrUnregisterSaga);
};

export default pushNotifSaga;
