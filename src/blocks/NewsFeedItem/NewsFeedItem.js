// @flow

import React, { Component } from 'react';
import { StyleSheet, Linking } from 'react-native';
import { connect } from 'react-redux';

import { Text, TimeAgo, View, ShadowView, TouchableOpacity } from '../../atoms';
import { css } from '../../utils/style';
import { getColor } from '../../utils/color';
import { parseTextContent } from '../../utils/text';
import { type Post, type User } from '../../Types';
import { selectUser } from '../../redux/selectors';

import NewsFeedItemAttachment from './NewsFeedItemAttachment';
import NewsFeedItemAuthor from './NewsFeedItemAuthor';
import NewsFeedItemDonation from './NewsFeedItemDonation';
import NewsFeedItemEvent from './NewsFeedItemEvent';
import NewsFeedItemFooter from './NewsFeedItemFooter';
import NewsFeedItemHeader from './NewsFeedItemHeader';
import NewsFeedItemImage from './NewsFeedItemImage';

type P = {
  isDetail: boolean,
  item: Post,
  navigation: Object,
  radius?: number,
  onDelete: Function,
  refetch?: Function,
  user: User,
};

const mapStateToProps = state => ({
  user: selectUser(state),
});

@connect(mapStateToProps)
export default class NewsFeedItem extends Component<P> {
  static defaultProps = {
    isDetail: false,
  };

  get userIsAuthorOfPost(): boolean {
    const { user, item } = this.props;

    return user.id === item.author.id;
  }

  navigateToMemberProfileScreen = () => {
    const { navigation, item } = this.props;

    if (navigation) {
      navigation.navigate('MemberProfileScreen', {
        user: item.author,
      });
    }
  };

  navigateToPostDetail = () => {
    this.props.navigation.navigate('PostDetailScreen', {
      postId: this.props.item.id,
    });
  };

  renderContent({ item, isDetail }: P) {
    const { text_content, created_at, cached_url } = item;
    return (
      <View>
        {(item.attachment && item.attachment.type === 'link') ||
        !item.attachment ? (
          <TouchableOpacity onPress={this.navigateToPostDetail}>
            <Text size={14} lineHeight={18} style={css('color', '#455A64')}>
              {parseTextContent(text_content, isDetail ? null : 120)}
            </Text>
          </TouchableOpacity>
        ) : null}

        {item.attachment && item.attachment.type.includes('image') ? (
          <NewsFeedItemImage
            {...item.attachment}
            title={text_content}
            isDetail={isDetail}
            onPress={this.navigateToPostDetail}
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
    const { item, isDetail, navigation, radius } = this.props;
    const { author, donation, event } = item;
    // TODO move green border logic outside of this component
    return (
      <ShadowView
        style={this.userIsAuthorOfPost ? styles.borderGreen : undefined}
        radius={radius || 3}
      >
        <View style={styles.container}>
          <NewsFeedItemHeader
            item={item}
            navigation={navigation}
            onDelete={this.props.onDelete}
          />

          {this.renderContent(this.props)}

          {author ? (
            <NewsFeedItemAuthor
              detailView={this.props.isDetail}
              author={author}
              onUserPress={this.navigateToMemberProfileScreen}
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
            item={item}
            isDetail={isDetail}
            navigateToPostDetail={this.navigateToPostDetail}
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
