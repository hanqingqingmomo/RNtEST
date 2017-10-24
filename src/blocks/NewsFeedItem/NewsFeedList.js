// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { FlatList, View } from '../../atoms';
import NewsFeedItem from '../../blocks/NewsFeedItem/NewsFeedItem';

import type { CommunitySimple, Post } from '../../Types';

type P = {
  navigation: any,
  data: Array<CommunitySimple>,
};

export default class NewsFeedList extends Component<P> {
  render() {
    const { navigation, data, ...args } = this.props;
    return (
      <View style={styles.itemsContainer}>
        <FlatList
          data={data}
          keyExtractor={(item: CommunitySimple) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <NewsFeedItem
                isBeingDeleted={true /* TODO */}
                isBeingUpdated={true /* TODO */}
                item={item}
                navigation={navigation}
                requestDelete={(item: Post) => {
                  // TODO
                  console.log('delete', item);
                }}
                requestUpdate={(item: Post) => {
                  // TODO
                  console.log('update', item);
                }}
              />
            </View>
          )}
          {...args}
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
