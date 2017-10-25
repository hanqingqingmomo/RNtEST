// @flow

import React, { Component } from 'react';
import { StyleSheet, RefreshControl, InteractionManager } from 'react-native';
import mitt from 'mitt';

import { View } from '../../atoms';
import NewsFeedList from '../../blocks/NewsFeedItem/NewsFeedList';
import NewsFeedItem from '../../blocks/NewsFeedItem/NewsFeedItem';
import { type Request } from '../../utils/requestFactory';
import Footer from './Footer';
import { type Post } from '../../Types';
import {
  type ItemActionHandler,
  type ItemActionEmitter,
} from '../NewsFeedItem/NewsFeedItem';

type Cursor = {
  next: ?number,
  limit: number,
};

type FetchResponse = {
  error: ?Object,
  data: ?Array<Post>,
  cursor: ?Cursor,
};

type Props = {
  request: Request,
  ListHeaderComponent: React$Node,
  navigation: any,
};

type State = {
  appendingData: boolean,
  cursor: Cursor,
  data: ?Array<Post>,
  error: ?Object,
  refreshingData: boolean,
};

async function doFetch(request, _cursor: Cursor): Promise<FetchResponse> {
  const url = `${request.url}?limit=${_cursor.limit}${_cursor.next
    ? `&next=${_cursor.next}`
    : ''}`;

  const response = {
    error: null,
    data: null,
    cursor: null,
  };

  try {
    const res = await global.fetch(url, request.options);
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
        this.setState(state => ({
          data: state.data.filter(i => i.id !== item.id),
        }));
        break;
      case 'update':
        this.setState(state => ({
          data: state.data.map(i => (i.id === item.id ? item : i)),
        }));
        break;
      case 'create':
        this.setState(state => ({
          data: [item].concat(state.data),
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
      data: (state.data || []).concat(res.data),
      appendingData: false,
    }));
  };

  renderItem = ({ item }: { item: Post }) => (
    <NewsFeedItem
      item={item}
      navigation={this.props.navigation}
      emitAction={this.emitAction}
    />
  );

  render() {
    return (
      <NewsFeedList
        data={this.state.data || []}
        renderItem={this.renderItem}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshingData}
            onRefresh={this.fetchFreshData}
          />
        }
        ListHeaderComponent={
          <View style={styles.ListHeaderComponent}>
            {this.props.ListHeaderComponent}
          </View>
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
