// @flow

import React from 'react';
import {
  Image,
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { getColor } from '../../utils/color';

type Props<T> = {
  data: Array<T>,
  extractOption: T => { label: string, value: string },
  selected: Array<string>,
  onItemPress: string => mixed,
};

function ItemSeparatorComponent() {
  return (
    <View
      style={{ height: StyleSheet.hairlineWidth, backgroundColor: '#ddd' }}
    />
  );
}

export class PickerList extends React.Component<Props<*>> {
  keyExtractor = (item: *): string => {
    const data = this.props.extractOption(item);
    return data.value;
  };

  renderItem = (row: *) => {
    const option = this.props.extractOption(row.item);
    const selected = this.props.selected.includes(option.value);
    return (
      <TouchableOpacity onPress={() => this.props.onItemPress(option.value)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 10,
            minHeight: 44,
            width: Dimensions.get('window').width - 90 + 32,
          }}
        >
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{
              width: Dimensions.get('window').width - 90 + (selected ? 0 : 32),
            }}
          >
            {option.label}
          </Text>
          {selected ? (
            <Image
              source={require('./icons/checkmark.png')}
              style={{ width: 24, height: 24, tintColor: getColor('orange') }}
            />
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  render(): React$Node {
    return (
      <FlatList
        contentContainerStyle={{ padding: 15 }}
        ItemSeparatorComponent={ItemSeparatorComponent}
        data={this.props.data}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}
