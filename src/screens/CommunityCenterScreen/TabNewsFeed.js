// @flow

import React, { Component } from 'react';

import CommunityNewsFeedScreen from '../CommunityNewsFeedScreen/CommunityNewsFeedScreen';

type Props = {
  communityId: string,
  navigateToPost: Object => void,
};

export default class NewsTab extends Component<Props> {
  static navigationOptions = {
    tabBarLabel: 'News',
  };

  render() {
    return (
      <CommunityNewsFeedScreen
        navigation={this.props.navigation}
        communityId={this.props.communityId}
        navigateToPost={this.props.navigateToPost}
      />
    );
  }
}
