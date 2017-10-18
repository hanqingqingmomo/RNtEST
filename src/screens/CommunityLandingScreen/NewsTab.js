// @flow

import React, { Component } from 'react';

import CommunityNewsFeedScreen from '../CommunityNewsFeedScreen/CommunityNewsFeedScreen';

export default class NewsTab extends Component<{}> {
  static navigationOptions = {
    tabBarLabel: 'News',
  };

  render() {
    return (
      <CommunityNewsFeedScreen
        communityId={this.props.screenProps.communityId}
      />
    );
  }
}
