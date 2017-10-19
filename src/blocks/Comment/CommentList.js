// @flow

import React, { Component } from 'react';

import type { Comment as TComment } from '../../Types';
import { FlatList } from '../../atoms';
import { Comment } from '../../blocks';

type P = {
  comments: Array<TComment>,
};

export default class CommentList extends Component<P> {
  renderItem = ({ item }: { item: TComment }) => (
    <Comment
      data={item}
      onReplyRequested={(...args) => console.log('reply', args)}
      onMorePress={(...args) => console.log('more', args)}
    />
  );

  keyExtractor = (comment: TComment) => comment.id.toString();

  render() {
    const { comments } = this.props;

    return (
      <FlatList
        data={comments}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}
