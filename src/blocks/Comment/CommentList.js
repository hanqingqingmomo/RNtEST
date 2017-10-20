// @flow

import React, { Component } from 'react';

import type { Comment as TComment } from '../../Types';
import { FlatList } from '../../atoms';
import { Comment } from '../../blocks';

type P = {
  comments: Array<TComment>,
  ListHeaderComponent?: any,
  onReplyPress: TComment => void,
  postId: number,
};

export default class CommentList extends Component<P> {
  renderItem = ({ item }: { item: TComment }) => (
    <Comment
      data={item}
      postId={this.props.postId}
      onReplyPress={() => this.props.onReplyPress(item)}
    />
  );

  keyExtractor = (comment: TComment) => comment.id.toString();

  render() {
    const { comments, ListHeaderComponent } = this.props;

    return (
      <FlatList
        data={comments}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ListHeaderComponent={ListHeaderComponent}
      />
    );
  }
}
