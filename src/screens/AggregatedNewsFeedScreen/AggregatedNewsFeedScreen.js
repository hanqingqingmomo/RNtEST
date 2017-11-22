// @flow

import React, { Component } from 'react';

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

  render(): React$Node {
    // TODO do not pass navigation
    return (
      <NewsFeed
        id="content_objects/feed"
        path="content_objects/feed"
        navigation={this.props.navigation}
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
