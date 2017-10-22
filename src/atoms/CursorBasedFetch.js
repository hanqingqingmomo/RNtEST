// @flow

import React, { Component } from 'react';

import { Fetch } from './index';

type State = {
  cursor: ?{
    next: ?number,
    limit: ?number,
  },
  nextCursor: ?{
    next: ?number,
    limit: ?number,
  },
  data: ?Array<any>,
  pinnedPost: any,
  batch: number,
};

export default class CursorBaseFetch extends Component<{}, State> {
  state = {
    tmp_remove: 1,
    cursor: null,
    nextCursor: null,
    data: null,
    pinnedPost: null,
    batch: 0,
  };

  onChange = (fetchProps: *) => {
    this.setState({ loading: fetchProps.loading });
  };

  onDataChange = (fetchProps: *) => {
    // TODO reevaluate later
    const { data = [], meta } = fetchProps;
    const pinnedPostIdx = data.findIndex(item => item.pinned);

    this.setState(state => ({
      pinnedPost: pinnedPostIdx > -1 ? data[pinnedPostIdx] : state.pinnedPost,
      data: data,
      nextCursor: meta.cursor,
      batch: state.batch + 1,
    }));
  };

  render() {
    const urlWithCursor = this.state.cursor
      ? `${this.props.url}?cursor=${this.state.cursor.next}&tmp-random=${this
          .state.tmp_remove}`
      : `${this.props.url}?tmp-random=${this.state.tmp_remove}`;

    return (
      <Fetch
        {...this.props}
        url={urlWithCursor}
        onDataChange={this.onDataChange}
        onChange={this.onChange}
      >
        {this.props.children({
          tmpRandom: this.state.tmp_remove,
          pinnedPost: this.state.pinnedPost,
          loading: this.state.loading,
          data: this.state.data,
          batch: this.state.batch,
          refetch: () => {
            this.setState({ tmp_remove: Math.random() });
          },
          requestNextBatch: () => {
            if (this.state.nextCursor.next) {
              this.setState({ cursor: this.state.nextCursor });
            }
          },
        })}
      </Fetch>
    );
  }
}
