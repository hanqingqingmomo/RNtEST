// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import type { Comment as TComment, Post } from '../Types';
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
  refreshingData: boolean,
  isBeingDeleted: boolean,
  isBeingUpdated: boolean,
};

export default class PostDetailScreen extends Component<P, S> {
  state = {
    replyingTo: undefined,
    refreshingData: false,
    isBeingDeleted: false,
    isBeingUpdated: false,
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

  onSubmitSuccess = (fetch: any, data: Post) => () => {
    this.setState({
      replyingTo: undefined,
    });

    this.props.navigation.state.params.reloadList(data);

    fetch();
  };

  requestDelete = (item: Post) => {
    // this.setState({ isBeingDeleted: true });
    // TODO
    // console.log('request delete', item);
  };

  deleteSuccessful = (item: Post) => {
    // this.setState({ isBeingDeleted: false });
    // TODO
    // console.log('delete successful', item);
  };

  requestUpdate = (item: Post) => {
    // this.setState({ isBeingUpdated: true });
    // TODO
    // console.log('request update', item);
  };

  updateSuccessful = (item: Post) => {
    // this.setState({ isBeingUpdated: false });
    // TODO
    // console.log('update successful', item);
  };

  render() {
    const { navigation } = this.props;
    const { replyingTo, isBeingDeleted, isBeingUpdated } = this.state;

    const readPostWithCommentsRq = makeReadPostWithCommentsRq(
      navigation.state.params.postId
    );

    return (
      <Fetch
        url={readPostWithCommentsRq.url}
        options={readPostWithCommentsRq.options}
      >
        {({
          loading,
          error,
          data,
          fetch,
        }: {
          loading: boolean,
          error: { message: string },
          data: Post,
          fetch: Function,
        }) => (
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
                    isBeingDeleted={isBeingDeleted}
                    isBeingUpdated={isBeingUpdated}
                    requestDelete={this.requestDelete}
                    requestUpdate={this.requestUpdate}
                    deleteSuccessful={this.deleteSuccessful}
                    updateSuccessful={this.updateSuccessful}
                    ListHeaderComponent={
                      <NewsFeedItem
                        isBeingDeleted={isBeingDeleted}
                        isBeingUpdated={isBeingUpdated}
                        isDetail
                        item={data}
                        navigation={this.props.navigation}
                        radius={0}
                        requestDelete={this.requestDelete}
                        requestUpdate={this.requestUpdate}
                        deleteSuccessful={this.deleteSuccessful}
                        updateSuccessful={this.updateSuccessful}
                        onDelete={() => {
                          this.props.navigation.state.params.reloadList(
                            data,
                            true
                          );
                          this.props.navigation.goBack();
                        }}
                        emitAction={
                          this.props.navigation.state.params.emitAction
                        }
                      />
                    }
                    reloadPost={fetch}
                    emitAction={this.props.navigation.state.params.emitAction}
                  />
                  <CommentInput
                    postId={data.id}
                    replyingTo={replyingTo}
                    onReplyCancel={this.onReplyCancel}
                    onSubmitSuccess={this.onSubmitSuccess(fetch, data)}
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
