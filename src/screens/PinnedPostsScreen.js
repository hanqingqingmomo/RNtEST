// @flow

import React, { Component } from 'react';

import { Screen } from '../atoms';
import NewsFeedList from '../blocks/NewsFeedItem/NewsFeedList';

type Props = {
  navigation: any,
};

export default class PinnedPostsScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Pinned Posts',
  };

  render() {
    return (
      <Screen>
        <NewsFeedList
          data={this.props.navigation.state.params.data}
          navigation={this.props.navigation}
        />
      </Screen>
    );
  }
}
