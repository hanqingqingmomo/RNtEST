// @flow

import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import {
  ActivityIndicator,
  CenterView,
  CursorBasedFetech,
  ShadowView,
  View,
} from '../../atoms';
import { NewsFeedItem } from '../../blocks';
import FriendInvitationWidget from './FriendInvitationWidget';
import NewsFeedHeader from './NewsFeedHeader';
import NewsFeedConversation from './NewsFeedConversation';
import { makeReadAggregatedFeedRq } from '../../utils/requestFactory';

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
        <NewsFeedItem {...item} navigation={this.props.navigation} />
      </View>
    );
  };

  render() {
    const { url, options } = makeReadAggregatedFeedRq();

    return (
      <CursorBasedFetech url={url} options={options}>
        {({ data, loading, batch, requestNextBatch }) => {
          return data === null ? (
            <CenterView>
              <ActivityIndicator />
            </CenterView>
          ) : (
            <View style={{ flex: 1 }}>
              <NewsFeedConversation
                onPress={() =>
                  this.props.navigation.navigate('PostEditorScreen')}
              />
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
      </CursorBasedFetech>
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
