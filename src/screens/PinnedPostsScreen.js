// @flow

import React, { Component } from 'react';

import { NewsFeed } from '../blocks';

type Props = {
  navigation: any,
};

export default class PinnedPostsScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Pinned Posts',
  };

  render() {
    // TODO do not pass navigation
    const { communityId } = this.props.navigation.state.params;
    return (
      <NewsFeed
        id={`pinned:${communityId}`}
        path={`content_objects/posts/${communityId}?pinned_only=true`}
        style={{ marginTop: 10 }}
        navigation={this.props.navigation}
      />
    );
  }
}
