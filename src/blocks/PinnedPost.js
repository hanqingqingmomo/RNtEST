// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Image, TableView, Text, View } from '../atoms';
import { type Post } from '../Types';

type Props = { data: Post, onPress: (data: Post) => void };

function AvatarOrAttachment(props: Post) {
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
            <View style={styles.text}>
              <Text>{props.data.text_content}</Text>
            </View>
          }
          onPress={() => props.onPress(props.data)}
        />
      </TableView.Section>
    </TableView.Table>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingVertical: 15,
    flex: 1,
  },
});
