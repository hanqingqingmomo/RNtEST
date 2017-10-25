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

function ItemSeparatorComponent() {
  return <View style={styles.separator} />;
}

export default class NewsFeedList extends Component<P> {
  keyExtractor = (item: CommunitySimple) => item.id;

  renderItem = ({ item }) => {
    const {
      navigation,
      isBeingDeleted,
      isBeingUpdated,
      requestDelete,
      deleteSuccessful,
      requestUpdate,
      updateSuccessful,
    } = this.props;

    return (
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
    );
  };

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
      ...bag
    } = this.props;

    return (
      <FlatList
        data={data}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={this.renderItem}
        {...bag}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 10,
  },
  separator: {
    height: 10,
  },
});
