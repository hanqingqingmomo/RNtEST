// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Text, TimeAgo, View, ShadowView, TouchableOpacity } from '../../atoms';
import { css } from '../../utils/style';
import { getColor } from '../../utils/color';
import { parseTextContent } from '../../utils/text';
import { type Post, type User } from '../../Types';

import NewsFeedItemAttachment from './NewsFeedItemAttachment';
import NewsFeedItemAuthor from './NewsFeedItemAuthor';
import NewsFeedItemDonation from './NewsFeedItemDonation';
import NewsFeedItemEvent from './NewsFeedItemEvent';
import NewsFeedItemFooter from './NewsFeedItemFooter';
import NewsFeedItemHeader from './NewsFeedItemHeader';
import NewsFeedItemImage from './NewsFeedItemImage';

type Props = Post & {
  navigation: Object,
  refetch: Function,
  onDelete: Function,
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
    const { id, navigation, refetch, isDetail } = this.props;

    const links = [
      // {
      //   label: 'Share',
      //   onPress: () => console.log('Share press'),
      // },
    ];

    if (!isDetail) {
      links.push({
        label: 'Comment',
        onPress: () =>
          navigation.navigate('PostDetailScreen', {
            postId: id,
            reloadList: refetch,
          }),
      });
    }

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
    const { text_content, created_at, isDetail, cached_url } = this.props;

    return (
      <View>
        {(this.hasAttachment && this.attachment.type === 'link') ||
        !this.hasAttachment ? (
          <Text size={14} lineHeight={18} style={css('color', '#455A64')}>
            {parseTextContent(text_content, 120)}
          </Text>
        ) : null}

        {this.hasAttachment && this.attachment.type.includes('image') ? (
          <NewsFeedItemImage
            {...this.attachment}
            title={text_content}
            detail={isDetail}
          />
        ) : null}

        {cached_url ? (
          isDetail ? (
            <TouchableOpacity onPress={() => {}}>
              <NewsFeedItemAttachment {...cached_url} />
            </TouchableOpacity>
          ) : (
            <NewsFeedItemAttachment {...cached_url} />
          )
        ) : null}

        <Text style={styles.postedTime} size={11} weight="500" lineHeight={13}>
          Shared <TimeAgo date={created_at} /> by:
        </Text>
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
      onDelete,
      isDetail,
    } = this.props;

    return (
      <ShadowView style={isNew ? styles.borderIsNew : undefined} radius={3}>
        <View style={styles.container}>
          <NewsFeedItemHeader {...this.props} onDelete={onDelete} />

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
    color: getColor('gray'),
  },
});
