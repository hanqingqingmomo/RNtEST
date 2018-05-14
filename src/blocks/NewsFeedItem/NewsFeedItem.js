// @flow

import React, { Component } from 'react';
import { StyleSheet, Linking } from 'react-native';
import { connect } from 'react-redux';

import { Text, TimeAgo, View, ShadowView, TouchableOpacity } from '../../atoms';
import { css } from '../../utils/style';
import { getColor } from '../../utils/color';
import { parseTextContent } from '../../utils/text';
import type { Post, User, CommunitySimple } from '../../Types';
import { selectUser } from '../../redux/selectors';

import NewsFeedItemAttachment from './NewsFeedItemAttachment';
import NewsFeedItemAuthor from './NewsFeedItemAuthor';
import NewsFeedItemEvent from './NewsFeedItemEvent';
import NewsFeedItemFooter from './NewsFeedItemFooter';
import NewsFeedItemHeader from './NewsFeedItemHeader';
import NewsFeedItemImage from './NewsFeedItemImage';

type Props = {
  isDetail: boolean,
  item: Post,
  // TODO: move this login up radius
  radius?: number,
  user: User,
  // TODO better types for these methods. Some of them are not passed on detail screen
  navigateToCommunity(community: CommunitySimple): mixed,
  navigateToPostDetail(): mixed,
  navigateToMemberProfile(): mixed,
};

class NewsFeedItem extends Component<Props> {
  static defaultProps = {
    isDetail: false,
  };

  get userIsAuthorOfPost(): boolean {
    const { user, item } = this.props;

    return user.id === item.author.id;
  }

  renderContent({ item, isDetail }: Props) {
    const { text_content, created_at, cached_url } = item;
    return (
      <View>
        {(item.attachment && item.attachment.type === 'link') ||
        !item.attachment ? (
          <TouchableOpacity
            onPress={this.props.navigateToPostDetail}
            disabled={this.props.isDetail}
          >
            <Text size={14} lineHeight={18} style={css('color', '#455A64')}>
              {parseTextContent(text_content || '', isDetail ? null : 120)}
            </Text>
          </TouchableOpacity>
        ) : null}

        {item.attachment && item.attachment.type.includes('image') ? (
          <NewsFeedItemImage
            {...item.attachment}
            title={text_content}
            isDetail={isDetail}
            onPress={this.props.navigateToPostDetail}
          />
        ) : null}

        {cached_url ? (
          isDetail ? (
            <TouchableOpacity onPress={() => Linking.openURL(cached_url.url)}>
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
    const { item, isDetail, radius } = this.props;
    const { author, event } = item;
    // TODO move green border logic outside of this component
    return (
      <ShadowView
        style={this.userIsAuthorOfPost ? styles.borderGreen : undefined}
        radius={radius || 3}
      >
        <View style={styles.container}>
          <NewsFeedItemHeader
            item={item}
            navigateToCommunity={this.props.navigateToCommunity}
          />

          {this.renderContent(this.props)}

          {author ? (
            <View style={styles.authorAvatar}>
              <NewsFeedItemAuthor
                detailView={this.props.isDetail}
                author={author}
                onPress={this.props.navigateToMemberProfile}
              />
            </View>
          ) : null}

          {/*
          TODO: onhold for now
          {donation ? (
            <NewsFeedItemDonation
              {...donation}
              onDonatePress={() => console.log('donate')}
            />
          ) : null} */}

          {event ? <NewsFeedItemEvent {...event} /> : null}

          <NewsFeedItemFooter
            item={item}
            isDetail={isDetail}
            navigateToPostDetail={this.props.navigateToPostDetail}
          />
        </View>
      </ShadowView>
    );
  }
}

const mapState = state => ({
  user: selectUser(state),
});

export default connect(mapState)(NewsFeedItem);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 3,
    paddingHorizontal: 15,
  },
  authorAvatar: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  borderGreen: {
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
