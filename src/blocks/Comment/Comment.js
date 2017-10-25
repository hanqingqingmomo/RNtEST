// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import type { Comment as TComment, User, PopupSetting } from '../../Types';
import {
  ActivityIndicator,
  Avatar,
  CenterView,
  Like,
  Text,
  TimeAgo,
  View,
} from '../../atoms';
import { SettingsPopup } from '../../blocks';
import { getColor } from '../../utils/color';
import { selectUser } from '../../redux/selectors';
import {
  makeReportReq,
  makeDeleteCommentReq,
} from '../../utils/requestFactory';
import Replies from './Replies';

type P = {
  item: TComment,
  onReplyPress?: Function,
  user: User,
  requestDelete: Function,
  deleteSuccessful: Function,
  isBeingDeleted: boolean,
  requestUpdate: Function,
  updateSuccessful: Function,
  isBeingUpdated: boolean,
  reloadPost: Function,
};

type S = {
  showReplies: boolean,
  updating: boolean,
};

const AVATAR_SIZE = 25;

const mapStateToProps = state => ({
  user: selectUser(state),
});

class Comment extends Component<P, S> {
  state = {
    showReplies: false,
    updating: false,
  };

  deleteComment = async () => {
    const { item, requestDelete, deleteSuccessful } = this.props;

    const deleteCommentReq = makeDeleteCommentReq(item.id);

    // requestDelete(item);

    this.setState({ updating: true });

    try {
      await global.fetch(deleteCommentReq.url, deleteCommentReq.options);
      this.setState({ updating: false });
      this.props.reloadPost();

      // deleteSuccessful(item);
    } catch (err) {}
  };

  reportComment = async () => {
    const { item } = this.props;
    const reportReq = makeReportReq({ commentId: item.id });

    this.setState({ updating: true });

    try {
      const reportResp = await global.fetch(reportReq.url, reportReq.options);

      this.setState({ updating: false });

      const resp = await reportResp.json();

      if (resp.error) {
        global.alertWithType('error', 'Ooops', resp.error);
      } else {
        global.alertWithType(
          'success',
          'Thanks!',
          'Your report has been successfully received and will be reviewed by our support staff.'
        );
      }
    } catch (err) {}
  };

  viewAllReplies = () => {
    this.setState({ showReplies: !this.state.showReplies });
  };

  getPopupSettings() {
    return [
      {
        iconName: 'delete',
        label: 'Delete',
        isHidden: ({ user, author }) => author.id !== user.id,
        onPress: this.deleteComment,
      },
      {
        iconName: 'report',
        label: 'Report',
        onPress: this.reportComment,
      },
    ].filter(
      (setting: PopupSetting) =>
        !setting.isHidden ||
        !setting.isHidden({
          user: this.props.user,
          author: this.props.item.author,
        })
    );
  }

  render() {
    const {
      item,
      onReplyPress,
      requestUpdate,
      updateSuccessful,
      isBeingUpdated,
      requestDelete,
      deleteSuccessful,
      isBeingDeleted,
    } = this.props;
    const isReply = !onReplyPress;

    const { updating } = this.state;

    return (
      <View
        style={[
          styles.flexRow,
          styles.container,
          isReply ? styles.containerReply : undefined,
        ]}
      >
        <View style={styles.avatarWrapper}>
          <Avatar imageURI={item.author.profile_photo} size={AVATAR_SIZE} />
        </View>

        <View
          style={[
            styles.containerWrapper,
            isReply ? styles.containerWrapperReply : undefined,
          ]}
        >
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
              <Text
                size={11}
                weight="500"
                lineHeight={13}
                color={getColor('gray')}
              >
                <TimeAgo date={item.created_at} />
              </Text>
            </View>
            {updating /*|| isBeingDeleted*/ ? (
              <CenterView>
                <ActivityIndicator />
              </CenterView>
            ) : (
              <SettingsPopup settings={this.getPopupSettings()} />
            )}
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
              <View style={styles.likeWrapper}>
                <Like
                  count={item.likes_count}
                  liked={item.liked}
                  item={item}
                  requestUpdate={requestUpdate}
                  updateSuccessful={updateSuccessful}
                  isBeingUpdated={isBeingUpdated}
                />
              </View>

              {onReplyPress && (
                <Text
                  onPress={() => onReplyPress(item)}
                  size={13}
                  lineHeight={18}
                  color={getColor('linkBlue')}
                  style={styles.replyButton}
                >
                  Reply
                </Text>
              )}
            </View>

            {!isReply && item.comments_count ? (
              <Text
                size={13}
                lineHeight={18}
                color="gray"
                onPress={this.viewAllReplies}
              >
                {item.comments_count === 1
                  ? 'View 1 Reply'
                  : `View All ${item.comments_count} Replies`}
              </Text>
            ) : null}
          </View>

          {!isReply && this.state.showReplies ? (
            <Replies
              replies={item.replies}
              requestDelete={requestDelete}
              deleteSuccessful={deleteSuccessful}
              isBeingDeleted={isBeingDeleted}
              requestUpdate={requestUpdate}
              updateSuccessful={updateSuccessful}
              isBeingUpdated={isBeingUpdated}
              reloadPost={this.props.reloadPost}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Comment);

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
    borderBottomWidth: 0,
    borderTopWidth: 1,
    paddingBottom: 5,
    paddingLeft: 0,
  },
  avatarWrapper: {
    paddingRight: 11,
    paddingTop: 6,
  },
  headerInfo: {
    flexGrow: 1,
    alignItems: 'flex-end',
  },
  container: {
    paddingTop: 5,
    paddingHorizontal: 15,
  },
  containerReply: {
    marginTop: 7,
    paddingHorizontal: 0,
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
