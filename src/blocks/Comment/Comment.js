// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import {
  type Comment as TComment,
  type User,
  type IconName,
} from '../../Types';
import {
  ActivityIndicator,
  Avatar,
  CenterView,
  Icon,
  Like,
  Popover,
  PopoverItem,
  Text,
  TimeAgo,
  View,
} from '../../atoms';
import { getColor } from '../../utils/color';
import { selectUser } from '../../redux/selectors';
import {
  makeReportReq,
  makeDeleteCommentReq,
} from '../../utils/requestFactory';
import Replies from './Replies';

type Setting = {
  label: string,
  iconName: IconName,
  isVisible: Function,
  key: 'delete' | 'report',
};

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
};

type S = {
  showReplies: boolean,
  isBeingReported: boolean,
};

const AVATAR_SIZE = 25;
const SETTINGS = [
  {
    key: 'delete',
    label: 'Delete',
    iconName: 'delete',
    isVisible: ({ user, author }) => isUserAuthorOfPost(user, author),
  },
  {
    key: 'report',
    label: 'Report',
    iconName: 'report',
  },
];

function isUserAuthorOfPost(user, author): boolean {
  return author.id === user.id;
}

const mapStateToProps = state => ({
  user: selectUser(state),
});

class Comment extends Component<P, S> {
  state = {
    showReplies: false,
    isBeingReported: false,
  };

  get settings(): Array<*> {
    return SETTINGS.filter(
      (setting: Setting) =>
        typeof setting.isVisible === 'undefined' ||
        setting.isVisible({
          user: this.props.user,
          author: this.props.item.author,
        })
    ).map((setting: Setting) => ({
      label: () => this.renderSettings(setting),
      onPress: () => this.onSettingPress(setting),
    }));
  }

  onSettingPress = async (setting: Setting) => {
    switch (setting.key) {
      case 'delete':
        this.deleteComment();
        break;
      case 'report':
        this.reportComment();
        break;
      default:
    }
  };

  deleteComment = async () => {
    const { item, requestDelete, deleteSuccessful } = this.props;

    const deleteCommentReq = makeDeleteCommentReq(item.id);

    requestDelete(item);

    try {
      await global.fetch(deleteCommentReq.url, deleteCommentReq.options);
      deleteSuccessful(item);
    } catch (err) {}
  };

  reportComment = async () => {
    const { item } = this.props;
    const reportReq = makeReportReq({ commentId: item.id });

    this.setState({ isBeingReported: true });

    try {
      const reportResp = await global.fetch(reportReq.url, reportReq.options);

      this.setState({ isBeingReported: false });

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

  renderSettings = ({
    label,
    iconName,
    ...args
  }: Setting): React$Element<*> => {
    return (
      <PopoverItem
        {...args}
        contentView={label}
        imageView={<Icon name={iconName} color="#B0BEC5" size="md" />}
      />
    );
  };

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

    const { isBeingReported } = this.state;

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
            {isBeingReported || isBeingDeleted ? (
              <CenterView>
                <ActivityIndicator />
              </CenterView>
            ) : (
              <Popover
                labels={this.settings}
                button={
                  <View style={{ padding: 6 }}>
                    <Icon name="menu" color="#CFD8DC" size={24} />
                  </View>
                }
              />
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
