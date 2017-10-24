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
    return (
      <NewsFeed
        request={makeReadCommunityFeedRq(this.props.communityId)}
        ListHeaderComponent={
          <View>
            <NewsFeedConversation
              onPress={() =>
                this.props.navigation.navigate('PostEditorScreen', {
                  onCreate: post => {
                    console.log('on create');
                  },
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
                  reloadList: this.props.reloadCommunity,
                });
              }}
            />
          </View>
        }
      />
    );
  }
}
