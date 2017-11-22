// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { Comment as TComment, Post } from '../Types';
import { View, ScrollView } from '../atoms';
import { NewsFeedItem, CommentList, CommentInput } from '../blocks';
<<<<<<< HEAD
import { selectPost } from '../redux/selectors';

import { css } from '../utils/style';

type P = {
  navigation: any,
  post: Post,
=======
import { makeReadPostWithCommentsRq } from '../utils/requestFactory';
import type { ScreenProps, FetchProps } from '../Types';

type NavigationProps = {
  params: {
    emitAction: Function,
    postId: string,
    reloadList: Function,
  },
>>>>>>> 18ce2aa8ab31c7e35cfef4c19e1bbfe33eec406b
};

type P = ScreenProps<NavigationProps>;

type S = {
  replyingTo?: TComment,
};

class PostDetailScreen extends Component<P, S> {
  state = {
    replyingTo: undefined,
  };

  inputRef: ?any;

  focusReplyInput = (comment: TComment) => {
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
    const { post } = this.props;
    const { replyingTo } = this.state;
    // TODO do not pass navigation
    return (
<<<<<<< HEAD
      <View style={[css('flex', 1), css('backgroundColor', 'white')]}>
        <ScrollView>
          <NewsFeedItem
            isDetail
            item={post}
            navigation={this.props.navigation}
            onDelete={() => {
              this.props.navigation.goBack();
            }}
          />
          <View style={css('paddingVertical', 20)}>
            <CommentList
              level={0}
              replies={this.props.post.replies}
              onRequestReply={this.focusReplyInput}
            />
          </View>
        </ScrollView>
        <CommentInput
          target={replyingTo || post}
          postId={post.id}
          replyingTo={replyingTo}
          onReplyCancel={this.onReplyCancel}
          passRef={this.passRef}
        />
      </View>
=======
      <Fetch
        url={readPostWithCommentsRq.url}
        options={readPostWithCommentsRq.options}
      >
        {({ loading, error, data, fetch }: FetchProps<Post>) => (
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
>>>>>>> 18ce2aa8ab31c7e35cfef4c19e1bbfe33eec406b
    );
  }
}

const mapState = (state, props) => ({
  post: selectPost(props.navigation.state.params.postId, state),
});

export default connect(mapState)(PostDetailScreen);
