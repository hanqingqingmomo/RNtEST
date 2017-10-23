// @flow

import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';

import { clearUserData } from '../redux/ducks/application';
import { TableView, Screen, Icon } from '../atoms';
import { getColor } from '../utils/color';
import type { IconName } from '../Types';

type ActionName =
  | 'Sync Calendars'
  | 'Use Invite Code'
  | 'Legal & Privacy'
  | 'Change Password';

type Action = {
  name: ActionName,
  iconName: IconName,
};

type Props = {
  navigation: any,
};

const SETTINGS = [
  /*{
    name: 'Sync Calendars',
    iconName: 'calendar',
  },
  {
    name: 'Use Invite Code',
    iconName: 'plus-bold',
  },*/
  {
    name: 'Terms and conditions',
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

  navigateToScreen(action: Action): Function {
    return () => {
      switch (action.name) {
        case 'Use Invite Code':
          this.props.navigation.navigate('InvitationCodeScreen');
          break;
        case 'Terms and conditions':
          this.props.navigation.navigate('TermsScreen');
          break;
        case 'Privacy Policy':
          this.props.navigation.navigate('PrivacyScreen');
          break;
        default:
          console.log(action.name);
      }
    };
  }

  signOut = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: this.props.clearUserData,
      },
    ]);
  };

  render() {
    return (
      <Screen>
        <TableView.Table>
          <TableView.Section>
            {SETTINGS.map(setting => (
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
        </TableView.Table>
      </Screen>
    );
  }
}

export default connect(null, { clearUserData })(UserProfileScreen);
