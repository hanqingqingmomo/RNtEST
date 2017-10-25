// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Text, TimeAgo, View, ShadowView, TouchableOpacity } from '../../atoms';
import { css } from '../../utils/style';
import { getColor } from '../../utils/color';
import { parseTextContent } from '../../utils/text';
import { type Post } from '../../Types';

import NewsFeedItemAttachment from './NewsFeedItemAttachment';
import NewsFeedItemAuthor from './NewsFeedItemAuthor';
import NewsFeedItemDonation from './NewsFeedItemDonation';
import NewsFeedItemEvent from './NewsFeedItemEvent';
import NewsFeedItemFooter from './NewsFeedItemFooter';
import NewsFeedItemHeader from './NewsFeedItemHeader';
import NewsFeedItemImage from './NewsFeedItemImage';

export type ItemActionHandler = (
  action: 'delete' | 'report' | 'update' | 'create',
  item: Post
) => mixed;

type P = {
  isDetail?: boolean,
  item: Post,
  navigation: Object,
  radius?: number,
  onItemAction: ItemActionHandler,
};

export default class NewsFeedItem extends Component<P> {
  getLinks = () => {
    const { item, navigation, isDetail } = this.props;
    const { id } = item;

    const links = [];

    if (!isDetail) {
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

  handleUserPress = () => {
    const { navigation, item } = this.props;

    if (navigation) {
      navigation.navigate('MemberProfileScreen', {
        user: item.author,
      });
    }
  };

  renderContent() {
    const { item, isDetail } = this.props;
    const { text_content, created_at, cached_url } = item;

    return (
      <View>
        {(item.attachment && item.attachment.type === 'link') ||
        !item.attachment ? (
          <Text size={14} lineHeight={18} style={css('color', '#455A64')}>
            {parseTextContent(text_content, 120)}
          </Text>
        ) : null}

        {item.attachment && item.attachment.type.includes('image') ? (
          <NewsFeedItemImage
            {...item.attachment}
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
    const { item, isDetail, navigation, radius } = this.props;

    const { author, donation, event, id, isNew } = item;

    return (
      <ShadowView
        style={isNew ? styles.borderIsNew : undefined}
        radius={typeof radius !== 'undefined' ? radius : 3}
      >
        <View style={styles.container}>
          <NewsFeedItemHeader
            item={item}
            navigation={navigation}
            onItemAction={this.props.onItemAction}
          />

          {isDetail ? (
            this.renderContent()
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PostDetailScreen', {
                  postId: id,
                });
              }}
            >
              {this.renderContent()}
            </TouchableOpacity>
          )}

          {author ? (
            <NewsFeedItemAuthor
              author={author}
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

          <NewsFeedItemFooter item={item} links={this.getLinks()} />
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
