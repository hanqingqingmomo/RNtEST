// @flow

import React, { Component } from 'react';
import { Separator } from 'react-native-tableview-simple';

import {
  ActivityIndicator,
  CenterView,
  Fetch,
  TableView,
  FlatList,
  Text,
  Icon,
  Avatar,
  View,
} from '../../atoms';
import { type User } from '../../Types';

const mocks = [
  {
    first_name: 'Vladko',
    last_name: 'Laca',
    profile_photo:
      'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
    id: 0,
  },
  {
    first_name: 'Vladko',
    last_name: 'Laca',
    profile_photo:
      'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
    id: 1,
  },
  {
    first_name: 'Vladko',
    last_name: 'Laca',
    profile_photo:
      'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
    id: 2,
  },
];

const { Cell } = TableView;
const AVATAR_WIDTH = 28;

type Props = {
  event: Object,
  navigateToMember: (user: User) => void,
};

export default class TabEventMembers extends Component<Props> {
  static navigationOptions = {
    tabBarLabel: 'Members',
  };

  keyExtractor = item => item.id;

  renderItem = ({ item, separators }) => (
    <Cell
      title={`${item.first_name} ${item.last_name}`}
      titleTextColor="#455A64"
      image={<Avatar imageURI={item.profile_photo} size={AVATAR_WIDTH} />}
      cellAccessoryView={<Icon name="chat-1" size="md" color="#CFD8DC" />}
      onPress={() => this.props.navigateToMember(item)}
      disableImageResize
      onHighlightRow={separators.highlight}
      onUnHighlightRow={separators.unhighlight}
    />
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={mocks}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={({ highlighted }) => (
            <Separator isHidden={highlighted} />
          )}
        />
      </View>
    );
  }
}
