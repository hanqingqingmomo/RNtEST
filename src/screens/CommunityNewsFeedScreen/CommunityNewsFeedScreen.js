// @flow

import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import {
  ActivityIndicator,
  CenterView,
  CursorBasedFetech,
  View,
} from '../../atoms';
import { NewsFeedItem } from '../../blocks';
import NewsFeedConversation from './NewsFeedConversation';
import { makeReadCommunityFeedRq } from '../../utils/requestFactory';
import { type Post } from '../../Types';

type Props = {
  communityId: string,
  navigateToPost: Object => void,
};

function ItemSeparatorComponent() {
  return <View style={styles.itemSeparatorComponent} />;
}

export default class CommunityNewsFeedScreen extends Component<Props> {
  keyExtractor = (item: Post) => item.id.toString() + Math.random();

  renderItem = ({ item }: { item: Post }) => <NewsFeedItem {...item} />;

  render() {
    const { url, options } = makeReadCommunityFeedRq(this.props.communityId);
    return (
      <CursorBasedFetech url={url} options={options}>
        {({ data, loading, batch, requestNextBatch }) => {
          return data === null ? (
            <CenterView>
              <ActivityIndicator />
            </CenterView>
          ) : (
            <View style={{ height: '100%' }}>
              <NewsFeedConversation />
              <View style={styles.itemsContainer}>
                <FlatList
                  key="list"
                  data={data}
                  renderItem={this.renderItem}
                  keyExtractor={this.keyExtractor}
                  onEndReached={requestNextBatch}
                  ItemSeparatorComponent={ItemSeparatorComponent}
                />
              </View>
              {loading ? (
                <CenterView style={{ height: 50, flexGrow: 0 }}>
                  <ActivityIndicator />
                </CenterView>
              ) : null}
            </View>
          );
        }}
      </CursorBasedFetech>
    );
  }
}

const styles = StyleSheet.create({
  itemSeparatorComponent: {
    height: 10,
  },
  itemsContainer: {
    flex: 1,
    padding: 10,
  },
});
