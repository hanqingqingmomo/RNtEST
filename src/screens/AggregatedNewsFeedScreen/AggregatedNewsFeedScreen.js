// @flow

import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import {
  ActivityIndicator,
  CenterView,
  CursorBasedFetech,
  ShadowView,
  Screen,
  Text,
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

  renderItem = ({ item, refetch }: any): React$Element<*> => {
    return (
      <View style={styles.item}>
        <NewsFeedItem
          {...item}
          navigation={this.props.navigation}
          refetch={refetch}
          onDelete={refetch}
        />
      </View>
    );
  };

  render() {
    const { url, options } = makeReadAggregatedFeedRq();

    return (
      <CursorBasedFetech url={url} options={options}>
        {({ data, loading, batch, requestNextBatch, refetch }) => {
          if (loading) {
            return (
              <CenterView>
                <ActivityIndicator />
              </CenterView>
            );
          }

          return (
            <Screen fill>
              <NewsFeedConversation
                onPress={() =>
                  this.props.navigation.navigate('PostEditorScreen')}
              />
              {data && data.length > 0 ? (
                <View style={styles.itemsContainer}>
                  <FlatList
                    ListHeaderComponent={
                      <FriendInvitationWidget
                        openModal={
                          this.props.screenProps.openFriendsInitationModal
                        }
                      />
                    }
                    data={data}
                    renderItem={({ item }) =>
                      this.renderItem({ item, refetch })}
                    keyExtractor={this.keyExtractor}
                    onEndReached={requestNextBatch}
                  />
                </View>
              ) : (
                <View style={styles.textContainer}>
                  <Text style={styles.text}>There is no content.</Text>
                </View>
              )}
            </Screen>
          );
        }}
      </CursorBasedFetech>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  itemsContainer: {
    paddingTop: 10,
    flex: 1,
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
