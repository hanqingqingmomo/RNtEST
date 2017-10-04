// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { TableView, View, ShadowView, Text, Icon } from '../atoms';
import { css } from '../utils/style';
import { getColor } from '../utils/color';
import type { ColorName } from '../utils/color';

type SettingProps = {
  id: number,
  name: string,
  iconName: string,
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
    iconName: 'plus',
  },
  {
    id: 3,
    name: 'Legal & Privacy',
    iconName: 'file-empty',
  },
  {
    id: 4,
    name: 'Change Password',
    iconName: 'calendar',
  },
];

const ACTIONS = [
  {
    id: 1,
    name: 'Sign out',
    color: getColor('red'),
  },
];

export default class SettingsScreen extends React.Component<void, void, void> {
  static navigationOptions = {
    title: 'Settings',
  };

  cellContentView(setting: SettingProps): React$Element<*> {
    return (
      <View style={styles.textContent}>
        <Text size={15} lineHeight={18} style={css('color', '#455A64')}>
          {setting.name}
        </Text>
      </View>
    );
  }

  cellContentViewAction(action: ActionProps): React$Element<*> {
    return (
      <View style={styles.textContent}>
        <Text
          size={15}
          lineHeight={18}
          color={action.color}
          style={css('color', '#455A64')}
        >
          {action.name}
        </Text>
      </View>
    );
  }

  cellImageView(setting: SettingProps): React$Element<*> {
    return (
      <View style={styles.icon}>
        <Icon size="md" name={setting.iconName} color="#CFD8DC" />
      </View>
    );
  }

  cellAccessoryView(setting: SettingProps): React$Element<*> {
    return (
      <View style={[styles.icon, styles.accessoryIcon]}>
        <Icon size={28} name="calendar" color="#CFD8DC" />
      </View>
    );
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
      <View style={styles.container}>
        <ShadowView radius={0} style={[styles.bgWhite, styles.section]}>
          <TableView.Table>
            {SETTINGS.map(setting => (
              <TableView.Cell
                key={setting.id}
                cellContentView={this.cellContentView(setting)}
                cellImageView={this.cellImageView(setting)}
                cellAccessoryView={this.cellAccessoryView(setting)}
                contentContainerStyle={styles.cell}
                onPress={this.onPushDetail(setting)}
              />
            ))}
          </TableView.Table>
        </ShadowView>
        <ShadowView radius={0} style={[styles.bgWhite]}>
          <TableView.Table>
            {ACTIONS.map(action => (
              <TableView.Cell
                key={action.id}
                cellContentView={this.cellContentViewAction(action)}
                contentContainerStyle={styles.cell}
                onPress={this.onPressAction(action)}
              />
            ))}
          </TableView.Table>
        </ShadowView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ECEFF1',
    flex: 1,
  },
  bgWhite: {
    backgroundColor: 'white',
  },
  cell: {
    paddingVertical: 0,
    paddingLeft: 15,
    paddingRight: 0,
  },
  textContent: {
    flex: 1,
    paddingHorizontal: 7,
    borderBottomWidth: 1,
    borderColor: '#ECEFF1',
    height: 50,
    justifyContent: 'center',
  },
  icon: {
    borderBottomWidth: 1,
    borderColor: '#ECEFF1',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  accessoryIcon: {
    paddingRight: 15,
  },
  section: {
    marginBottom: 57,
  },
});
