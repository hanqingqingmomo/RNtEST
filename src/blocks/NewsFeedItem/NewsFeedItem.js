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
  imageURI?: string,
  title: string,
  videoURI?: string,
};

type ImageProps = {
  imageURI: string,
  title: string,
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
  attachment?: AttachmentProps,
  date?: Date,
  donation?: DonationProps,
  event?: EventProps,
  image?: ImageProps,
  isNew?: boolean,
  tags: Array<TagProps>,
  title?: string,
  user?: UserProps,
};

const LINKS = ['Share', 'Comment'];

export default class NewsFeedItem extends Component<P, void> {
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

  render() {
    const {
      attachment,
      date,
      donation,
      event,
      image,
      isNew,
      tags,
      title,
      user,
    } = this.props;

    const shortedTitle = this.shortenString(title, 110);

    return (
      <ShadowView style={isNew ? styles.borderIsNew : undefined} radius={3}>
        <View style={styles.container}>
          <NewsFeedItemHeader
            tags={tags}
            onTagPress={tag => console.log('tag', tag)}
            onMorePress={() => console.log('more')}
          />

          {shortedTitle ? (
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

          {attachment ? <NewsFeedItemAttachment {...attachment} /> : null}

          {image ? <NewsFeedItemImage {...image} /> : null}

          {date ? (
            <NewsFeedItemPostedTime date={date} style={styles.postedTime} />
          ) : null}

          {user ? (
            <NewsFeedItemAuthor
              user={user}
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
            links={LINKS}
            onLinkPress={key => console.log(key)}
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
