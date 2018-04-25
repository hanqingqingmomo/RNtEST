// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { Comment as TComment, Post, CommunitySimple } from '../Types';
import { View, ScrollView } from '../atoms';
import { NewsFeedItem, CommentList, CommentInput } from '../blocks';
import { selectPost } from '../redux/selectors';

import { css } from '../utils/style';

type Props = {
  navigation: *,
  post: Post,
};

type State = {
  replyingTo?: TComment,
};

class PostScreen extends Component<Props, State> {
  state = {
    replyingTo: undefined,
  };

  inputRef: ?any;

  navigateToCommunity = (community: CommunitySimple) => {
    this.props.navigation.navigate('CommunityTab:CommunityScreen', {
      communityId: community.id,
    });
  };

  navigateToMemberProfile = () => {
    // TODO somehow, component should now what timeline it is displayed in
    this.props.navigation.navigate('GlobalFeedTab:MemberProfileScreen', {
      user: this.props.post.author,
    });
  };

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

    return (
      <View style={[css('flex', 1), css('backgroundColor', 'white')]}>
        <ScrollView>
          <NewsFeedItem
            isDetail
            item={post}
            navigateToCommunity={this.navigateToCommunity}
            navigateToMemberProfile={this.navigateToMemberProfile}
          />
          <View style={css('paddingVertical', 20)}>
            <CommentList
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

export default connect(mapState)(PostScreen);
