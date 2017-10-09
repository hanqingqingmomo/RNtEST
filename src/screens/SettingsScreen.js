// @flow

import React, { Component } from 'react';

import { TableView, Screen, Text, Icon } from '../atoms';
import { css } from '../utils/style';
import { getColor } from '../utils/color';
import type { ColorName, IconName } from '../Types';

const { Table, Cell, Section } = TableView;

type SettingProps = {
  id: number,
  name: string,
  iconName: IconName,
};

type ActionProps = {
  id: number,
  name: string,
  color: ColorName | string,
};

const SETTINGS = [
  {
    id: 1,
    name: 'Sync Calendars',
    iconName: 'calendar',
  },
  {
    id: 2,
    name: 'Use Invite Code',
    iconName: 'plus-bold',
  },
  {
    id: 3,
    name: 'Legal & Privacy',
    iconName: 'file-empty',
  },
  {
    id: 4,
    name: 'Change Password',
    iconName: 'lock-close',
  },
];

const ACTIONS = [
  {
    id: 1,
    name: 'Sign out',
    color: getColor('red'),
  },
];

export default class SettingsScreen extends Component<{}, void> {
  static navigationOptions = {
    title: 'Settings',
  };

  cellContentViewAction(action: ActionProps): React$Element<*> {
    return (
      <Text
        size={15}
        lineHeight={18}
        color={action.color}
        style={css('color', '#455A64')}
      >
        {action.name}
      </Text>
    );
  }

  cellImageView(setting: SettingProps): React$Element<*> {
    return <Icon size="md" name={setting.iconName} color="#CFD8DC" />;
  }

  onPushDetail(setting: SettingProps) {
    return () => {
      console.log('setting', setting);
    };
  }

  onPressAction(action: ActionProps): Function {
    return () => {
      console.log('action', action);
    };
  }

  render() {
    return (
      <Screen tintColor="#F3F3F6">
        <Table>
          <Section sectionPaddingTop={0}>
            {SETTINGS.map(setting => (
              <Cell
                cellStyle="Basic"
                key={setting.id}
                title={setting.name}
                image={this.cellImageView(setting)}
                accessory="DisclosureIndicator"
                onPress={this.onPushDetail(setting)}
              />
            ))}
          </Section>
          <Section sectionPaddingTop={40}>
            {ACTIONS.map(action => (
              <Cell
                key={action.id}
                title={action.name}
                titleTextColor="red"
                onPress={this.onPressAction(action)}
              />
            ))}
          </Section>
        </Table>
      </Screen>
    );
  }
}
