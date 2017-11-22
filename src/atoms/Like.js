// @flow

import React, { Component } from 'react';

import { Fetch, TouchableItem, Count } from '../atoms';
import { makeLikeRq, makeReadPostReq } from '../utils/requestFactory';
import type { Post, Comment, FetchProps } from '../Types';

type P = {
  count: number,
  item: Post | Comment,
  liked: boolean,
  emitAction: Function,
};

type State = {
  count: number,
  liked: boolean,
  updating: boolean,
};

export default class Like extends Component<P, State> {
  state = {
    count: this.props.count,
    liked: this.props.liked,
    updating: false,
  };

  componentWillReceiveProps(nextProps: P) {
    this.setState({
      count: nextProps.count,
      liked: nextProps.liked,
    });
  }

  onPress = (fetch: any): Function => async () => {
    this.setState({ updating: true });
    const { item } = this.props;
    const { liked } = this.state;
    const likeRq = makeLikeRq(item.id, liked);
    await fetch(likeRq.url, likeRq.options);
    const readPostReq = makeReadPostReq(item.id);
    const { data } = await fetch(readPostReq.url, readPostReq.options);
    this.props.emitAction && this.props.emitAction('update', data);
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
        {({ fetch }: FetchProps<*>) => (
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
