// @flow

import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import {
  CenterView,
  ActivityIndicator,
  Fetch,
  View,
  ShadowView,
} from '../../atoms';
import { NewsFeedItem } from '../../blocks';
import FriendInvitationWidget from './FriendInvitationWidget';
import NewsFeedHeader from './NewsFeedHeader';
import NewsFeedConversation from './NewsFeedConversation';
import { getAggegatedFeedRq } from '../../utils/requestFactory';

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

class CursorBaseFetch extends Component<{}, State> {
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

function NavigatorHeader(props) {
  return (
    <ShadowView radius={0} style={{ paddingTop: 20, backgroundColor: 'white' }}>
      <NewsFeedHeader openDrawer={props.screenProps.openDrawer} />
    </ShadowView>
  );
}

export default class AggregatedNewsFeedScreen extends Component<{}> {
  static navigationOptions = {
    header: NavigatorHeader,
  };

  keyExtractor = item => {
    return item.id.toString() + Math.random();
  };

  renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <NewsFeedItem {...item} />
      </View>
    );
  };

  render() {
    const { url, options } = getAggegatedFeedRq();
    console.log(url, options);

    return (
      <CursorBaseFetch url={url} options={options}>
        {({ data, loading, batch, requestNextBatch }) => {
          return data === null ? (
            <CenterView>
              <ActivityIndicator />
            </CenterView>
          ) : (
            <View style={{ flex: 1 }}>
              <NewsFeedConversation />
              <View style={styles.itemsContainer}>
                <FlatList
                  key="list"
                  ListHeaderComponent={
                    <FriendInvitationWidget
                      openModal={
                        this.props.screenProps.openFriendsInitationModal
                      }
                    />
                  }
                  data={data}
                  renderItem={this.renderItem}
                  keyExtractor={this.keyExtractor}
                  onEndReached={requestNextBatch}
                />
              </View>
              {loading ? (
                <CenterView style={{ height: 50, flexGrow: 0 }}>
                  <ActivityIndicator />
                </CenterView>
              ) : null}
            </View>
          );
        }}
      </CursorBaseFetch>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingBottom: 10,
  },
  itemsContainer: {
    flex: 1,
    height: '100%',
    padding: 10,
    paddingBottom: 0,
  },
});
