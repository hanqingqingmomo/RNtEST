// @flow

import {NativeModules, NativeEventEmitte} from 'react-native';
import ReactNative from 'react-native';
import React, { Component } from 'react';
import { Alert, Clipboard, TouchableOpacity } from 'react-native';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import { connect } from 'react-redux';
import AppCenter from 'appcenter';

import { endSession } from '../redux/ducks/application';
import { TableView, Screen, Icon } from '../atoms';
import { Await } from '../atoms/Await';
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

const { ConferenceManager } = NativeModules;


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

     ConferenceManager.enterConference(
                       ReactNative.findNodeHandle(this.refs.screenView),
                       "1" 
                       );
    
    //Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      //{ text: 'Cancel', style: 'cancel' },
      //{
        //text: 'Sign Out',
        //onPress: this.props.endSession,
        //style: 'destructive',
      //},
    //]);
  };

  render() {
    return (
      <Screen ref="screenView">
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
            <TableView.Cell title={DeviceInfo.getReadableVersion()} />
          </TableView.Section>
          {Config.ENVIRONMENT !== 'production' ? (
            <TableView.Section header="Developer">
              <Await
                promise={AppCenter.getInstallId()}
                render={value => (
                  <TableView.Cell
                    cellStyle="Subtitle"
                    title="Install ID"
                    detail={value}
                    cellAccessoryView={
                      <TouchableOpacity
                        onPress={() => Clipboard.setString(value)}
                      >
                        <Icon name="add-file" size={24} />
                      </TouchableOpacity>
                    }
                  />
                )}
              />
            </TableView.Section>
          ) : null}
        </TableView.Table>
      </Screen>
    );
  }
}

export default connect(null, { endSession })(UserProfileScreen);
