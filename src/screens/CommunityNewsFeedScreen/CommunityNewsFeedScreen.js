// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
  ActivityIndicator,
  CenterView,
  CursorBasedFetech,
  Text,
  View,
} from '../../atoms';
import { PinnedPost } from '../../blocks';
import NewsFeedList from '../../blocks/NewsFeedItem/NewsFeedList';
import NewsFeedConversation from './../AggregatedNewsFeedScreen/NewsFeedConversation';
import { makeReadCommunityFeedRq } from '../../utils/requestFactory';
import { type Post } from '../../Types';

type Props = {
  communityId: string,
  navigation: any,
  navigateToPost: Object => void,
  reloadCommunity: Function,
};

export default class CommunityNewsFeedScreen extends Component<Props> {
  renderPinnedPost(data: Post) {
    return data ? (
      <PinnedPost
        data={data}
        onSeeAll={() => {
          this.props.navigation.navigate('PinnedPostsScreen', {
            communityId: this.props.communityId,
          });
        }}
        onPress={data => {
          this.props.navigation.navigate('PostDetailScreen', {
            postId: data.id,
            reloadList: this.props.reloadCommunity,
          });
        }}
      />
    ) : null;
  }

  render() {
    const { url, options } = makeReadCommunityFeedRq(this.props.communityId);

    return (
      <CursorBasedFetech url={url} options={options}>
        {({ data, pinnedPost, loading, batch, requestNextBatch, fetch }) => {
          if (loading === false) {
            return (
              <View style={{ flex: 1 }}>
                <NewsFeedConversation
                  onPress={() => {
                    this.props.navigation.navigate('PostEditorScreen');
                  }}
                />
                {data && data.length > 0 ? (
                  <NewsFeedList
                    data={data}
                    onEndReached={requestNextBatch}
                    ListHeaderComponent={this.renderPinnedPost(pinnedPost)}
                    navigation={this.props.navigation}
                  />
                ) : (
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>There is no content.</Text>
                  </View>
                )}
              </View>
            );
          } else {
            return (
              <CenterView>
                <ActivityIndicator />
              </CenterView>
            );
          }
        }}
      </CursorBasedFetech>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontWeight: '500',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
