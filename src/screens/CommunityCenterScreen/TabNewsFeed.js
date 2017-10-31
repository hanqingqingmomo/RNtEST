// @flow

import React, { Component } from 'react';

import type { ScreenProps } from '../../Types';
import CommunityNewsFeedScreen from '../CommunityNewsFeedScreen/CommunityNewsFeedScreen';

type Props = ScreenProps<*> & {
  communityId: string,
  navigateToPost: Object => void,
  reloadCommunity: Function,
};

export default class TabNewsFeed extends Component<Props> {
  static navigationOptions = {
    tabBarLabel: 'News',
  };

  render() {
    return (
      <CommunityNewsFeedScreen
        navigation={this.props.navigation}
        communityId={this.props.communityId}
        navigateToPost={this.props.navigateToPost}
        reloadCommunity={this.props.reloadCommunity}
      />
    );
  }
}
