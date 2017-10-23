// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, ShadowView, TouchableOpacity } from '../../atoms';
import { css } from '../../utils/style';
import { parseTextContent } from '../../utils/text';
import { type Post, type User, type Attachment } from '../../Types';

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
  refetch?: Function,
  attachment?: Attachment,
  isDetail?: boolean,
};

export default class NewsFeedItem extends Component<Props> {
  get attachment(): Object {
    return this.props.attachment;
  }

  get hasAttachment(): boolean {
    return !!this.attachment;
  }

  getLinks = () => {
    const { id, navigation, refetch } = this.props;

    const links = [
      // {
      //   label: 'Share',
      //   onPress: () => console.log('Share press'),
      // },
    ];

    links.push({
      label: 'Comment',
      onPress: () =>
        navigation.navigate('PostDetailScreen', {
          postId: id,
          reloadList: refetch,
        }),
    });

    return links;
  };

  handleUserPress = (user: User) => {
    const { navigation } = this.props;

    if (navigation) {
      navigation.navigate('MemberProfileScreen', {
        user,
      });
    }
  };

  renderContent() {
    const { text_content, created_at, isDetail } = this.props;

    return (
      <View>
        {(this.hasAttachment && this.attachment.type === 'link') ||
        !this.hasAttachment ? (
          <Text size={14} lineHeight={18} style={css('color', '#455A64')}>
            {isDetail ? text_content : parseTextContent(text_content, 120)}
          </Text>
        ) : null}

        {this.hasAttachment && this.attachment.type.includes('image') ? (
          <NewsFeedItemImage
            {...this.attachment}
            title={text_content}
            detail={isDetail}
          />
        ) : (
          <NewsFeedItemAttachment {...this.attachment} />
        )}

        {created_at ? (
          <NewsFeedItemPostedTime date={created_at} style={styles.postedTime} />
        ) : null}
      </View>
    );
  }

  render() {
    const {
      id,
      donation,
      event,
      isNew,
      author,
      replies,
      comments_count,
      likes_count,
      liked,
      navigation,
      refetch,
      isDetail,
    } = this.props;

    return (
      <ShadowView style={isNew ? styles.borderIsNew : undefined} radius={3}>
        <View style={styles.container}>
          <NewsFeedItemHeader {...this.props} refetch={refetch} />

          {isDetail ? (
            this.renderContent()
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PostDetailScreen', {
                  postId: id,
                  reloadList: refetch,
                });
              }}
            >
              {this.renderContent()}
            </TouchableOpacity>
          )}

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
