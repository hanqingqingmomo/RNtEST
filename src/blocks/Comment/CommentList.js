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
  reloadPost: Function,
};

export default class CommentList extends Component<P> {
  renderItem = ({ item }: { item: TComment }) => (
    <Comment
      data={item}
      onReplyPress={() => this.props.onReplyPress(item)}
      reloadPost={this.props.reloadPost}
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
