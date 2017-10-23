// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { FlatList, View } from '../../atoms';
import NewsFeedItem from '../../blocks/NewsFeedItem/NewsFeedItem';

import { type CommunitySimple } from '../../Types';

type Props = {
  navigation: any,
  data: Array<CommunitySimple>,
};

export default class NewsFeedList extends Component<Props> {
  render() {
    console.log(this.props.navigation);
    return (
      <View style={styles.itemsContainer}>
        <FlatList
          data={this.props.data}
          keyExtractor={(item: CommunitySimple) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <NewsFeedItem {...item} navigation={this.props.navigation} />
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  itemsContainer: {
    paddingTop: 10,
    flex: 1,
  },
});
