import React from 'react';

import type { Comment as TComment } from '../../Types';
import { FlatList } from '../../atoms';
import { Comment } from '../../blocks';

const commentFactory = (content, replies) => ({
  id: Math.floor(Math.random() * 99999 + 1),
  replies: replies.map(reply => commentFactory(reply, [])),
  timestamp: Math.floor(Date.now()),
  content,
  author: {
    id: 1,
    name: 'First Last',
    avatar: 'https://www.w3schools.com/w3css/img_avatar2.png',
  },
});

const mockedComments = [
  commentFactory(
    'Id mollit commodo nisi et aute reprehenderit incididunt enim. Consectetur adipisicing aliquip minim proident exercitation incididunt voluptate adipisicing duis laborum adipisicing ipsum sit.',
    [
      'Lorem laboris elit',
      'Officia ullamco pariatur cupidatat Officia ullamco pariatur cupidatat Officia ullamco pariatur cupidatat',
    ]
  ),
  commentFactory(
    'Laborum culpa sunt occaecat sint qui reprehenderit elit non aute nostrud.',
    []
  ),
];

export default function CommentPlayground() {
  return (
    <FlatList
      data={mockedComments}
      keyExtractor={(comment: TComment) => comment.id.toString()}
      renderItem={({ item }: { item: TComment }) => (
        <Comment
          data={item}
          onReplyPress={(...args) => console.log('reply', args)}
          onMorePress={(...args) => console.log('more', args)}
        />
      )}
    />
  );
}

CommentPlayground.navigationOptions = { headerTitle: 'Comments' };
