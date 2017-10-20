// @flow

import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import {
  ActivityIndicator,
  CenterView,
  CursorBasedFetech,
  View,
} from '../../atoms';
import { NewsFeedItem, PinnedPost } from '../../blocks';
import NewsFeedConversation from './../AggregatedNewsFeedScreen/NewsFeedConversation';
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

  renderItem = ({ item }: { item: Post }) => (
    <View style={styles.feedItemWrapper}>
      <NewsFeedItem {...item} navigation={this.props.navigation} />
    </View>
  );

  renderPinnedPost(data: Post) {
    return data ? (
      <PinnedPost data={data} onPress={() => console.log('aaa')} />
    ) : null;
  }

  render() {
    const { url, options } = makeReadCommunityFeedRq(this.props.communityId);
    return (
      <CursorBasedFetech url={url} options={options}>
        {({ data, pinnedPost, loading, batch, requestNextBatch }) => {
          return data === null ? (
            <CenterView>
              <ActivityIndicator />
            </CenterView>
          ) : (
            <View style={{ height: '100%' }}>
              <NewsFeedConversation
                onPress={() => {
                  this.props.navigation.navigate('PostEditorScreen');
                }}
              />

              <FlatList
                style={styles.itemsContainer}
                data={data}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                onEndReached={requestNextBatch}
                ListHeaderComponent={this.renderPinnedPost(pinnedPost)}
                ItemSeparatorComponent={ItemSeparatorComponent}
              />

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
    paddingVertical: 10,
  },
  feedItemWrapper: {
    paddingHorizontal: 10,
  },
});
