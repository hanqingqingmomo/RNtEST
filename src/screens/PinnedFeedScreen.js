// @flow

import React, { Component } from 'react';

import { View } from '../atoms';
import { NewsFeed } from '../blocks';
import { css } from '../utils/style';

type Props = {
  navigation: any,
};

export default class PinnedFeedScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Pinned Posts',
  };

  navigateToCommunity = (community: *) => {
    this.props.navigation.navigate('CommunityTab:CommunityScreen', {
      communityId: community.id,
    });
  };

  navigateToPostDetail = (post: *) => {
    this.props.navigation.navigate('CommunityTab:PostScreen', {
      postId: post.id,
    });
  };

  navigateToMemberProfile = (user: *) => {
    this.props.navigation.navigate('CommunityTab:MemberProfileScreen', {
      user,
    });
  };

  render() {
    const { communityId } = this.props.navigation.state.params;
    return (
      <View style={css('marginTop', 10)}>
        <NewsFeed
          id={`pinned:${communityId}`}
          path={`content_objects/posts/${communityId}?pinned_only=true`}
          style={css('marginTop', 10)}
          navigateToCommunity={this.navigateToCommunity}
          navigateToPostDetail={this.navigateToPostDetail}
          navigateToMemberProfile={this.navigateToMemberProfile}
        />
      </View>
    );
  }
}
