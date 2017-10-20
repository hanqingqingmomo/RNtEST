// @flow

import React, { Component } from 'react';

import { View } from '../../atoms';
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
        communityId={this.props.communityId}
        navigateToPost={this.props.navigateToPost}
      />
    );
  }
}
