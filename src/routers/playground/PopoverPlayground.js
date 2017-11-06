import React from 'react';
import PopoverTooltip from 'react-native-popover-tooltip';
import { StyleSheet, Dimensions, Switch } from 'react-native';

import { View, Text, Icon, Popover, PopoverItem } from '../../atoms';
import { getColor } from '../../utils/color';

const Item = () => (
  <PopoverItem
    accessoryView={
      <Switch onValueChange={() => {}} value={true} style={{ height: 45 }} />
    }
    contentView="Press"
    imageView={<Icon name="search" color="#B0BEC5" size={22} />}
  />
);

const Item2 = () => (
  <PopoverItem
    contentView="Press"
    imageView={<Icon name="search" color="#B0BEC5" size={22} />}
  />
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
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Popover
          labels={items}
          button={<Icon name="menu" color="black" size={60} />}
        />
        <View style={{ alignSelf: 'flex-end' }}>
          <Popover
            labels={items}
            button={<Icon name="menu" color="black" size={60} />}
          />
        </View>
        <Popover
          labels={items}
          button={<Icon name="menu" color="black" size={60} />}
        />
      </View>
    );
  }
}
