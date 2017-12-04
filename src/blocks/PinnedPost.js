// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';

import { Image, TableView, Text, View, Fetch } from '../atoms';
import type { Post, FetchProps } from '../Types';
import { parseTextContent } from '../utils/text';
import { makeReadPinnedItemsRq } from '../utils/requestFactory';

const { Table, Section, Cell, SectionLabelWithLink } = TableView;

type Props = {
  communityId: string,
  onPress: (data: Post) => void,
  navigateToPinnedFeed: Function,
};

function AvatarOrAttachment(props: Post): React$Element<*> {
  const uri =
    props.attachment && props.attachment.type.includes('image')
      ? props.attachment.url
      : props.author.profile_photo;

  return <Image source={{ uri }} style={{ width: 38, height: 38 }} />;
}

export default class PinnedPost extends Component<Props> {
  render() {
    const readPinnedItemsReq = makeReadPinnedItemsRq(this.props.communityId);

    return (
      <Fetch url={readPinnedItemsReq.url} options={readPinnedItemsReq.options}>
        {({
          loading,
          data,
          error,
          fetch,
        }: FetchProps<{ data: Array<Post> }>) => {
          if (loading === false) {
            if (data && data.data.length > 0) {
              const firstPinnedItem = data.data[0];

              return (
                <Collapsible collapsed={!!!data.data.length}>
                  <Table>
                    <Section
                      headerComponent={
                        <SectionLabelWithLink
                          title="Pinned Items"
                          link={data.data.length > 1 ? 'See all' : ''}
                          onPress={() =>
                            this.props.navigateToPinnedFeed(data.data)}
                        />
                      }
                    >
                      <Cell
                        cellStyle="Basic"
                        contentContainerStyle={{
                          paddingTop: 15,
                          paddingBottom: 15,
                        }}
                        image={<AvatarOrAttachment {...firstPinnedItem} />}
                        cellContentView={
                          <View style={styles.text}>
                            <Text color="#455A64" size={14} lineHeight={18}>
                              {parseTextContent(
                                firstPinnedItem.text_content,
                                100
                              )}
                            </Text>
                          </View>
                        }
                        onPress={() => this.props.onPress(firstPinnedItem)}
                      />
                    </Section>
                  </Table>
                </Collapsible>
              );
            }
          }

          return null;
        }}
      </Fetch>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
  },
});
