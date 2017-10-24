// @flow

import React, { Component } from 'react';

import { Fetch, TouchableItem, Count } from '../atoms';
import { makeLikeRq } from '../utils/requestFactory';

type P = {
  count: number,
  liked: boolean,
  objectId: string,
  requestUpdate: Function,
  isBeingUpdated: boolean,
};

export default class Like extends Component<P> {
  onPress = (fetch: any): Function => async () => {
    const { objectId, liked, requestUpdate } = this.props;

    const likeRq = makeLikeRq(objectId, liked);

    await fetch(likeRq.url, likeRq.options);

    requestUpdate();
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
