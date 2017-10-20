// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, ShadowView } from '../../atoms';
import { css } from '../../utils/style';
import { type JoinedCommunity, type Post, type User } from '../../Types';

import NewsFeedItemAttachment from './NewsFeedItemAttachment';
import NewsFeedItemAuthor from './NewsFeedItemAuthor';
import NewsFeedItemDonation from './NewsFeedItemDonation';
import NewsFeedItemEvent from './NewsFeedItemEvent';
import NewsFeedItemFooter from './NewsFeedItemFooter';
import NewsFeedItemHeader from './NewsFeedItemHeader';
import NewsFeedItemImage from './NewsFeedItemImage';
import NewsFeedItemPostedTime from './NewsFeedItemPostedTime';

type Props = Post & {
  navigation: Object,
};

export default class NewsFeedItem extends Component<Props> {
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
    return this.props.attachment;
  }

  get hasAttachment(): boolean {
    return !!this.attachment;
  }

  getLinks = () => {
    const { id, navigation } = this.props;

    const links = [
      {
        label: 'Share',
        onPress: () => console.log('Share press'),
      },
    ];

    if (navigation) {
      links.push({
        label: 'Comment',
        onPress: () =>
          navigation.navigate('PostDetailScreen', {
            postId: id,
          }),
      });
    }

    return links;
  };

  handleCommunityPress = (community: JoinedCommunity) => {
    const { navigation } = this.props;

    if (navigation) {
      navigation.navigate('CommunityCenterScreen', {
        communityId: community.id,
      });
    }
  };

  handleUserPress = (user: User) => {
    const { navigation } = this.props;

    if (navigation) {
      navigation.navigate('MemberProfileScreen', {
        user,
      });
    }
  };

  render() {
    const {
      id,
      created_at,
      donation,
      event,
      isNew,
      text_content,
      author,
      replies,
      comments_count,
      likes_count,
      liked,
    } = this.props;

    const shortedTitle = this.shortenString(text_content, 110);

    return (
      <ShadowView style={isNew ? styles.borderIsNew : undefined} radius={3}>
        <View style={styles.container}>
          <NewsFeedItemHeader
            onPillPress={this.handleCommunityPress}
            onMorePress={() => console.log('more')}
            {...this.props}
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
              onUserPress={this.handleUserPress}
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
            postId={id}
            likes_count={likes_count}
            liked={liked}
            comments_count={comments_count}
            links={this.getLinks()}
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
