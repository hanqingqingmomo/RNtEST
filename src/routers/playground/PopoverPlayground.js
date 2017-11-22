import React from 'react';
import { Switch } from 'react-native';

import { View, Icon, Popover, PopoverItem } from '../../atoms';

const items = [
  {
    key: 'abc',
    label: () => (
      <PopoverItem
        accessoryView={
          <Switch
            onValueChange={() => {}}
            value={true}
            style={{ height: 45 }}
          />
        }
        contentView="Press"
        imageView={<Icon name="search" color="#B0BEC5" size={22} />}
      />
    ),
    onPress: () => {},
  },
  {
    key: 'def',
    label: () => (
      <PopoverItem
        contentView="Press"
        imageView={<Icon name="search" color="#B0BEC5" size={22} />}
      />
    ),
    onPress: () => {},
  },
];

export default class PopoverPlayground extends React.Component<{}> {
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
