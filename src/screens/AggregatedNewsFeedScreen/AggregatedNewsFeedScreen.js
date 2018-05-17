// @flow

import React, { Component } from 'react';
import {
  NavigationActions,
  type NavigationScreenConfigProps,
} from 'react-navigation';

import { View } from '../../atoms';
import { NewsFeed } from '../../blocks';
import FriendInvitationWidget from './FriendInvitationWidget';
import FeedNavigationHeader from './FeedNavigationHeader';
import StartConversationButton from './StartConversationButton';
import type { Post, User } from '../../Types';

type Props = NavigationScreenConfigProps;

export default class AggregatedNewsFeedScreen extends Component<Props> {
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
    if (post.type === 'post') {
      this.props.navigation.navigate('GlobalFeedTab:PostScreen', {
        postId: post.id,
      });
    } else if (post.type === 'event') {
      this.props.navigation.navigate('EventTab:EventDetailScreen', {
        event_id: post.event.id,
      });
    }
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
