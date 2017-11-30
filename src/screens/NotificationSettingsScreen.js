// @flow

import React from 'react';
import { Switch } from 'react-native';
import debounce from 'lodash.debounce';

import {
  ActivityIndicator,
  CenterView,
  ScrollView,
  TableView,
  Text,
} from '../atoms';
import type { ScreenProps, NotificationSettings } from '../Types';
import {
  readNotificationsSettings,
  updateNotificationsSettings,
  type Response,
} from '../utils/requestFactory';

const { Table, Section, Cell } = TableView;

type Option = { action: 'toggle' | 'push', key: string, label: string };

type Props = ScreenProps<*>;

type State = {
  settings: $Shape<NotificationSettings>,
  response: ?Response<NotificationSettings>,
};

const CELLS = {
  pushNotifications: [
    {
      action: 'toggle',
      key: 'push_private_messages',
      label: 'Private Messages',
    },
    {
      action: 'toggle',
      key: 'push_community_invitations',
      label: 'Invitation to Join Community',
    },
    {
      action: 'toggle',
      key: 'push_video_calls',
      label: 'Events & Webinars',
    },
  ],
  emailNotifications: [
    {
      action: 'toggle',
      key: 'email_private_messages',
      label: 'Private Messages',
    },
    {
      action: 'toggle',
      key: 'email_community_invitations',
      label: 'Invitation to Join Community',
    },
    {
      action: 'toggle',
      key: 'email_video_calls',
      label: 'Events & Webinars',
    },
  ],
  newsFeed: [
    {
      action: 'push',
      key: 'NewsFeedSettingsScreen',
      label: 'Prioritize What to See First',
    },
  ],
};

export default class NotificationSettingsScreen extends React.Component<
  Props,
  State
> {
  state: State = {
    settings: {},
    response: null,
  };

  mounted: boolean = true;

  static navigationOptions = {
    title: 'Notifications',
  };

  componentDidMount() {
    this.handleRequest(readNotificationsSettings());
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  debouncedServerSync = debounce(async () => {
    this.handleRequest(updateNotificationsSettings(this.state.settings));
  }, 2000);

  handleRequest = async (request: *) => {
    const response = await updateNotificationsSettings(this.state.settings);
    if (this.mounted) {
      this.setState({ response, settings: response.ok ? response.data : {} });
    }
  };

  handleSwitchValueChanged = (name: string) => async (value: boolean) => {
    this.setState(
      state => ({
        settings: {
          ...state.settings,
          [name]: value,
        },
      }),
      this.debouncedServerSync
    );
  };

  renderSection = (header: string, cells: Array<Option>): React$Node => {
    return (
      <Section header="Push notifications">
        {cells.map(({ action, key, label }) => (
          <Cell
            key={key}
            title={label}
            accessory={action === 'push' ? 'DisclosureIndicator' : undefined}
            cellAccessoryView={
              action === 'toggle' ? (
                <Switch
                  value={this.state.settings[key]}
                  onValueChange={this.handleSwitchValueChanged(key)}
                />
              ) : null
            }
            onPress={
              action === 'push'
                ? () => this.props.navigation.navigate(key)
                : undefined
            }
          />
        ))}
      </Section>
    );
  };

  render() {
    const { response } = this.state;
    return !response ? (
      <CenterView>
        <ActivityIndicator />
      </CenterView>
    ) : response.ok ? (
      <ScrollView alwaysBounceVertical={false}>
        <Table>
          {this.renderSection('Newsfeed', CELLS.newsFeed)}
          {this.renderSection('Push notifications', CELLS.pushNotifications)}
          {this.renderSection('Push Email updates"', CELLS.emailNotifications)}
        </Table>
      </ScrollView>
    ) : (
      <CenterView>
        <Text>{response.problem}</Text>
      </CenterView>
    );
  }
}
