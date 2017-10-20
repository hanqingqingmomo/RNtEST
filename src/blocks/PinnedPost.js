// @flow

import React from 'react';

import { Image, TableView, Text, TouchableOpacity } from '../atoms';
import { type Post } from '../Types';

type Props = { data: Post, onPress: (data: Post) => void };

function AvatarOrAttachment(props) {
  const uri =
    props.attachment && props.attachment.type.includes('image')
      ? props.attachment.url
      : props.author.profile_photo;

  return <Image source={{ uri }} style={{ width: 28, height: 28 }} />;
}

export default function PinnedPost(props: Props) {
  return (
    <TableView.Table>
      <TableView.Section header="Pinned Items">
        <TableView.Cell
          cellStyle="Basic"
          image={
            <AvatarOrAttachment
              attachment={props.data.attachment}
              author={props.data.author}
            />
          }
          cellContentView={
            <TouchableOpacity onPress={() => props.onPress(props.data)}>
              <Text>{props.data.text_content}</Text>
            </TouchableOpacity>
          }
        />
      </TableView.Section>
    </TableView.Table>
  );
}
