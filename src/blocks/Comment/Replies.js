// @flow

import React, { Component } from 'react';

import { View } from '../../atoms';
import Comment from './Comment';

import { type Comment as TComment } from '../../Types';

type P = {
  deleteSuccessful: Function,
  emitAction: Function,
  isBeingDeleted: boolean,
  isBeingUpdated: boolean,
  reloadPost: Function,
  replies: Array<TComment>,
  requestDelete: Function,
  requestUpdate: Function,
  updateSuccessful: Function,
};

export default class Replies extends Component<P> {
  render() {
    const {
      replies,
      requestDelete,
      deleteSuccessful,
      isBeingDeleted,
      requestUpdate,
      updateSuccessful,
      isBeingUpdated,
    } = this.props;

    return (
      <View>
        {replies.map(reply => (
          <Comment
            key={reply.id}
            item={reply}
            requestDelete={requestDelete}
            deleteSuccessful={deleteSuccessful}
            isBeingDeleted={isBeingDeleted}
            requestUpdate={requestUpdate}
            updateSuccessful={updateSuccessful}
            isBeingUpdated={isBeingUpdated}
            reloadPost={this.props.reloadPost}
            emitAction={this.props.emitAction}
          />
        ))}
      </View>
    );
  }
}
