// @flow

import React, { Component } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';

import {
  ActivityIndicator,
  Button,
  CenterView,
  CursorBasedFetech,
  View,
} from '../../atoms';
import { NewsFeedItem, PinnedPost } from '../../blocks';
import NewsFeedConversation from './../AggregatedNewsFeedScreen/NewsFeedConversation';
import { makeReadCommunityFeedRq } from '../../utils/requestFactory';
import { type Post } from '../../Types';
import { getColor } from '../../utils/color';

type Props = {
  communityId: string,
  navigation: any,
  navigateToPost: Object => void,
  reloadCommunity: Function,
};

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

export default class CommunityNewsFeedScreen extends Component<Props> {
  keyExtractor = (item: Post) => item.id.toString() + Math.random();

  renderItem = ({ item }: { item: Post }) => (
    <View style={styles.item}>
      <NewsFeedItem
        {...item}
        navigation={this.props.navigation}
        refetch={this.props.reloadCommunity}
        onDelete={this.props.reloadCommunity}
      />
    </View>
  );

  renderPinnedPost(data: Post) {
    return data ? (
      <PinnedPost
        data={data}
        onPress={data => {
          this.props.navigation.navigate('PostDetailScreen', {
            postId: data.id,
            reloadList: this.props.reloadCommunity,
          });
        }}
      />
    ) : null;
  }

  render() {
    const { url, options } = makeReadCommunityFeedRq(this.props.communityId);

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
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              eonEndReached={undefined}
              refreshControl={
                <RefreshControl refreshing={firstLoad} onRefresh={refresh} />
              }
              ListHeaderComponent={
                <View style={{ marginBottom: 10 }}>
                  <NewsFeedConversation
                    onPress={() =>
                      this.props.navigation.navigate('PostEditorScreen')}
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
            />
          );
        }}
      </CursorBasedFetech>
    );
  }
}

const styles = StyleSheet.create({
  itemsContainer: {
    paddingTop: 10,
    flex: 1,
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
