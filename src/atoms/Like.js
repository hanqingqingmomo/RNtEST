// @flow

import React, { Component } from 'react';

import { Fetch, TouchableItem, Count } from '../atoms';
import { makeLikeRq, makeReadPostReq } from '../utils/requestFactory';
import type { Post, Comment } from '../Types';

type P = {
  count: number,
  liked: boolean,
  item: Post | Comment,
};

type State = {
  isBeingUpdated: boolean,
};

export default class Like extends Component<P, State> {
  state = {
    isBeingUpdated: false,
  };

  onPress = (fetch: any): Function => async () => {
    this.setState({ isBeingUpdated: true });
    const { item, liked } = this.props;
    const likeRq = makeLikeRq(item.id, liked);
    await fetch(likeRq.url, likeRq.options);
    const readPostReq = makeReadPostReq(item.id);
    const readPostRes = await fetch(readPostReq.url, readPostReq.options);
    this.props.emitAction('update', readPostRes.data);
    this.setState({ isBeingUpdated: false });
  };

  render() {
    const { liked, count } = this.props;
    return (
      <Fetch manual>
        {({ fetch }) => (
          <TouchableItem
            onPress={this.onPress(fetch)}
            disabled={this.state.isBeingUpdated}
          >
            <Count iconName="like" count={count} pinned={liked} />
          </TouchableItem>
        )}
      </Fetch>
    );
  }
}
