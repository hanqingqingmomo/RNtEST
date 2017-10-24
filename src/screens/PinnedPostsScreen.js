// @flow

import React, { Component } from 'react';

import { Screen } from '../atoms';
import { type Post } from '../Types';
import NewsFeedList from '../blocks/NewsFeedItem/NewsFeedList';

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

  requestDelete = (item: Post) => {
    this.setState({ isBeingDeleted: true });
    // TODO
    console.log('request delete', item);
  };

  deleteSuccessful = (item: Post) => {
    this.setState({ isBeingDeleted: false });
    // TODO
    console.log('delete successful', item);
  };

  requestUpdate = (item: Post) => {
    this.setState({ isBeingUpdated: true });
    // TODO
    console.log('request update', item);
  };

  updateSuccessful = (item: Post) => {
    this.setState({ isBeingUpdated: false });
    // TODO
    console.log('update successful', item);
  };

  render() {
    const { isBeingDeleted, isBeingUpdated } = this.state;

    return (
      <Screen>
        <NewsFeedList
          data={this.props.navigation.state.params.data}
          navigation={this.props.navigation}
          isBeingDeleted={isBeingDeleted}
          isBeingUpdated={isBeingUpdated}
          requestDelete={this.requestDelete}
          requestUpdate={this.requestUpdate}
          deleteSuccessful={this.deleteSuccessful}
          updateSuccessful={this.updateSuccessful}
        />
      </Screen>
    );
  }
}
