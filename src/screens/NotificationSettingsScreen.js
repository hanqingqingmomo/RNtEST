// @flow

import React from 'react';
import { StyleSheet, Switch } from 'react-native';

import { TableView, Screen } from '../atoms';

const { Table, Section, Cell } = TableView;

export default class NotificationSettingsScreen extends React.Component<{}> {
  static navigationOptions = {
    title: 'Notifications',
  };

  render() {
    return (
      <Screen>
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
                <Switch value={true} onValueChanged={() => {}} />
              }
            />
            <Cell
              title="Invitation to Join Community"
              cellAccessoryView={
                <Switch value={true} onValueChanged={() => {}} />
              }
            />
            <Cell
              title={'Events ' + '&' + ' Webinars'}
              cellAccessoryView={
                <Switch value={true} onValueChanged={() => {}} />
              }
            />
          </Section>
          <Section header="Email updates">
            <Cell
              title="Private Messages"
              cellAccessoryView={
                <Switch value={true} onValueChanged={() => {}} />
              }
            />
            <Cell
              title="Invitation to Join Community"
              cellAccessoryView={
                <Switch value={true} onValueChanged={() => {}} />
              }
            />
            <Cell
              title={'Events ' + '&' + ' Webinars'}
              cellAccessoryView={
                <Switch value={true} onValueChanged={() => {}} />
              }
            />
          </Section>
        </Table>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({});