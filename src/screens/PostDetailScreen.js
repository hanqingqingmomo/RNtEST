// @flow

import React, { Component } from 'react';

import type { Comment as TComment } from '../Types';
import {
  ActivityIndicator,
  CenterView,
  Fetch,
  Screen,
  Text,
  View,
} from '../atoms';
import { NewsFeedItem, CommentList, CommentInput } from '../blocks';
import { makeReadPostWithCommentsRq } from '../utils/requestFactory';

type P = {
  navigation: {},
};

type S = {
  replyingTo?: TComment,
};

export default class PostDetailScreen extends Component<P, S> {
  state = {
    replyingTo: undefined,
  };

  inputRef: ?any;

  onMorePress = (comment: TComment) => {
    console.log('more');
  };

  onReplyPress = (comment: TComment) => {
    this.setState({ replyingTo: comment });

    if (this.inputRef) {
      this.inputRef.focus();
    }
  };

  onReplyCancel = () => {
    this.setState({ replyingTo: undefined });

    if (this.inputRef) {
      this.inputRef.blur();
    }
  };

  passRef = (ref: any) => {
    this.inputRef = ref;
  };

  render() {
    const { navigation } = this.props;
    const { replyingTo } = this.state;

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
                    <CommentList
                      comments={data.replies}
                      onReplyPress={this.onReplyPress}
                      onMorePress={this.onMorePress}
                    />
                    <CommentInput
                      replyingTo={replyingTo}
                      onReplyCancel={this.onReplyCancel}
                      passRef={this.passRef}
                    />
                  </View>
                )}
            </View>
          )}
        </Fetch>
      </Screen>
    );
  }
}
