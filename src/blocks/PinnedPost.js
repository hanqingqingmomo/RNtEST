// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Image, TableView, Text, View } from '../atoms';
import { type Post } from '../Types';
import { parseTextContent } from '../utils/text';

type Props = { data: Post, onPress: (data: Post) => void };

function AvatarOrAttachment(props: Post) {
  const uri =
    props.attachment && props.attachment.type.includes('image')
      ? props.attachment.url
      : props.author.profile_photo;

  return <Image source={{ uri }} style={{ width: 38, height: 38 }} />;
}

export default function PinnedPost(props: Props) {
  return (
    <TableView.Table>
      <TableView.Section header="Pinned Items">
        <TableView.Cell
          cellStyle="Basic"
          contentContainerStyle={{ paddingTop: 15, paddingBottom: 15 }}
          image={
            <AvatarOrAttachment
              attachment={props.data.attachment}
              author={props.data.author}
            />
          }
          cellContentView={
            <View style={styles.text}>
              <Text color="#455A64" size={14} lineHeight={18}>
                {parseTextContent(props.data.text_content, 100)}
              </Text>
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
    flex: 1,
  },
});
