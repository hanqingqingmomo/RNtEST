// @flow

import React from 'react';

import { View } from '../../atoms';
import Comment from './Comment';

import { type Comment as TComment } from '../../Types';

type P = {
  replies: Array<TComment>,
};

export default class Replies extends React.Component<P> {
  render() {
    const { replies } = this.props;

    return (
      <View>
        {replies.map(reply => (
          <Comment
            key={reply.id}
            data={reply}
            onMorePress={(...args) => console.log('more', args)}
          />
        ))}
      </View>
    );
  }
}
