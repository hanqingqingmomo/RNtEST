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
<<<<<<< HEAD
  ListHeaderComponent: React$Node,
  navigation: any,
=======
  ListHeaderComponent?: React$Node,
>>>>>>> c63b82f117e91703a645d14f1f273dcb9af8624b
};

type State = {
  appendingData: boolean,
  cursor: Cursor,
  data: ?Array<*>,
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
  state = {
    appendingData: false,
    cursor: {
      next: null,
      limit: 7,
    },
    data: null,
    error: null,
    refreshingData: false,
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

  keyExtractor = (item: any) => item.id;

  requestDelete = (item: *) => {
    console.log('delete', item);
  };

  requestUpdate = (item: *) => {
    console.log('update', item);
  };

  renderItem = ({ item, refetch }: any): React$Element<*> => {
    return (
      <View style={styles.item}>
        <NewsFeedItem
          isBeingDeleted={true}
          isBeingUpdated={true}
          item={item}
          navigation={this.props.navigation}
          onDelete={refetch}
          refetch={refetch}
          requestDelete={this.requestDelete}
          requestUpdate={this.requestUpdate}
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
