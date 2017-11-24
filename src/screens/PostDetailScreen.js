// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { Comment as TComment, Post } from '../Types';
import { View, ScrollView } from '../atoms';
import { NewsFeedItem, CommentList, CommentInput } from '../blocks';
import { selectPost } from '../redux/selectors';

import { css } from '../utils/style';

type P = {
  navigation: any,
  post: Post,
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
    );
  }
}

const mapState = (state, props) => ({
  post: selectPost(props.navigation.state.params.postId, state),
});

export default connect(mapState)(PostDetailScreen);
