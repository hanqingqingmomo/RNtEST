// @flow

import React from 'react';
import { Switch } from 'react-native';

import debounce from 'lodash.debounce';

import {
  Text,
  TableView,
  Screen,
  ActivityIndicator,
  CenterView,
} from '../atoms';
import { NoContent } from '../blocks';
import type { ScreenProps, NotificationSettings } from '../Types';
import {
  readNotificationsSettings,
  updateNotificationsSettings,
} from '../utils/requestFactory';

const { Table, Section, Cell } = TableView;

type FetchState = 'InitialLoading' | 'Error' | 'Success';

type State = {
  fetchState: FetchState,
  notificationSettings?: NotificationSettings,
  errorMessage?: string,
};

export default class NotificationSettingsScreen extends React.Component<
  ScreenProps<*>,
  State
> {
  state: State = {
    fetchState: 'InitialLoading',
  };

  static navigationOptions = {
    title: 'Notifications',
  };

  handleResponse = (response: any) => {
    if (response.ok) {
      this.setState({
        fetchState: 'Success',
        notificationSettings: response.data,
      });
    } else {
      this.setState({
        fetchState: 'Error',
        errorMessage: response.data.error,
      });
      console.log('Error while requesting data', response);
    }
  };

  componentDidMount = async () =>
    this.handleResponse(await readNotificationsSettings());

  debouncedServerSync = debounce(
    async () =>
      this.handleResponse(
        await updateNotificationsSettings(this.state.notificationSettings)
      ),
    2000
  );

  handleSwitchValueChanged = (settingName: string) => async (
    value: boolean
  ) => {
    console.log('setting name, value', settingName, value);
    this.setState({
      notificationSettings: {
        ...this.state.notificationSettings,
        [settingName]: value,
      },
    });
    this.debouncedServerSync();
  };

  initialLoading = () => this.state.fetchState === 'InitialLoading';
  loadingError = () => this.state.fetchState === 'Error';
  success = () => this.state.fetchState === 'Success';

  renderInternals() {
    if (this.success() && this.state.notificationSettings) {
      const {
        push_private_messages,
        push_community_invitations,
        push_video_calls,
        email_private_messages,
        email_community_invitations,
        email_video_calls,
      } = this.state.notificationSettings;
      return (
        <Table>
          <Section header="Newsfeed">
            <Cell
              title="Prioritize What to See First"
              accessory="DisclosureIndicator"
              onPress={() =>
                this.props.navigation.navigate('NewsFeedSettingsScreen')}
            />
          </Section>
          <Section header="Push notifications">
            <Cell
              title="Private Messages"
              cellAccessoryView={
                <Switch
                  value={push_private_messages}
                  onValueChange={this.handleSwitchValueChanged(
                    'push_private_messages'
                  )}
                />
              }
            />
            <Cell
              title="Invitation to Join Community"
              cellAccessoryView={
                <Switch
                  value={push_community_invitations}
                  onValueChange={this.handleSwitchValueChanged(
                    'push_community_invitations'
                  )}
                />
              }
            />
            <Cell
              title={'Events & Webinars'}
              cellAccessoryView={
                <Switch
                  value={push_video_calls}
                  onValueChange={this.handleSwitchValueChanged(
                    'push_video_calls'
                  )}
                />
              }
            />
          </Section>
          <Section header="Email updates">
            <Cell
              title="Private Messages"
              cellAccessoryView={
                <Switch
                  value={email_private_messages}
                  onValueChange={this.handleSwitchValueChanged(
                    'email_private_messages'
                  )}
                />
              }
            />
            <Cell
              title="Invitation to Join Community"
              cellAccessoryView={
                <Switch
                  value={email_community_invitations}
                  onValueChange={this.handleSwitchValueChanged(
                    'email_community_invitations'
                  )}
                />
              }
            />
            <Cell
              title={'Events & Webinars'}
              cellAccessoryView={
                <Switch
                  value={email_video_calls}
                  onValueChange={this.handleSwitchValueChanged(
                    'email_video_calls'
                  )}
                />
              }
            />
          </Section>
        </Table>
      );
    } else if (this.initialLoading()) {
      return (
        <CenterView>
          <ActivityIndicator />
        </CenterView>
      );
    } else if (this.loadingError()) {
      return (
        <CenterView>
          <Text>{this.state.errorMessage}</Text>
        </CenterView>
      );
    } else {
      return <NoContent iconName="sad-face" title="No Content" />;
    }
  }

  render = () => <Screen fill>{this.renderInternals()}</Screen>;
}
