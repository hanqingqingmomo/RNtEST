// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { type Comment as TComment } from '../../Types';
import {
  Avatar,
  Icon,
  Like,
  Text,
  TimeAgo,
  TouchableItem,
  View,
} from '../../atoms';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';

// import CommentAttachment from './CommentAttachment';

type P = {
  data: TComment,
  onReplyPress?: Function,
  onMorePress: TComment => void,
};

type S = {
  showReplies: boolean,
};

const AVATAR_SIZE = 25;

export default class Comment extends React.Component<P, S> {
  state = {
    showReplies: false,
  };

  onCommentPress = () => {};

  viewAllReplies = () => {
    this.setState({ showReplies: !this.state.showReplies });
  };

  render() {
    const { data, onReplyPress, onMorePress } = this.props;
    const isReply = !onReplyPress;

    return (
      <View
        style={[
          styles.flexRow,
          !isReply ? styles.container : styles.containerReply,
        ]}
      >
        <View style={styles.avatarWrapper}>
          <Avatar imageURI={data.author.profile_photo} size={AVATAR_SIZE} />
        </View>

        <View
          style={
            !isReply ? styles.containerWrapper : styles.containerWrapperReply
          }
        >
          <View style={[styles.alignItemsCenter, styles.flexRow]}>
            <View
              style={[
                !isReply ? styles.headerInfo : styles.headerInfoReply,
                styles.flexRow,
              ]}
            >
              <Text
                size={13}
                lineHeight={15}
                weight="600"
                style={[styles.authorName, css('color', '#455A64')]}
              >
                {data.author.first_name} {data.author.last_name}
              </Text>
              <Text
                size={11}
                weight="500"
                lineHeight={13}
                style={css('color', getColor('gray'))}
              >
                <TimeAgo date={data.created_at} />
              </Text>
            </View>
            <TouchableItem onPress={onMorePress}>
              <Icon name="menu" size={24} color="#CFD8DC" />
            </TouchableItem>
          </View>

          <Text size={14} lineHeight={18} style={css('color', '#455A64')}>
            {data.text_content}
          </Text>

          {/* TODO comment attachment
            <CommentAttachment
              imageURI="https://www.muprint.com/wp-content/uploads/2016/12/pdf-icon-png-pdf-zum-download-2.png"
              title="Computer Hardware Desktops And Notebooks And Handhelds"
              date={new Date()}
              comments={8}
              onCommentPress={this.onCommentPress}
            />
          */}

          <View
            style={[styles.footer, styles.flexRow, styles.alignItemsCenter]}
          >
            <View
              style={[
                styles.footerLeft,
                styles.flexRow,
                styles.alignItemsCenter,
              ]}
            >
              <View style={styles.likeWrapper}>
                <Like
                  count={data.likes_count}
                  liked={data.liked}
                  iconName="like"
                  objectId={data.id}
                />
              </View>

              {!isReply && (
                <Text
                  onPress={onReplyPress}
                  size={13}
                  lineHeight={18}
                  style={[
                    styles.replyButton,
                    css('color', getColor('linkBlue')),
                  ]}
                >
                  Reply
                </Text>
              )}
            </View>

            {!isReply && data.comments_count ? (
              <Text
                size={13}
                lineHeight={18}
                color="gray"
                onPress={this.viewAllReplies}
              >
                {data.comments_count === 1
                  ? 'View 1 Reply'
                  : `View All ${data.comments_count} Replies`}
              </Text>
            ) : null}
          </View>

          {!isReply && this.state.showReplies ? (
            <View>
              {data.replies.map(reply => (
                <Comment
                  key={reply.id}
                  data={reply}
                  onMorePress={(...args) => console.log('more', args)}
                />
              ))}
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  authorName: {
    marginRight: 10,
  },
  containerWrapper: {
    borderBottomWidth: 1,
    borderColor: '#EDEFF2',
    flex: 1,
    paddingBottom: 12,
  },
  containerWrapperReply: {
    flex: 1,
    paddingTop: 5,
  },
  avatarWrapper: {
    paddingRight: 11,
  },
  headerInfo: {
    flexGrow: 1,
    alignItems: 'flex-end',
  },
  headerInfoReply: {
    flexGrow: 1,
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  container: {
    paddingTop: 12,
    paddingHorizontal: 15,
  },
  containerReply: {
    paddingTop: 12,
  },
  likeWrapper: {
    paddingRight: 10,
  },
  footer: {
    marginTop: 12,
  },
  footerLeft: {
    flexGrow: 1,
  },
  replyButton: {
    marginLeft: 10,
  },
});
