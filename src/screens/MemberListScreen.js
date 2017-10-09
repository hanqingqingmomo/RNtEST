// @flow

import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Separator } from 'react-native-tableview-simple';

import { TableView, Screen, Icon, Avatar } from '../atoms';
import { getColor } from '../utils/color';

const { Table, Section, Cell } = TableView;
const AVATAR_WIDTH = 28;

const data = [
  {
    first_name: 'Vladko',
    last_name: 'Laca',
    id: 1,
    img: 'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
  },
  {
    first_name: 'Mirko',
    last_name: 'Laca',
    id: 2,
    img: 'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
  },
  {
    first_name: 'Ferko',
    last_name: 'Laca',
    id: 3,
    img: 'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
  },
  {
    first_name: 'Jozko',
    last_name: 'Laca',
    id: 4,
    img: 'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
  },
  {
    first_name: 'Bonifac',
    last_name: 'Laca',
    id: 5,
    img: 'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
  },
  {
    first_name: 'Peter',
    last_name: 'Laca',
    id: 6,
    img: 'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
  },
  {
    first_name: 'Imro',
    last_name: 'Laca',
    id: 7,
    img: 'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
  },
  {
    first_name: 'Patrik',
    last_name: 'Laca',
    id: 8,
    img: 'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
  },
  {
    first_name: 'Martin',
    last_name: 'Laca',
    id: 9,
    img: 'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
  },
  {
    first_name: 'Stefan',
    last_name: 'Laca',
    id: 10,
    img: 'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
  },
  {
    first_name: 'Dano',
    last_name: 'Laca',
    id: 11,
    img: 'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
  },
  {
    first_name: 'Matej',
    last_name: 'Laca',
    id: 12,
    img: 'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
  },
  {
    first_name: 'Inge',
    last_name: 'Laca',
    id: 13,
    img: 'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
  },
  {
    first_name: 'Jurgen',
    last_name: 'Laca',
    id: 14,
    img: 'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
  },
  {
    first_name: 'Ronaldo',
    last_name: 'Laca',
    id: 15,
    img: 'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
  },
];

export default class MemberListScreen extends React.Component {
  static navigationOptions = {
    title: 'Members',
  };

  renderItem = ({ item, separators }) => {
    return (
      <Cell
        title={`${item.first_name} ${item.last_name}`}
        titleTextColor="#455A64"
        image={<Avatar imageURI={item.img} size={AVATAR_WIDTH} />}
        cellAccessoryView={
          <Icon name="conversation" size="lg" color="#CFD8DC" />
        }
        onPress={() => {}}
        disableImageResize
        onHighlightRow={separators.highlight}
        onUnHighlightRow={separators.unhighlight}
      />
    );
  };

  keyExtractor = item => item.id;

  render() {
    return (
      <Screen tintColor="#F7F7F7">
        <Table>
          <FlatList
            data={data}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            ItemSeparatorComponent={({ highlighted }) => (
              <Separator isHidden={highlighted} />
            )}
          />
        </Table>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({});
