// @flow

import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';

import { View } from '../../atoms';
import { NewsFeed } from '../../blocks';
import FriendInvitationWidget from './FriendInvitationWidget';
import FeedNavigationHeader from './FeedNavigationHeader';
import StartConversationButton from './StartConversationButton';

export default class AggregatedNewsFeedScreen extends Component<{}> {
  static navigationOptions = ({ screenProps }) => ({
    headerLeft: <FeedNavigationHeader openDrawer={screenProps.openDrawer} />,
    title: 'News Feed',
  });

  navigateToCommunity = (community: *) => {
    const action = NavigationActions.navigate({
      routeName: 'CommunitiesTab',
      action: NavigationActions.navigate({
        routeName: 'CommunityCenterScreen',
        params: { communityId: community.id },
      }),
    });

    this.props.navigation.dispatch(action);
  };

  navigateToDetail = (detail: *) => {
    console.log('detail', detail);
  };

  render(): React$Node {
    return (
      <NewsFeed
        id="content_objects/feed"
        path="content_objects/feed"
        navigateToCommunity={this.navigateToCommunity}
        navigateToDetail={this.navigateToDetail}
        ListHeaderComponent={
          <View>
            <StartConversationButton
              navigateToEditorScreen={() =>
                this.props.navigation.navigate('PostEditorScreen')}
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
