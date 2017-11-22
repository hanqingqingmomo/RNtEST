// @flow

import React, { Component } from 'react';

import { View } from '../../atoms';
import { NewsFeed } from '../../blocks';
import type { ScreenProps } from '../../Types';
import FriendInvitationWidget from './FriendInvitationWidget';
import NewsFeedHeader from './NewsFeedHeader';
import NewsFeedConversation from './NewsFeedConversation';
import { makeReadAggregatedFeedReq } from '../../utils/requestFactory';

type Props = ScreenProps<*> & {
  screenProps: Object,
};

export default class AggregatedNewsFeedScreen extends Component<Props> {
  static navigationOptions = ({ screenProps }) => {
    return {
      headerLeft: <NewsFeedHeader openDrawer={screenProps.openDrawer} />,
      title: 'News Feed',
    };
  };

  render(): React$Node {
    // TODO do not pass navigation
    return (
      <NewsFeed
        navigation={this.props.navigation}
        request={makeReadAggregatedFeedReq()}
        ListHeaderComponent={emitAction => (
          <View>
            <NewsFeedConversation
              onPress={() =>
                this.props.navigation.navigate('PostEditorScreen', {
                  emitAction,
                })}
            />
            <FriendInvitationWidget
              openModal={this.props.screenProps.openFriendsInvitationModal}
            />
          </View>
        )}
      />
    );
  }
}
