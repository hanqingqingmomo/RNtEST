// @flow

import React, { Component } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';

import {
  ActivityIndicator,
  Button,
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
import { getColor } from '../../utils/color';

function NavigatorHeader(props) {
  return (
    <ShadowView radius={0} style={{ paddingTop: 20, backgroundColor: 'white' }}>
      <NewsFeedHeader openDrawer={props.screenProps.openDrawer} />
    </ShadowView>
  );
}

function Footer(props) {
  if (props.hidden === true) {
    return null;
  }

  return (
    <View
      style={{
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {props.refreshing ? (
        <CenterView>
          <ActivityIndicator />
        </CenterView>
      ) : (
        <Button
          title="Load more"
          size="xs"
          color={getColor('orange')}
          textColor="white"
          onPress={props.onPress}
          disabled={props.moreAvailable === false}
        />
      )}
    </View>
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
        {({
          data,
          loading,
          requestNext,
          refetch,
          endReached,
          refresh,
          firstLoad,
        }) => {
          return (
            <FlatList
              data={data}
              keyExtractor={this.keyExtractor}
              renderItem={({ item }) => this.renderItem({ item, refetch })}
              refreshControl={
                <RefreshControl refreshing={firstLoad} onRefresh={refresh} />
              }
              ListHeaderComponent={
                <View style={{ marginBottom: 10 }}>
                  <NewsFeedConversation
                    onPress={() =>
                      this.props.navigation.navigate('PostEditorScreen')}
                  />
                  <FriendInvitationWidget
                    openModal={this.props.screenProps.openFriendsInitationModal}
                  />
                </View>
              }
              ListFooterComponent={
                <Footer
                  hidden={data === null}
                  moreAvailable={endReached === false}
                  refreshing={loading && firstLoad === false}
                  onPress={requestNext}
                />
              }
              eonEndReached={requestNext}
            />
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
  text: {
    textAlign: 'center',
    fontWeight: '500',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
