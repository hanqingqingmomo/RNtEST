// @flow

import React from 'react';
import PopoverTooltip from 'react-native-popover-tooltip';
import { StyleSheet, Dimensions } from 'react-native';

import { View, Text, Icon, Popover } from '../atoms';
import { getColor } from '../utils/color';

const Item = () => (
  <View
    style={{
      flexDirection: 'row',
      backgroundColor: getColor('white'),
    }}
  >
    <Icon
      name="search"
      color="#B0BEC5"
      size={20}
      style={{ alignSelf: 'center' }}
    />
    <Text style={{ fontSize: 15, marginLeft: 20 }}>Press</Text>
  </View>
);

const Item2 = () => (
  <View
    style={{
      flexDirection: 'row',
      backgroundColor: getColor('white'),
    }}
  >
    <Icon
      name="search"
      color="#B0BEC5"
      size={20}
      style={{ alignSelf: 'center' }}
    />
    <Text style={{ fontSize: 15, marginLeft: 20 }}>Press2</Text>
  </View>
);

const items = [
  {
    label: Item,
    onPress: () => {},
  },
  {
    label: Item2,
    onPress: () => {},
  },
];

export default class PopoverPlayground extends React.Component {
  static navigationOptions = { headerTitle: 'Popover' };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Popover labels={items} />
      </View>
    );
  }
}
