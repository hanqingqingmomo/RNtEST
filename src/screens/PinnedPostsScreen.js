// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
  ActivityIndicator,
  CenterView,
  Fetch,
  Screen,
  View,
  Text,
} from '../atoms';
import { makeReadPinnedItemsRq } from '../utils/requestFactory';
import NewsFeedList from '../blocks/NewsFeedItem/NewsFeedList';

type Props = {
  navigation: any,
};

export default class PinnedPostsScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Pinned Posts',
  };

  render() {
    const readPinnedItemsReq = makeReadPinnedItemsRq(
      this.props.navigation.state.params.communityId
    );

    return (
      <Fetch url={readPinnedItemsReq.url} options={readPinnedItemsReq.options}>
        {({ loading, data, error, fetch }) => {
          if (loading === false) {
            if (data) {
              return (
                <Screen>
                  <NewsFeedList
                    data={data.data}
                    navigation={this.props.navigation}
                  />
                </Screen>
              );
            } else {
              return (
                <View style={styles.textContainer}>
                  <Text style={styles.text}>There is no content.</Text>
                </View>
              );
            }
          } else {
            return (
              <CenterView>
                <ActivityIndicator />
              </CenterView>
            );
          }
        }}
      </Fetch>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingBottom: 10,
    paddingHorizontal: 10,
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
