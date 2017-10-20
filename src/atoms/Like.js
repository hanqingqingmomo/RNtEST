// @flow

import React, { Component } from 'react';

import { Fetch, TouchableItem, Count } from '../atoms';
import { makeLikeRq, makeReadPostReq } from '../utils/requestFactory';

type P = {
  count: number,
  liked: boolean,
  iconName: string,
  objectId: string,
  disableLink: boolean,
};

export default class Like extends Component<P> {
  state = {
    liked: this.props.liked,
    count: this.props.count,
  };

  onPress = (fetch: any) => async () => {
    const { objectId } = this.props;
    const likeRq = makeLikeRq(objectId, this.state.liked);
    await fetch(likeRq.url, likeRq.options);

    const readPostReq = makeReadPostReq(objectId);
    const { data } = await fetch(readPostReq.url, readPostReq.options);

    this.setState({ liked: data.liked, count: data.likes_count });
  };

  render() {
    const { iconName, count, disableLink } = this.props;

    return disableLink ? (
      <Count
        iconName={iconName}
        count={this.state.count}
        pined={this.state.liked}
      />
    ) : (
      <Fetch manual>
        {({ loading, data, error, fetch }) => (
          <TouchableItem onPress={this.onPress(fetch)}>
            <Count
              iconName={iconName}
              count={this.state.count}
              pined={this.state.liked}
            />
          </TouchableItem>
        )}
      </Fetch>
    );
  }
}
