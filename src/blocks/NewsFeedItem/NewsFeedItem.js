// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, ShadowView } from '../../atoms';
import { css } from '../../utils/style';

import NewsFeedItemAttachment from './NewsFeedItemAttachment';
import NewsFeedItemAuthor from './NewsFeedItemAuthor';
import NewsFeedItemDonation from './NewsFeedItemDonation';
import NewsFeedItemEvent from './NewsFeedItemEvent';
import NewsFeedItemFooter from './NewsFeedItemFooter';
import NewsFeedItemHeader from './NewsFeedItemHeader';
import NewsFeedItemImage from './NewsFeedItemImage';
import NewsFeedItemPostedTime from './NewsFeedItemPostedTime';

type TagProps = {
  disabled?: boolean,
  name: string,
};

type UserProps = {
  imageURI: string,
  username: string,
};

type AttachmentProps = {
  url: string,
  type: 'image' | 'link',
};

type EventProps = {
  endDate: Date,
  imageURI: string,
  startDate: Date,
  title: string,
};

type DonationProps = {
  donors: Array<UserProps>,
  imageURI: string,
  title: string,
};

type P = {
  attachments?: Array<AttachmentProps>,
  author?: UserProps,
  comments?: number,
  communities: Array<TagProps>,
  created_at?: Date,
  donation?: DonationProps,
  event?: EventProps,
  isNew?: boolean,
  likes?: number,
  replies: number,
  text_content?: string,
};

const LINKS = ['Share', 'Comment'];

export default class NewsFeedItem extends Component<P> {
  shortenString(
    string?: string,
    maxChars?: number
  ): ?{
    isShorted: boolean,
    string: string,
  } {
    if (!string) {
      return null;
    }

    const newString = string.substring(0, maxChars || string.length);

    return {
      isShorted: newString.length < string.length,
      string: newString,
    };
  }

  get attachment(): Object {
    if (this.hasAttachment) {
      return this.props.attachments[0];
    }

    return {};
  }

  get hasAttachment(): boolean {
    return !!this.props.attachments && !!this.props.attachments[0];
  }

  render() {
    const {
      created_at,
      donation,
      event,
      isNew,
      communities,
      text_content,
      author,
      replies,
      comments,
      likes,
    } = this.props;

    const shortedTitle = this.shortenString(text_content, 110);

    return (
      <ShadowView style={isNew ? styles.borderIsNew : undefined} radius={3}>
        <View style={styles.container}>
          <NewsFeedItemHeader
            communities={communities}
            onPillPress={tag => console.log('tag', tag)}
            onMorePress={() => console.log('more')}
          />

          {(this.hasAttachment && this.attachment.type === 'link') ||
          !this.hasAttachment ? (
            <Text size={14} lineHeight={18} style={css('color', '#455A64')}>
              {shortedTitle.string}
              {shortedTitle.isShorted ? (
                <Text>
                  {`... `}
                  <Text style={css('color', '#00B0FF')}>Continue reading</Text>
                </Text>
              ) : null}
            </Text>
          ) : null}

          {this.hasAttachment && this.attachment.type.includes('image') ? (
            <NewsFeedItemImage {...this.attachment} title={text_content} />
          ) : (
            <NewsFeedItemAttachment {...this.attachment} />
          )}

          {created_at ? (
            <NewsFeedItemPostedTime
              date={created_at}
              style={styles.postedTime}
            />
          ) : null}

          {author ? (
            <NewsFeedItemAuthor
              replies={replies}
              author={author}
              onReplayPress={() => console.log('reply')}
              onUserPress={user => console.log('user', user)}
            />
          ) : null}

          {donation ? (
            <NewsFeedItemDonation
              {...donation}
              onDonatePress={() => console.log('donate')}
            />
          ) : null}

          {event ? <NewsFeedItemEvent {...event} /> : null}

          <NewsFeedItemFooter
            likes={likes}
            comments={comments}
            links={LINKS}
            onLinkPress={key => console.log(key)}
            onLikePress={key => console.log(key)}
          />
        </View>
      </ShadowView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 3,
    paddingHorizontal: 15,
  },
  borderIsNew: {
    borderColor: 'rgba(0,230,118,0.7)',
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  postedTime: {
    marginTop: 12,
  },
});
