// @flow

import React from 'react';
import { Switch } from 'react-native';

import debounce from 'lodash.debounce';

import {
  ActivityIndicator,
  CenterView,
  DeferExpensiveTasks,
  Fetch,
  ScrollView,
  TableView,
  Text,
} from '../atoms';
import { NoContent } from '../blocks';
import type { ScreenProps, NotificationSettings, FetchProps } from '../Types';
import {
  makeReadNotificationsSettings,
  updateNotificationsSettings,
} from '../utils/requestFactory';

const { Table, Section, Cell } = TableView;

type State = NotificationSettings;

type Option = { key: string, label: string };

const CELLS = {
  pushNotifications: [
    {
      key: 'push_private_messages',
      label: 'Private Messages',
    },
    {
      key: 'push_community_invitations',
      label: 'Invitation to Join Community',
    },
    {
      key: 'push_video_calls',
      label: 'Events & Webinars',
    },
  ],
  emailNotifications: [
    {
      key: 'email_private_messages',
      label: 'Private Messages',
    },
    {
      key: 'email_community_invitations',
      label: 'Invitation to Join Community',
    },
    {
      key: 'email_video_calls',
      label: 'Events & Webinars',
    },
  ],
};

export default class NotificationSettingsScreen extends React.Component<
  ScreenProps<*>,
  State
> {
  static navigationOptions = {
    title: 'Notifications',
  };

  debouncedServerSync = debounce(async () => {
    const response = await updateNotificationsSettings(this.state);
    this.setState(response.data);
  }, 2000);

  onDataFetched = (data: NotificationSettings) => this.setState(data);

  handleSwitchValueChanged = (settingValue: string) => async (
    value: boolean
  ) => {
    this.setState({ [settingValue]: value });
    this.debouncedServerSync();
  };

  renderSection = (header: string, cells: Array<Option>): React$Node => {
    return (
      <Section header="Push notifications">
        {cells.map(({ key, label }): Option => (
          <Cell
            key={key}
            title={label}
            cellAccessoryView={
              <Switch
                value={this.state[key]}
                onValueChange={this.handleSwitchValueChanged(key)}
              />
            }
          />
        ))}
      </Section>
    );
  };

  render() {
    const { url, options } = makeReadNotificationsSettings();
    return (
      <DeferExpensiveTasks>
        <Fetch onDataChange={this.onDataFetched} url={url} options={options}>
          {({ loading, error, data }: FetchProps<{ data: Object }>) => {
            if (data) {
              return (
                <ScrollView alwaysBounceVertical={false}>
                  <Table>
                    <Section header="Newsfeed">
                      <Cell
                        title="Prioritize What to See First"
                        accessory="DisclosureIndicator"
                        onPress={() =>
                          this.props.navigation.navigate(
                            'NewsFeedSettingsScreen'
                          )}
                      />
                    </Section>
                    {this.renderSection(
                      'Push notifications',
                      CELLS.pushNotifications
                    )}

                    {this.renderSection(
                      'Push Email updates"',
                      CELLS.emailNotifications
                    )}
                  </Table>
                </ScrollView>
              );
            } else if (loading) {
              return (
                <CenterView>
                  <ActivityIndicator />
                </CenterView>
              );
            } else if (error) {
              return (
                <CenterView>
                  <Text>{error.message}</Text>
                </CenterView>
              );
            } else return <NoContent iconName="sad-face" title="No Content" />;
          }}
        </Fetch>
      </DeferExpensiveTasks>
    );
  }
}
