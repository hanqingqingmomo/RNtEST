// @flow

import React, { Component } from 'react';

import { Fetch } from './index';

type Cursor = {
  next: ?number,
  limit: number,
};

type FetchProps = {
  loading: boolean,
  data: *,
};

type Props = {
  url: string,
  children: ({
    loading: boolean,
    data: Array<*>,
    refetch: () => void,
    requestNext: () => void,
    endReached: boolean,
  }) => React$Node,
};

type State = {
  cursor: Cursor,
  data: ?Array<any>,
  loading?: boolean,
  nextCursor: Cursor,
};

const INITIAL_CURSOR = {
  next: null,
  limit: 25,
};

export default class CursorBaseFetch extends Component<Props, State> {
  state = {
    loading: undefined,
    cursor: INITIAL_CURSOR,
    nextCursor: INITIAL_CURSOR,
    data: null,
  };

  onChange = (fetchProps: FetchProps) => {
    this.setState({ loading: fetchProps.loading });
  };

  onDataChange = (fetchProps: *) => {
    // If we do not have cursor yet, we are starting from scratch
    const startingData = this.state.cursor.next === null ? [] : this.state.data;
    const { data, meta } = fetchProps;
    this.setState(state => ({
      data: startingData.concat(data),
      nextCursor: meta.cursor,
    }));
  };

  refetch = () => {
    console.log('refetch');
  };

  refresh = () => {
    this.setState({ cursor: INITIAL_CURSOR });
  };

  requestNext = () => {
    this.setState(state => ({
      cursor: state.nextCursor,
    }));
  };

  render() {
    const { next, limit } = this.state.cursor;

    const urlWithCursor =
      next !== null
        ? `${this.props.url}?next=${next}&limit=${limit}`
        : `${this.props.url}?limit=${limit}`;

    return (
      <Fetch
        {...this.props}
        url={urlWithCursor}
        onDataChange={this.onDataChange}
        onChange={this.onChange}
      >
        {this.props.children({
          loading: this.state.loading,
          firstLoad: this.state.loading === true && next === null,
          data: this.state.data,
          refetch: this.refetch,
          requestNext: this.requestNext,
          refresh: this.refresh,
          endReached: this.state.nextCursor.next === null,
        })}
      </Fetch>
    );
  }
}
