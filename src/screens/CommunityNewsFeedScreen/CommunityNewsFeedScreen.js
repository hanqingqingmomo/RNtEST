// @flow

import React, { Component } from 'react';

import { View } from '../../atoms';
import { NewsFeed, PinnedPost } from '../../blocks';
import NewsFeedConversation from './../AggregatedNewsFeedScreen/NewsFeedConversation';
import { makeReadCommunityFeedRq } from '../../utils/requestFactory';

type Props = {
  communityId: string,
  navigation: any,
  navigateToPost: Object => void,
};

export default class CommunityNewsFeedScreen extends Component<Props> {
  render() {
    // TODO do not pass navigation
    return (
      <NewsFeed
        navigation={this.props.navigation}
        request={makeReadCommunityFeedRq(this.props.communityId)}
        ListHeaderComponent={emitAction => (
          <View>
            <NewsFeedConversation
              onPress={() =>
                this.props.navigation.navigate('PostEditorScreen', {
                  emitAction,
                })}
            />
            <PinnedPost
              communityId={this.props.communityId}
              onSeeAll={data => {
                this.props.navigation.navigate('PinnedPostsScreen', {
                  data,
                });
              }}
              onPress={data => {
                this.props.navigation.navigate('PostDetailScreen', {
                  postId: data.id,
                });
              }}
            />
          </View>
        )}
      />
    );
  }
}
