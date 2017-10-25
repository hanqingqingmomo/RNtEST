// @flow

import React, { Component } from 'react';

import { NewsFeed } from '../blocks';
import { makeReadPinnedItemsRq } from '../utils/requestFactory';

type P = {
  navigation: any,
};

type S = {
  isBeingDeleted: boolean,
  isBeingUpdated: boolean,
};

export default class PinnedPostsScreen extends Component<P, S> {
  static navigationOptions = {
    title: 'Pinned Posts',
  };

  state = {
    isBeingDeleted: false,
    isBeingUpdated: false,
  };

  render() {
    // TODO do not pass navigation
    return (
      <NewsFeed
        style={{ marginTop: 10 }}
        navigation={this.props.navigation}
        request={makeReadPinnedItemsRq(
          this.props.navigation.state.params.communityId
        )}
      />
    );
  }
}
