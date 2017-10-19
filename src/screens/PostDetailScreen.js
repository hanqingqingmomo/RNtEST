// @flow

import React, { Component } from 'react';

import {
  ActivityIndicator,
  CenterView,
  Fetch,
  Screen,
  Text,
  View,
} from '../atoms';
import { NewsFeedItem, CommentList } from '../blocks';
import { makeReadPostWithCommentsRq } from '../utils/requestFactory';

export default class PostDetailScreen extends Component<{}> {
  render() {
    const { navigation } = this.props;

    const readPostWithCommentsRq = makeReadPostWithCommentsRq(
      navigation.state.params.postId
    );

    return (
      <Screen fill>
        <Fetch
          url={readPostWithCommentsRq.url}
          options={readPostWithCommentsRq.options}
        >
          {({ loading, error, data }) => (
            <View>
              {loading && (
                <CenterView>
                  <ActivityIndicator />
                </CenterView>
              )}
              {error && (
                <CenterView>
                  <Text>{error.message}</Text>
                </CenterView>
              )}
              {!loading &&
                data && (
                  <View>
                    <NewsFeedItem {...data} />
                    <CommentList comments={data.replies} />
                  </View>
                )}
            </View>
          )}
        </Fetch>
      </Screen>
    );
  }
}
