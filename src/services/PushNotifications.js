// @flow

import PN from 'react-native-push-notification';

type RegistrationResponse = {
  token: string,
  os: 'ios' | 'android',
};

// { token: '09c71e3bf5ec4030cdbb6c4cc55d6652c3038663c5ab5cc821fde1e7b91fd907',
// os: 'ios' }

export default class PushNotificationsHandler {
  static register(): Promise<{ token: string }> {
    return new Promise((resolve, reject) => {
      const rejectTimeout = setTimeout(resolve, 2000000, { token: '' });

      PN.configure({
        onRegister(response: RegistrationResponse) {
          clearTimeout(rejectTimeout);
          resolve(response);
        },

        onNotification(notification) {
          alert('received notification');
          console.log(notification);
          // // Android Notification does not contain "data" property.
          // const data = notification.data || { remote: true };
          // if (notification.foreground && data.remote) {
          //   // Handle nofitication manually if remote notification is received when app is in foreground.
          //   options.openLocalNotification(notification);
          // }
        },

        // ANDROID ONLY: (optional) GCM Sender ID.
        senderID: '{SENDER ID}',

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: false,

        /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
        requestPermissions: true,
      });
    });
  }
}
