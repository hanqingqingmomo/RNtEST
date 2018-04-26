// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, ScrollView, SegmentedControl } from '../atoms';
import { NewsFeedItem, CommentList, CommentInput } from '../blocks';
import { loadContent } from '../redux/ducks/contentObject';
import { selectPost } from '../redux/selectors';
import type { Comment as TComment, Post, CommunitySimple } from '../Types';
import { css } from '../utils/style';

const TopComments: 'Top Comments' = 'Top Comments';
const NewestFirst: 'Newest First' = 'Newest First';
type SortOrder = typeof TopComments | typeof NewestFirst;
const getSortOrderCode = (sortOrder: SortOrder) =>
  sortOrder === TopComments ? 'popularity' : 'chronological';

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

  onSortPress = (sortBy: SortOrder) =>
    this.props.loadContent(this.props.post.id, {
      sortComments: getSortOrderCode(sortBy),
    });

  render() {
    const { post } = this.props;
    const { replyingTo } = this.state;

    return (
      <View style={[css('flex', 1), css('backgroundColor', 'white')]}>
        <ScrollView contentContainerStyle={css('paddingBottom', 30)}>
          <NewsFeedItem
            isDetail
            item={post}
            navigateToCommunity={this.navigateToCommunity}
            navigateToMemberProfile={this.navigateToMemberProfile}
          />

          <View
            style={[css('paddingHorizontal', 40), css('paddingVertical', 20)]}
          >
            {post.replies.length > 1 && (
              <SegmentedControl
                labels={[TopComments, NewestFirst]}
                selectedLabel={TopComments}
                onChange={this.onSortPress}
              />
            )}
          </View>
          <CommentList
            replies={post.replies}
            onRequestReply={this.focusReplyInput}
          />
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

export default connect(mapState, { loadContent })(PostScreen);
