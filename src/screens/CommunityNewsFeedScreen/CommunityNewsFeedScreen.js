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
  reloadCommunity: Function,
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
          </View>
        )}
      />
    );
  }
}
