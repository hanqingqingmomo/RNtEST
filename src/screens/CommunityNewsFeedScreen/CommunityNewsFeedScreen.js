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

export default class CommunityNewsFeedScreen extends Component<{}> {
  keyExtractor = item => {
    return item.id.toString() + Math.random();
  };

  renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <NewsFeedItem {...item} />
      </View>
    );
  };

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
            <View style={{ flex: 1 }}>
              <NewsFeedConversation />
              <View style={styles.itemsContainer}>
                <FlatList
                  key="list"
                  data={data}
                  renderItem={this.renderItem}
                  keyExtractor={this.keyExtractor}
                  onEndReached={requestNextBatch}
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
  item: {
    paddingBottom: 10,
  },
  itemsContainer: {
    flex: 1,
    // height: '100%',
    padding: 10,
    paddingBottom: 0,
  },
});
