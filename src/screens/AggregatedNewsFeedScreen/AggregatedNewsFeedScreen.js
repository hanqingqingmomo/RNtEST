// @flow

import React, { Component } from 'react';

import { View } from '../../atoms';
import { NewsFeed } from '../../blocks';
import FriendInvitationWidget from './FriendInvitationWidget';
import NewsFeedHeader from './NewsFeedHeader';
import NewsFeedConversation from './NewsFeedConversation';
import { makeReadAggregatedFeedReq } from '../../utils/requestFactory';

export default class AggregatedNewsFeedScreen extends Component<{}> {
  static navigationOptions = ({ screenProps }) => {
    return {
      headerLeft: <NewsFeedHeader openDrawer={screenProps.openDrawer} />,
      title: 'News Feed',
    };
  };

  render(): React$Node {
    return (
      <NewsFeed
        request={makeReadAggregatedFeedReq()}
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
            <FriendInvitationWidget
              openModal={this.props.screenProps.openFriendsInitationModal}
            />
          </View>
        }
      />
    );
  }
}
