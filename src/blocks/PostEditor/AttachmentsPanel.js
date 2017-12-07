// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { View, Icon, TouchableOpacity } from '../../atoms';
import ImagePreview from './AttachmentPanel/ImagePreview';
import LinkPreview from './AttachmentPanel/LinkPreview';
import { type LinkAttachment } from '../../Types';

type Props = {
  attachment: ?string,
  link: ?LinkAttachment,
  onClearAttachment: () => mixed,
  onClearLink: () => mixed,
};

function RemoveButton(props) {
  return (
    <TouchableOpacity
      style={styles.icon}
      hitSlop={{
        top: 6,
        right: 6,
        bottom: 6,
        left: 6,
      }}
      {...props}
    >
      <Icon name="close" color="black" size={12} />
    </TouchableOpacity>
  );
}

export default class AttachmentsPanel extends Component<Props> {
  render() {
    const { attachment, link } = this.props;
    if (!attachment && !link) {
      return null;
    }

    return (
      <View style={styles.container}>
        {link ? (
          <View style={styles.cell}>
            <LinkPreview link={link} />
            <RemoveButton onPress={this.props.onClearLink} />
          </View>
        ) : null}
        {attachment ? (
          <View style={styles.cell}>
            <ImagePreview resizeMode="contain" imageURI={attachment} />
            <RemoveButton onPress={this.props.onClearAttachment} />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    flexDirection: 'row',
  },
  cell: {
    width: '50%',
    height: '100%',
  },
  icon: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 26 / 2,
    right: 2,
    top: -5,
  },
});
