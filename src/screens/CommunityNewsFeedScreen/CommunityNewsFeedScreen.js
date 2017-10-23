// @flow

import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import {
  ActivityIndicator,
  CenterView,
  CursorBasedFetech,
  Text,
  View,
} from '../../atoms';
import { NewsFeedItem, PinnedPost } from '../../blocks';
import NewsFeedConversation from './../AggregatedNewsFeedScreen/NewsFeedConversation';
import { makeReadCommunityFeedRq } from '../../utils/requestFactory';
import { type Post } from '../../Types';

type Props = {
  communityId: string,
  navigateToPost: Object => void,
  reloadCommunity: Function,
};

export default class CommunityNewsFeedScreen extends Component<Props> {
  keyExtractor = (item: Post) => item.id.toString() + Math.random();

  renderItem = ({ item }: { item: Post }) => (
    <View style={styles.item}>
      <NewsFeedItem
        {...item}
        navigation={this.props.navigation}
        refetch={this.props.reloadCommunity}
        onDelete={this.props.reloadCommunity}
      />
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
        {({ data, pinnedPost, loading, batch, requestNextBatch, fetch }) => {
          if (loading) {
            return (
              <CenterView>
                <ActivityIndicator />
              </CenterView>
            );
          }
          return (
            <View style={{ flex: 1 }}>
              <NewsFeedConversation
                onPress={() => {
                  this.props.navigation.navigate('PostEditorScreen', {
                    onReturn: () => fetch(),
                  });
                }}
              />
              {data && data.length > 0 ? (
                <View style={styles.itemsContainer}>
                  <View style={styles.itemsContainer}>
                    <FlatList
                      data={data}
                      renderItem={this.renderItem}
                      keyExtractor={this.keyExtractor}
                      onEndReached={requestNextBatch}
                      ListHeaderComponent={this.renderPinnedPost(pinnedPost)}
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.textContainer}>
                  <Text style={styles.text}>There is no content.</Text>
                </View>
              )}
            </View>
          );
        }}
      </CursorBasedFetech>
    );
  }
}

const styles = StyleSheet.create({
  itemsContainer: {
    paddingTop: 10,
    flex: 1,
  },
  item: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
