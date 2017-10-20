// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { View, Text, Image } from '../../atoms';
import { type CommunitySimple, type Attachment } from '../../Types';
import PostEditorContent from './PostEditorContent';
import PosteEditorSearchBox from './PostEditorSearchBox';
import { makeScrapeUrlReq } from '../../utils/requestFactory';

type Props = {
  attachment: ?Attachment,
  onAttachmentChange: (attachment: ?Attachment) => void,
  communities: Array<CommunitySimple>,
  communitiesSelection: Array<string>,
  onCommunitiesChange: (selection: Array<string>) => void,
  content: string,
  onContentChange: (content: string) => void,
};

type State = {
  didRequestedUrlScraping: boolean,
};

export default class PostEditorScreen extends Component<Props, State> {
  static navigationOptions = {
    title: 'Start New Conversation',
  };

  state = {
    didRequestedUrlScraping: false,
  };

  formData = {
    attachment: null,
    communities: [],
    text_content: '',
  };

  onChangeText = async (text: string) => {
    this.props.onContentChange(text);

    if (this.state.didRequestedUrlScraping === false) {
      const matches = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.exec(
        text
      );

      if (matches[0]) {
        this.setState({ didRequestedUrlScraping: true });

        const scrapeUrlReq = makeScrapeUrlReq(matches[0]);
        const attachmentRes = await global.fetch(
          scrapeUrlReq.url,
          scrapeUrlReq.options
        );

        const attachment = (await attachmentRes.json()).data;
        this.props.onAttachmentChange({
          type: 'link',
          title: attachment.title,
          description: attachment.description,
          thumbnail_url: attachment.image,
        });
      }
    }
  };

  selectCommunity = (items: Array<string>) => {
    this.props.onCommunitiesChange(items);
  };

  render() {
    const { attachment } = this.props;
    return (
      <View>
        <PosteEditorSearchBox
          selection={this.props.communitiesSelection}
          communities={this.props.communities}
          selectCommunity={this.selectCommunity}
        />
        <PostEditorContent
          value={this.props.content}
          onChangeText={this.onChangeText}
        />
        {attachment ? (
          <View style={styles.attachmentBlock}>
            <View style={styles.attachmentDismissButton}>
              <Text
                size={10}
                color="linkBlue"
                onPress={() => this.props.onAttachmentChange(null)}
              >
                REMOVE
              </Text>
            </View>

            {attachment.title ? (
              <Text weight="bold" style={styles.attachmentTextBlock}>
                {attachment.title}
              </Text>
            ) : null}
            {attachment.thumbnail_url ? (
              <Image
                source={{ uri: attachment.thumbnail_url }}
                style={{ height: 100 }}
              />
            ) : null}
            {attachment.description ? (
              <Text size={13} color="gray" style={styles.attachmentTextBlock}>
                {attachment.description}
              </Text>
            ) : null}
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  attachmentBlock: {
    margin: 10,
    borderColor: '#E2E2E4',
    borderWidth: StyleSheet.hairlineWidth,
  },
  attachmentTextBlock: {
    padding: 10,
  },
  attachmentDismissButton: {
    borderColor: '#E2E2E4',
    borderWidth: 1,
    position: 'absolute',
    top: 7,
    right: 5,
    zIndex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
});
