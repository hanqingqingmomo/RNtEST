// @flow

import React, { Component } from 'react';

import { View } from '../../atoms';
import { type CommunitySimple, type LinkAttachment } from '../../Types';
import PostEditorContent from './PostEditorContent';
import PosteEditorSearchBox from './PostEditorSearchBox';
import ImagePicker from './ImagePicker';
import AttachmentsPanel from './AttachmentsPanel';
import { makeScrapeUrlReq } from '../../utils/requestFactory';

// TODO merge state change callbacks into single callback
type Props = {
  attachment: ?string,
  communities: Array<CommunitySimple>,
  communitiesSelection: Array<string>,
  content: string,
  link: ?LinkAttachment,
  onAttachmentChange: (attachmentURI: ?string) => mixed,
  onCommunitiesChange: (selection: Array<string>) => mixed,
  onContentChange: (content: string) => mixed,
  onLinkScraped: (link: ?LinkAttachment) => mixed,
};

type State = {
  didRequestedUrlScraping: boolean,
  attachment: ?string,
};

const LINK_PATTERN = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

export default class PostEditorScreen extends Component<Props, State> {
  state = {
    didRequestedUrlScraping: false,
    attachment: null,
  };

  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.content !== this.props.content &&
      this.state.didRequestedUrlScraping === false
    ) {
      this.scrapeUrl();
    }
  }

  scrapeUrl = async () => {
    const matches = LINK_PATTERN.exec(this.props.content);

    if (matches && matches[0]) {
      this.setState({ didRequestedUrlScraping: true });
      const scrapeReq = makeScrapeUrlReq(matches[0]);
      const scrapeRes = await global.fetch(scrapeReq.url, scrapeReq.options);

      const link = (await scrapeRes.json()).data;
      this.props.onLinkScraped({
        url: matches[0],
        thumbnail_url: link.image,
        title: link.title,
        description: link.description,
      });
    }
  };

  selectCommunity = (items: Array<string>) => {
    this.props.onCommunitiesChange(items);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <PosteEditorSearchBox
          selection={this.props.communitiesSelection}
          communities={this.props.communities}
          selectCommunity={this.selectCommunity}
        />
        <ImagePicker
          image={this.props.attachment}
          onImageSelected={this.props.onAttachmentChange}
        />

        <PostEditorContent
          value={this.props.content}
          onChangeText={this.props.onContentChange}
        />

        <AttachmentsPanel
          attachment={this.props.attachment}
          link={this.props.link}
          onClearAttachment={() => this.props.onAttachmentChange(null)}
          onClearLink={() => this.props.onLinkScraped(null)}
        />
      </View>
    );
  }
}
