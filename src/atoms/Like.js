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
  updating: boolean,
};

export default class Like extends Component<P, State> {
  state = {
    updating: false,
    liked: this.props.liked,
    count: this.props.count,
  };

  onPress = (fetch: any): Function => async () => {
    this.setState({ updating: true });
    const { item } = this.props;
    const { liked } = this.state;
    const likeRq = makeLikeRq(item.id, liked);
    await fetch(likeRq.url, likeRq.options);
    const readPostReq = makeReadPostReq(item.id);
    const { data } = await fetch(readPostReq.url, readPostReq.options);
    // this.props.emitAction('update', data);
    this.setState({
      updating: false,
      liked: data.liked,
      count: data.likes_count,
    });
  };

  render() {
    const { liked, count } = this.state;
    return (
      <Fetch manual>
        {({ fetch }) => (
          <TouchableItem
            onPress={this.onPress(fetch)}
            disabled={this.state.updating}
          >
            <Count iconName="like" count={count} pinned={liked} />
          </TouchableItem>
        )}
      </Fetch>
    );
  }
}
