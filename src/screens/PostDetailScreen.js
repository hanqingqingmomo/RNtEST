// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

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
  navigation: any,
};

type S = {
  replyingTo?: TComment,
};

export default class PostDetailScreen extends Component<P, S> {
  state = {
    replyingTo: undefined,
  };

  inputRef: ?any;

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

  onSubmitSuccess = (fetch: any) => () => {
    this.setState({
      replyingTo: undefined,
    });

    this.props.navigation.state.params.reloadList();

    fetch();
  };

  render() {
    const { navigation } = this.props;
    const { replyingTo } = this.state;

    const readPostWithCommentsRq = makeReadPostWithCommentsRq(
      navigation.state.params.postId
    );

    return (
      <Fetch
        url={readPostWithCommentsRq.url}
        options={readPostWithCommentsRq.options}
      >
        {({ loading, error, data, fetch }) => (
          <Screen
            fill
            tintColor="white"
            containerStyle={styles.screenContainer}
            keyboardShouldPersistTaps="always"
          >
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
                <View style={styles.container}>
                  <CommentList
                    postId={navigation.state.params.postId}
                    comments={data.replies}
                    onReplyPress={this.onReplyPress}
                    onMorePress={this.onMorePress}
                    ListHeaderComponent={
                      <NewsFeedItem
                        {...data}
                        navigation={this.props.navigation}
                        isDetail
                      />
                    }
                    reloadPost={fetch}
                  />
                  <CommentInput
                    postId={data.id}
                    replyingTo={replyingTo}
                    onReplyCancel={this.onReplyCancel}
                    onSubmitSuccess={this.onSubmitSuccess(fetch)}
                    passRef={this.passRef}
                    style={styles.commentInput}
                  />
                </View>
              )}
          </Screen>
        )}
      </Fetch>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    height: 100,
  },
  container: {
    flex: 1,
  },
  commentInput: {
    height: 100,
  },
});
