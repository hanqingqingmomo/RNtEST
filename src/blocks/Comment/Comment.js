// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Collapsible from 'react-native-collapsible';
import plural from 'plural-parens';

<<<<<<< HEAD
import type { Comment as TComment, User, PopupSetting } from '../../Types';
import { Avatar, Text, TimeAgo, View, TouchableItem, Count } from '../../atoms';
=======
import type {
  Comment as TComment,
  PopupSetting,
  Store,
  User,
} from '../../Types';
import { Avatar, Like, Text, TimeAgo, View } from '../../atoms';
>>>>>>> 18ce2aa8ab31c7e35cfef4c19e1bbfe33eec406b
import { SettingsPopup } from '../../blocks';
import { getColor } from '../../utils/color';
import { selectUser } from '../../redux/selectors';
import {
<<<<<<< HEAD
  contentDestroy,
  contentLike,
  contentReport,
} from '../../redux/ducks/contentObject';
import { css } from '../../utils/style';
import CommentList from './CommentList';

type Props = {
  item: TComment,
  level: number,
  onRequestReply?: TComment => mixed,
  viewer: User,
=======
  makeReportReq,
  makeDeleteCommentReq,
} from '../../utils/requestFactory';
import Replies from './Replies';

type P = {
  deleteSuccessful: Function,
  emitAction: Function,
  isBeingDeleted: boolean,
  isBeingUpdated: boolean,
  item: TComment,
  onReplyPress?: Function,
  reloadPost: Function,
  requestDelete: Function,
  requestUpdate: Function,
  updateSuccessful: Function,
  user: ?User,
>>>>>>> 18ce2aa8ab31c7e35cfef4c19e1bbfe33eec406b
};

type State = {
  showReplies: boolean,
};

const AVATAR_SIZE = 25;

<<<<<<< HEAD
const mapStateToProps = state => ({
  viewer: selectUser(state),
});

const mapDispatch = { contentLike, contentDestroy, contentReport };

class Comment extends Component<Props, State> {
=======
class Comment extends Component<P, S> {
>>>>>>> 18ce2aa8ab31c7e35cfef4c19e1bbfe33eec406b
  state = {
    showReplies: false,
  };

  toggleShowAllReplies = () => {
    this.setState({ showReplies: !this.state.showReplies });
  };

  getPopupSettings(): Array<PopupSetting> {
    return [
      {
        key: 'delete',
        iconName: 'delete',
        label: 'Delete',
<<<<<<< HEAD
        isHidden: ({ viewer, author }) => author.id !== viewer.id,
        onPress: () => this.props.contentDestroy(this.props.item),
=======
        isHidden:
          this.props.item.author.id !==
          (this.props.user ? this.props.user.id : ''),
        onPress: this.deleteComment,
>>>>>>> 18ce2aa8ab31c7e35cfef4c19e1bbfe33eec406b
      },
      {
        key: 'report',
        iconName: 'report',
        label: 'Report',
        onPress: () => this.props.contentReport(this.props.item),
      },
<<<<<<< HEAD
    ].filter(
      (setting: PopupSetting) =>
        !setting.isHidden ||
        !setting.isHidden({
          author: this.props.item.author,
          viewer: this.props.viewer,
        })
    );
=======
    ].filter((setting: PopupSetting): boolean => !setting.isHidden);
>>>>>>> 18ce2aa8ab31c7e35cfef4c19e1bbfe33eec406b
  }

  render() {
    const { item, onRequestReply } = this.props;

    return (
      <View style={styles.flexRow}>
        <View style={styles.avatarWrapper}>
          <Avatar imageURI={item.author.profile_photo} size={AVATAR_SIZE} />
        </View>
        <View style={[styles.contentWrapper]}>
          <View style={[styles.alignItemsCenter, styles.flexRow]}>
            <View style={[styles.headerInfo, styles.flexRow]}>
              <Text
                size={13}
                lineHeight={15}
                weight="600"
                color="#455A64"
                style={styles.authorName}
              >
                {item.author.first_name} {item.author.last_name}
              </Text>

              <TimeAgo
                date={item.created_at}
                size={11}
                weight="500"
                color="gray"
              />
            </View>
<<<<<<< HEAD
            <SettingsPopup settings={this.getPopupSettings()} />
=======
            <SettingsPopup settings={this.getPopupSettings()} busy={updating} />
>>>>>>> 18ce2aa8ab31c7e35cfef4c19e1bbfe33eec406b
          </View>

          <Text size={14} lineHeight={18} color="#455A64">
            {item.text_content}
          </Text>

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
              <TouchableItem
                style={styles.likeWrapper}
                onPress={() => this.props.contentLike(this.props.item)}
              >
                <Count
                  iconName="like"
                  count={item.likes_count}
                  pinned={item.liked}
                />
              </TouchableItem>

              {onRequestReply && (
                <Text
                  onPress={() => onRequestReply(item)}
                  size={13}
                  lineHeight={18}
                  color={getColor('linkBlue')}
                  style={styles.replyButton}
                >
                  Reply
                </Text>
              )}
            </View>

            {item.replies.length > 0 ? (
              <Text
                size={13}
                lineHeight={18}
                color="gray"
                onPress={this.toggleShowAllReplies}
              >
                {this.state.showReplies
                  ? plural(
                      `Hide ${item.replies.length} reply(s)`,
                      item.replies.length
                    )
                  : plural(
                      `Show ${item.replies.length} reply(s)`,
                      item.replies.length
                    )}
              </Text>
            ) : null}
          </View>

          <Collapsible
            collapsed={
              item.replies.length === 0 || this.state.showReplies === false
            }
          >
            <View style={css('paddingTop', 30)}>
              <CommentList
                level={this.props.level + 1}
                replies={item.replies}
              />
            </View>
          </Collapsible>
        </View>
      </View>
    );
  }
}

<<<<<<< HEAD
export default connect(mapStateToProps, mapDispatch)(Comment);
=======
const mapStateToProps = (state: Store): { user: ?User } => ({
  user: selectUser(state),
});

export default connect(mapStateToProps)(Comment);
>>>>>>> 18ce2aa8ab31c7e35cfef4c19e1bbfe33eec406b

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
  contentWrapper: {
    flex: 1,
  },
  avatarWrapper: {
    paddingRight: 10,
    paddingTop: 6,
  },
  headerInfo: {
    flexGrow: 1,
    alignItems: 'flex-end',
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
