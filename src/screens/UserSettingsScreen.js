// @flow

import React, { Component } from 'react';
import { Alert } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Config from 'react-native-config';
import { connect } from 'react-redux';

import { endSession } from '../redux/ducks/application';
import { TableView, Screen, Icon } from '../atoms';
import { getColor } from '../utils/color';
import type { IconName, ScreenProps } from '../Types';

type ActionName =
  | 'Sync Calendars'
  | 'Use Invite Code'
  | 'Change Password'
  | 'Terms and Conditions'
  | 'Privacy Policy'
  | 'Change Password';

type Action = {
  name: ActionName,
  iconName: IconName,
};

type Props = ScreenProps<*> & {
  endSession: typeof endSession,
};

const SETTINGS: Array<{ name: ActionName, iconName: IconName }> = [
  {
    name: 'Terms and Conditions',
    iconName: 'file-empty',
  },
  {
    name: 'Privacy Policy',
    iconName: 'file-empty',
  },
  {
    name: 'Change Password',
    iconName: 'lock-close',
  },
];

class UserProfileScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Settings',
  };

  navigateToScreen(action: Action) {
    return () => {
      switch (action.name) {
        case 'Use Invite Code':
          this.props.navigation.navigate('InvitationCodeScreen');
          break;
        case 'Change Password':
          this.props.navigation.navigate('ChangePasswordScreen');
          break;
        case 'Terms and Conditions':
          this.props.navigation.navigate('TermsAndConditionsScreen');
          break;
        case 'Privacy Policy':
          this.props.navigation.navigate('PrivacyScreen');
          break;
        default:
      }
    };
  }

  signOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        onPress: this.props.endSession,
        style: 'destructive',
      },
    ]);
  };

  render() {
    return (
      <Screen>
        <TableView.Table>
          <TableView.Section>
            {SETTINGS.map((setting: Action) => (
              <TableView.Cell
                cellStyle="Basic"
                key={setting.name}
                title={setting.name}
                image={
                  <Icon size="md" name={setting.iconName} color="#CFD8DC" />
                }
                accessory="DisclosureIndicator"
                onPress={this.navigateToScreen(setting)}
              />
            ))}
          </TableView.Section>
          <TableView.Section>
            <TableView.Cell
              title="Sign Out"
              titleTextColor={getColor('red')}
              onPress={this.signOut}
            />
          </TableView.Section>
          <TableView.Section header="Application version">
            <TableView.Cell
              title={`${DeviceInfo.getReadableVersion()}${Config.ENVIRONMENT !==
              'production'
                ? `, env: ${Config.ENVIRONMENT}`
                : ''}`}
            />
            {Config.ENVIRONMENT !== 'production' ? (
              <TableView.Cell
                cellStyle="Subtitle"
                title="Device ID"
                detail={DeviceInfo.getUniqueID()}
              />
            ) : null}
          </TableView.Section>
        </TableView.Table>
      </Screen>
    );
  }
}

export default connect(null, { endSession })(UserProfileScreen);
