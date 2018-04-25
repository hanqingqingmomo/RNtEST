// @flow

import React, { Component } from 'react';

import { View } from '../atoms';
import { NewsFeed, PinnedPost } from '../blocks';
import StartConversationButton from './AggregatedNewsFeedScreen/StartConversationButton';
import type { Community, CommunitySimple, Post, User } from '../Types';

type Props = {
  communityId: string,
  navigation: any,
  disableRefreshControl?: boolean,
};

export default class CommunityFeedScreen extends Component<Props> {
  navigateToCommunity = (community: Community | CommunitySimple) => {
    this.props.navigation.navigate('CommunityTab:CommunityScreen', {
      communityId: community.id,
    });
  };

  navigateToPostDetail = (post: Post) => {
    this.props.navigation.navigate('CommunityTab:PostScreen', {
      postId: post.id,
    });
  };

  navigateToMemberProfile = (user: User) => {
    this.props.navigation.navigate('CommunityTab:MemberProfileScreen', {
      user,
    });
  };

  render() {
    return (
      <NewsFeed
        id={this.props.communityId}
        path={`content_objects/posts/${this.props.communityId}`}
        navigateToCommunity={this.navigateToCommunity}
        navigateToPostDetail={this.navigateToPostDetail}
        navigateToMemberProfile={this.navigateToMemberProfile}
        disableRefreshControl={this.props.disableRefreshControl}
        ListHeaderComponent={
          <View>
            <StartConversationButton
              navigateToEditorScreen={() =>
                this.props.navigation.navigate(
                  'CommunityTab:PostEditorScreen',
                  {
                    preselectedCommunityId: this.props.communityId,
                  }
                )}
            />
            <PinnedPost
              communityId={this.props.communityId}
              onPress={data =>
                this.props.navigation.navigate('PostScreen', {
                  postId: data.id,
                })}
              navigateToPinnedFeed={() => {
                this.props.navigation.navigate(
                  'CommunityTab:PinnedFeedScreen',
                  {
                    communityId: this.props.communityId,
                  }
                );
              }}
            />
          </View>
        }
      />
    );
  }
}
