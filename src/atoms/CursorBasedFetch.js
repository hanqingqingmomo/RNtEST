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
  batch: number,
};

export default class CursorBaseFetch extends Component<{}, State> {
  state = {
    cursor: null,
    nextCursor: null,
    data: null,
    batch: 0,
  };

  onChange = (fetchProps: *) => {
    this.setState({ loading: fetchProps.loading });
  };

  onDataChange = (fetchProps: *) => {
    const { data, meta } = fetchProps;

    this.setState(state => ({
      nextCursor: meta.cursor,
      batch: state.batch + 1,
      data: (state.data || []).concat(data),
    }));
  };

  render() {
    const urlWithCursor = this.state.cursor
      ? `${this.props.url}?cursor=${this.state.cursor.next}`
      : this.props.url;

    console.log(urlWithCursor);
    return (
      <Fetch
        {...this.props}
        url={urlWithCursor}
        onDataChange={this.onDataChange}
        onChange={this.onChange}
      >
        {this.props.children({
          loading: this.state.loading,
          data: this.state.data,
          batch: this.state.batch,
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
