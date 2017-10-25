// @flow

import React from 'react';

import { View } from '../../atoms';
import Comment from './Comment';

import { type Comment as TComment } from '../../Types';

type P = {
  replies: Array<TComment>,
  requestDelete: Function,
  deleteSuccessful: Function,
  isBeingDeleted: boolean,
  requestUpdate: Function,
  updateSuccessful: Function,
  isBeingUpdated: boolean,
  reloadPost: Function,
};

export default class Replies extends React.Component<P> {
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
          />
        ))}
      </View>
    );
  }
}
