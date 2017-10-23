// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, Image } from '../../../atoms';
import { parseTextContent } from '../../../utils/text';
import { type LinkAttachment } from '../../../Types';

type Props = {
  link: LinkAttachment,
};

export default class LinkPreview extends React.Component<Props> {
  render() {
    const { link } = this.props;

    return (
      <View style={styles.container}>
        {link.thumbnail_url ? (
          <Image source={{ uri: link.thumbnail_url }} style={styles.image} />
        ) : null}
        <View style={styles.attachmentTextBlock}>
          <Text weight="bold" color="white">
            {link.title ? parseTextContent(link.title, 60) : null}
            {link.title ? '\n' : null}
            {link.description ? (
              <Text size={12} weight="400" color="white">
                {parseTextContent(link.description, 60)}
              </Text>
            ) : null}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderColor: '#E2E2E4',
    borderWidth: StyleSheet.hairlineWidth,
  },
  attachmentTextBlock: {
    padding: 10,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.75)',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
