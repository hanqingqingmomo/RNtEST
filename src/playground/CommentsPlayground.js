// @flow

import React from 'react';

import type { Comment as TComment } from '../Types';
import { FlatList } from '../atoms';
import { Comment } from '../blocks';

const commentFactory = (content, parentId) => ({
  id: Math.floor(Math.random() * 99999 + 1),
  parentId,
  timestamp: Math.floor(Date.now()),
  content,
  author: {
    id: 1,
    name: 'First Last',
    avatar:
      'https://lh3.googleusercontent.com/nYhPnY2I-e9rpqnid9u9aAODz4C04OycEGxqHG5vxFnA35OGmLMrrUmhM9eaHKJ7liB-=w300',
  },
});

const createComments = (content, replies) => {
  const comment = commentFactory(content);

  if (replies) {
    return [
      comment,
      ...replies.map(reply => commentFactory(reply, comment.id)),
    ];
  }

  return [comment];
};

const mockedComments = [
  ...createComments(
    'Id mollit commodo nisi et aute reprehenderit incididunt enim. Consectetur adipisicing aliquip minim proident exercitation incididunt voluptate adipisicing duis laborum adipisicing ipsum sit.',
    ['Lorem laboris elit', 'Officia ullamco pariatur cupidatat']
  ),
  ...createComments(
    'Laborum culpa sunt occaecat sint qui reprehenderit elit non aute nostrud.'
  ),
];

export default function CommentsPlayground() {
  return (
    <FlatList
      data={mockedComments}
      keyExtractor={(comment: TComment) => comment.id.toString()}
      renderItem={({ item }: { item: TComment }) => (
        <Comment
          data={item}
          onReplyRequested={(...args) => console.log('reply', args)}
          onMorePress={(...args) => console.log('more', args)}
        />
      )}
    />
  );
}

CommentsPlayground.navigationOptions = { headerTitle: 'Comments' };
