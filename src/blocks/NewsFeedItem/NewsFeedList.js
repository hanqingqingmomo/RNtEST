// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { FlatList, View } from '../../atoms';
import NewsFeedItem from '../../blocks/NewsFeedItem/NewsFeedItem';

import type { CommunitySimple, Post } from '../../Types';

type P = {
  navigation: any,
  data: Array<CommunitySimple>,
  requestDelete: Function,
  deleteSuccessful: Function,
  isBeingDeleted: boolean,
  requestUpdate: Function,
  updateSuccessful: Function,
  isBeingUpdated: boolean,
};

export default class NewsFeedList extends Component<P> {
  render() {
    const {
      navigation,
      data,
      isBeingDeleted,
      isBeingUpdated,
      requestDelete,
      deleteSuccessful,
      requestUpdate,
      updateSuccessful,
      ...args
    } = this.props;

    return (
      <View style={styles.itemsContainer}>
        <FlatList
          data={data}
          keyExtractor={(item: CommunitySimple) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <NewsFeedItem
                isBeingDeleted={isBeingDeleted}
                isBeingUpdated={isBeingUpdated}
                item={item}
                navigation={navigation}
                requestDelete={requestDelete}
                deleteSuccessful={deleteSuccessful}
                requestUpdate={requestUpdate}
                updateSuccessful={updateSuccessful}
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
    paddingHorizontal: 10,
  },
  itemsContainer: {
    flex: 1,
  },
  separator: {
    height: 10,
  },
});
