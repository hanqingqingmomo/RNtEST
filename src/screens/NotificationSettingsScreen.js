// @flow

import React from 'react';
import { Switch } from 'react-native';

import {
  Fetch,
  Text,
  TableView,
  Screen,
  ActivityIndicator,
  CenterView,
} from '../atoms';
import { NoContent } from '../blocks';
import type { ScreenProps } from '../Types';
import {
  makeReadNotificationSettings,
  makeChangeNotificationSettings,
} from '../utils/requestFactory';

const { Table, Section, Cell } = TableView;

type Props = ScreenProps<*>;

export default class NotificationSettingsScreen extends React.Component<Props> {
  static navigationOptions = {
    title: 'Notifications',
  };

  onDataFetched = data => {
    this.setState(data);
  };

  handleSwitchValueChanged = (fetch: Function, settingValue: string) => async (
    value: boolean
  ) => {
    let setting = {};
    setting[settingValue] = value;

    const changeNotificationSettingsReq = makeChangeNotificationSettings(
      setting
    );

    const changeNotificationSettingsRes = await fetch(
      changeNotificationSettingsReq.url,
      changeNotificationSettingsReq.options
    );

    this.setState(changeNotificationSettingsRes.data);
  };

  render() {
    const readNotificationSettingssRq = makeReadNotificationSettings();

    return (
      <Screen fill>
        <Fetch
          onDataChange={this.onDataFetched}
          url={readNotificationSettingssRq.url}
          options={readNotificationSettingssRq.options}
        >
          {({ loading, error, data, fetch }: FetchProps<{ data: Object }>) => {
            if (loading) {
              return (
                <CenterView>
                  <ActivityIndicator />
                </CenterView>
              );
            } else if (data) {
              return (
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
                  <Section header="Push notifications">
                    <Cell
                      title="Private Messages"
                      cellAccessoryView={
                        <Switch
                          value={this.state.push_private_messages}
                          onValueChange={this.handleSwitchValueChanged(
                            fetch,
                            'push_private_messages'
                          )}
                        />
                      }
                    />
                    <Cell
                      title="Invitation to Join Community"
                      cellAccessoryView={
                        <Switch
                          value={this.state.push_community_invitations}
                          onValueChange={this.handleSwitchValueChanged(
                            fetch,
                            'push_community_invitations'
                          )}
                        />
                      }
                    />
                    <Cell
                      title={'Events & Webinars'}
                      cellAccessoryView={
                        <Switch
                          value={this.state.push_video_calls}
                          onValueChange={this.handleSwitchValueChanged(
                            fetch,
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
                          value={this.state.email_private_messages}
                          onValueChange={this.handleSwitchValueChanged(
                            fetch,
                            'email_private_messages'
                          )}
                        />
                      }
                    />
                    <Cell
                      title="Invitation to Join Community"
                      cellAccessoryView={
                        <Switch
                          value={this.state.email_community_invitations}
                          onValueChange={this.handleSwitchValueChanged(
                            fetch,
                            'email_community_invitations'
                          )}
                        />
                      }
                    />
                    <Cell
                      title={'Events & Webinars'}
                      cellAccessoryView={
                        <Switch
                          value={this.state.email_video_calls}
                          onValueChange={this.handleSwitchValueChanged(
                            fetch,
                            'email_video_calls'
                          )}
                        />
                      }
                    />
                  </Section>
                </Table>
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
      </Screen>
    );
  }
}
