// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { View, Text, TouchableOpacity } from './index';
import { getColor } from '../utils/color';

type Item = {
  label: string,
  component: () => React$Node,
};

type Props = {
  activeItem: string,
  onChange: string => void,
  items: Array<Item>,
};

export default class Tabs extends Component<Props> {
  onPress = (item: Item) => () => {
    this.props.onChange(item.label);
  };

  render() {
    const activeItem = this.props.items.find(
      item => item.label === this.props.activeItem
    );

    return (
      <View style={styles.container}>
        <View style={styles.tabsContainer}>
          {this.props.items.map(item => (
            <TouchableOpacity
              key={item.label}
              onPress={this.onPress(item)}
              style={[
                styles.tab,
                activeItem && activeItem.label === item.label
                  ? styles.tabActive
                  : undefined,
              ]}
            >
              <Text color="gray" size={14}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.content}>
          {activeItem ? activeItem.component() : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F4F5F7',
  },
  tabsContainer: {
    flexDirection: 'row',
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E5',
    backgroundColor: 'white',
  },
  tab: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 3,
    borderBottomColor: getColor('orange'),
  },
  content: {
    flexGrow: 1,
  },
});
