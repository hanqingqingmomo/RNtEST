// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Image, TableView, Text, View } from '../atoms';
import { type Post } from '../Types';
import { parseTextContent } from '../utils/text';

const { Table, Section, Cell, HeaderWithLink } = TableView;

type Props = {
  data: Post,
  onPress: (data: Post) => void,
  onSeeAll: Function,
};

function AvatarOrAttachment(props: Post): React$Element<*> {
  const uri =
    props.attachment && props.attachment.type.includes('image')
      ? props.attachment.url
      : props.author.profile_photo;

  return <Image source={{ uri }} style={{ width: 38, height: 38 }} />;
}

export default function PinnedPost(props: Props) {
  return (
    <Table>
      <Section
        headerComponent={
          <HeaderWithLink
            title="Pinned Items"
            link="See all"
            onPress={props.onSeeAll}
          />
        }
      >
        <Cell
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
      </Section>
    </Table>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
  },
});
