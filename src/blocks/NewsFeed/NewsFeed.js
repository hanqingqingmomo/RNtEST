// @flow

import React, { Component } from 'react';
import { StyleSheet, RefreshControl, InteractionManager } from 'react-native';
import mitt from 'mitt';
import parse from 'url-parse';
import qs from 'query-string';

import { View } from '../../atoms';
import NewsFeedList from '../../blocks/NewsFeedItem/NewsFeedList';

import { type Request } from '../../utils/requestFactory';
import Footer from './Footer';
import type { Post, ScreenProps } from '../../Types';
import {
  type ItemActionHandler,
  type ItemActionEmitter,
} from '../NewsFeedItem/NewsFeedItem';
import { makeReadPostReq } from '../../utils/requestFactory';

type Cursor = {
  next: ?number,
  limit: number,
};

type FetchResponse = {
  cursor: Cursor,
  data: ?Array<Post>,
  error: ?Object,
};

type Props = ScreenProps<*> & {
  request: Request,
  ListHeaderComponent?: ItemActionEmitter => React$Node,
};

type State = {
  appendingData: boolean,
  cursor: Cursor,
  data: ?Array<Post>,
  error: ?Object,
  refreshingData: boolean,
};

async function doFetch(request, _cursor: Cursor): Promise<FetchResponse> {
  const location = parse(request.url);
  const query = qs.parse(location.query);
  query.limit = _cursor.limit;
  query.next = _cursor.next;

  location.query = `?${qs.stringify(query)}`;

  const response = {
    error: null,
    data: null,
    cursor: null,
  };

  try {
    const res = await global.fetch(location.toString(), request.options);
    const json = await res.json();
    response.data = json.data;
    response.cursor = json.meta.cursor;
  } catch (err) {
    response.error = err;
  } finally {
    return response;
  }
}

export default class NewsFeed extends Component<Props, State> {
  emitter = mitt();

  state = {
    appendingData: false,
    cursor: {
      next: null,
      limit: 25,
    },
    data: null,
    error: null,
    refreshingData: false,
  };

  componentDidMount() {
    this.emitter.on('itemAction', this.handleItemAction);

    InteractionManager.runAfterInteractions(this.fetchFreshData);
  }

  keyExtractor = (item: Post) => item.id;

  emitAction: ItemActionEmitter = (action, item) => {
    this.emitter.emit('itemAction', { action, item });
  };

  handleItemAction: ItemActionHandler = ({ action, item }) => {
    switch (action) {
      case 'delete':
        if (item) {
          this.setState(state => ({
            data: (state.data || []).filter(i => i.id !== item.id),
          }));
        }
        break;
      case 'update':
        if (item) {
          this.setState(state => ({
            data: (state.data || []).map(i => (i.id === item.id ? item : i)),
          }));
        }
        break;
      case 'create':
        this.setState(state => ({
          data: [item, ...(state.data || [])],
        }));
        break;
      case 'report':
      default:
        // noop
        break;
    }
  };

  fetchFreshData = async () => {
    this.setState({ refreshingData: true });
    const res = await doFetch(this.props.request, {
      next: null,
      limit: this.state.cursor.limit,
    });
    this.setState({
      ...res,
      refreshingData: false,
    });
  };

  fetchNextData = async () => {
    this.setState({ appendingData: true });
    const res = await doFetch(this.props.request, this.state.cursor);
    this.setState(state => ({
      ...res,
      data: (state.data || []).concat(res.data || []),
      appendingData: false,
    }));
  };

  deleteItem = (item: Post) => {
    this.emitAction('delete', item);
  };

  updateItem = async (item: Post, deleting: boolean) => {
    if (deleting) {
      this.deleteItem(item);
      return;
    }

    const req = makeReadPostReq(item.id);
    const res = await global.fetch(req.url, req.options);
    const json = await res.json();
    this.emitAction('update', json);
  };

  render() {
    return (
      <NewsFeedList
        {...this.props}
        deleteItem={this.deleteItem}
        updateItem={this.updateItem}
        data={this.state.data || []}
        renderItemProps={{
          navigation: this.props.navigation,
          emitAction: this.emitAction,
        }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshingData}
            onRefresh={this.fetchFreshData}
          />
        }
        ListHeaderComponent={
          this.props.ListHeaderComponent && (
            <View style={styles.ListHeaderComponent}>
              {this.props.ListHeaderComponent(this.emitAction)}
            </View>
          )
        }
        ListFooterComponent={
          <View style={styles.ListFooterComponent}>
            <Footer
              disabled={this.state.cursor.next === null}
              loading={this.state.appendingData}
              onRequestMoreData={this.fetchNextData}
            />
          </View>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  ListHeaderComponent: {
    marginBottom: 10,
  },
  ListFooterComponent: {
    marginTop: 10,
  },
});
