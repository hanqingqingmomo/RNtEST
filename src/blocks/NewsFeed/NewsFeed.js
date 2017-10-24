// @flow

import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  RefreshControl,
  InteractionManager,
} from 'react-native';

import { View } from '../../atoms';
import { NewsFeedItem } from '../../blocks';
import Footer from './Footer';
import { type Request } from '../../utils/requestFactory';
import { type Post } from '../../Types';

type Cursor = {
  next: ?number,
  limit: number,
};

type FetchResponse = {
  error: ?Object,
  data: ?Array<*>,
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
  data: ?Array<*>,
  error: ?Object,
  refreshingData: boolean,
  isBeingDeleted: boolean,
  isBeingUpdated: boolean,
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
  state = {
    appendingData: false,
    cursor: {
      next: null,
      limit: 7,
    },
    data: null,
    error: null,
    refreshingData: false,
    isBeingDeleted: false,
    isBeingUpdated: false,
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.fetchFreshData);
  }

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

  keyExtractor = (item: Post) => item.id;

  requestDelete = (item: Post) => {
    this.setState({ isBeingDeleted: true });
    // TODO
    console.log('request delete', item);
  };

  deleteSuccessful = (item: Post) => {
    this.setState({ isBeingDeleted: false });
    // TODO
    console.log('delete successful', item);
  };

  requestUpdate = (item: Post) => {
    this.setState({ isBeingUpdated: true });
    // TODO
    console.log('request update', item);
  };

  updateSuccessful = (item: Post) => {
    this.setState({ isBeingUpdated: false });
    // TODO
    console.log('update successful', item);
  };

  renderItem = ({ item }: { item: Post }): React$Element<*> => {
    return (
      <View style={styles.item}>
        <NewsFeedItem
          isBeingDeleted={this.state.isBeingDeleted}
          isBeingUpdated={this.state.isBeingUpdated}
          item={item}
          navigation={this.props.navigation}
          requestDelete={this.requestDelete}
          requestUpdate={this.requestUpdate}
          deleteSuccessful={this.deleteSuccessful}
          updateSuccessful={this.updateSuccessful}
        />
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={this.keyExtractor}
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
          <Footer
            disabled={this.state.cursor.next === null}
            loading={this.state.appendingData}
            onRequestMoreData={this.fetchNextData}
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  ListHeaderComponent: {
    marginBottom: 10,
  },
  item: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
