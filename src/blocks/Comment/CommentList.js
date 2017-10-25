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
  requestDelete: Function,
  deleteSuccessful: Function,
  isBeingDeleted: boolean,
  requestUpdate: Function,
  updateSuccessful: Function,
  isBeingUpdated: boolean,
  reloadPost: Function,
};

export default class CommentList extends Component<P> {
  renderItem = ({ item }: { item: TComment }) => {
    const {
      onReplyPress,
      requestDelete,
      deleteSuccessful,
      isBeingDeleted,
      requestUpdate,
      updateSuccessful,
      isBeingUpdated,
    } = this.props;

    return (
      <Comment
        item={item}
        onReplyPress={onReplyPress}
        requestDelete={requestDelete}
        deleteSuccessful={deleteSuccessful}
        isBeingDeleted={isBeingDeleted}
        requestUpdate={requestUpdate}
        updateSuccessful={updateSuccessful}
        isBeingUpdated={isBeingUpdated}
        reloadPost={this.props.reloadPost}
        emitAction={this.props.emitAction}
      />
    );
  };

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
