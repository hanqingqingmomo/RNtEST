// @flow

import React, { Component } from 'react';

import { Fetch, TouchableItem, Count } from '../atoms';
import { makeLikeRq } from '../utils/requestFactory';
import type { Post, Comment } from '../Types';

type P = {
  count: number,
  liked: boolean,
  item: Post | Comment,
  requestUpdate: Function,
  updateSuccessful: Function,
  isBeingUpdated: boolean,
};

export default class Like extends Component<P> {
  onPress = (fetch: any): Function => async () => {
    const { item, liked, requestUpdate, updateSuccessful } = this.props;

    const likeRq = makeLikeRq(item.id, liked);

    requestUpdate(item);

    await fetch(likeRq.url, likeRq.options);

    updateSuccessful(item);
  };

  render() {
    const { liked, count, isBeingUpdated } = this.props;

    return (
      <Fetch manual>
        {({ fetch }) => (
          <TouchableItem
            onPress={this.onPress(fetch)}
            disabled={isBeingUpdated}
          >
            <Count iconName="like" count={count} pinned={liked} />
          </TouchableItem>
        )}
      </Fetch>
    );
  }
}
