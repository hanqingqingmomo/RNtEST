// @flow

import PN from 'react-native-push-notification';
import Config from 'react-native-config';

import type { NotificationAndroid, NotificationIOS } from '../Types';

type RegistrationResponse = {
  token: string,
  os: 'ios' | 'android',
};

export default class PushNotificationsHandler {
  static register(): Promise<{ token: string }> {
    return new Promise((resolve, reject) => {
      const rejectTimeout = setTimeout(resolve, 20000, { token: '' });

      PN.configure({
        onRegister(response: RegistrationResponse) {
          clearTimeout(rejectTimeout);
          resolve(response);
        },

        onNotification(
          pushNotification: NotificationAndroid | NotificationIOS
        ) {
          let message = '';
          let title = '';

          switch (typeof pushNotification['notification']) {
            case 'undefined':
              message = pushNotification.message;
              break;

            case 'object':
              message = pushNotification.notification.body;
              title = pushNotification.notification.title;
              break;

            default:
              break;
          }

          if (pushNotification.foreground) {
            global.alertWithType(
              'custom',
              title || Config.BUNDLE_DISPLAY_NAME,
              message
            );
          }
        },

        senderID: Config.FCM_SENDER_ID,

        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },

        popInitialNotification: true,

        requestPermissions: true,
      });
    });
  }
}
