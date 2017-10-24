// @flow

import React from 'react';
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
  makeReportPostReq,
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
  data: TComment,
  onReplyPress?: Function,
  user: User,
  reloadPost: Function,
  requestUpdate: Function,
  isBeingUpdated: boolean,
};

type S = {
  showReplies: boolean,
  updating: boolean,
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

@connect(mapStateToProps)
export default class Comment extends React.Component<P, S> {
  state = {
    showReplies: false,
    updating: false,
  };

  get settings(): Array<*> {
    return SETTINGS.filter(
      (setting: Setting) =>
        typeof setting.isVisible === 'undefined' ||
        setting.isVisible({
          user: this.props.user,
          author: this.props.data.author,
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
    const { data } = this.props;

    const deleteCommentReq = makeDeleteCommentReq(data.id);

    this.setState({ updating: true });

    try {
      await global.fetch(deleteCommentReq.url, deleteCommentReq.options);
      this.setState({ updating: false });
      this.props.reloadPost();
    } catch (err) {}
  };

  reportComment = async () => {
    const { data } = this.props;
    const reportPostReq = makeReportPostReq(data.id);

    this.setState({ updating: true });

    try {
      const reportResp = await global.fetch(
        reportPostReq.url,
        reportPostReq.options
      );

      this.setState({ updating: false });

      const resp = await reportResp.json();

      if (resp.error) {
        global.alertWithType('error', 'Ooops', resp.error);
      } else {
        global.alertWithType(
          'success',
          'Thanks!',
          'The comment has been successfully reported.'
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
    const { data, onReplyPress, requestUpdate, isBeingUpdated } = this.props;
    const isReply = !onReplyPress;

    return (
      <View
        style={[
          styles.flexRow,
          styles.container,
          isReply ? styles.containerReply : undefined,
        ]}
      >
        <View style={styles.avatarWrapper}>
          <Avatar imageURI={data.author.profile_photo} size={AVATAR_SIZE} />
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
                {data.author.first_name} {data.author.last_name}
              </Text>
              <Text
                size={11}
                weight="500"
                lineHeight={13}
                color={getColor('gray')}
              >
                <TimeAgo date={data.created_at} />
              </Text>
            </View>
            {this.state.updating ? (
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
            {data.text_content}
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
                  count={data.likes_count}
                  liked={data.liked}
                  objectId={data.id}
                  requestUpdate={requestUpdate}
                  isBeingUpdated={isBeingUpdated}
                />
              </View>

              {!isReply && (
                <Text
                  onPress={onReplyPress}
                  size={13}
                  lineHeight={18}
                  color={getColor('linkBlue')}
                  style={styles.replyButton}
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
            <Replies
              replies={data.replies}
              reloadPost={this.props.reloadPost}
            />
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
