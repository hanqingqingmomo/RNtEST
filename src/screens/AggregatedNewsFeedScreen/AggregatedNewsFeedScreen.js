// @flow

import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';

import { View } from '../../atoms';
import { NewsFeed } from '../../blocks';
import FriendInvitationWidget from './FriendInvitationWidget';
import FeedNavigationHeader from './FeedNavigationHeader';
import StartConversationButton from './StartConversationButton';
import type { Post, User } from '../../Types';

export default class AggregatedNewsFeedScreen extends Component<{}> {
  static navigationOptions = ({ screenProps }) => ({
    headerLeft: <FeedNavigationHeader openDrawer={screenProps.openDrawer} />,
    title: 'News Feed',
  });

  navigateToCommunity = (community: *) => {
    const action = NavigationActions.navigate({
      routeName: 'CommunityTab',
      action: NavigationActions.navigate({
        routeName: 'CommunityTab:CommunityScreen',
        params: { communityId: community.id },
      }),
    });

    this.props.navigation.dispatch(action);
  };

  navigateToPostDetail = (post: Post) => {
    this.props.navigation.navigate('GlobalFeedTab:PostScreen', {
      postId: post.id,
    });
  };

  navigateToMemberProfile = (user: User) => {
    this.props.navigation.navigate('GlobalFeedTab:MemberProfileScreen', {
      user,
    });
  };

  render(): React$Node {
    return (
      <NewsFeed
        id="content_objects/feed"
        path="content_objects/feed"
        navigateToCommunity={this.navigateToCommunity}
        navigateToPostDetail={this.navigateToPostDetail}
        navigateToMemberProfile={this.navigateToMemberProfile}
        ListHeaderComponent={
          <View>
            <StartConversationButton
              navigateToEditorScreen={() =>
                this.props.navigation.navigate(
                  'GlobalFeedTab:PostEditorScreen'
                )}
            />
            <FriendInvitationWidget
              openModal={this.props.screenProps.openFriendsInvitationModal}
            />
          </View>
        }
      />
    );
  }
}
