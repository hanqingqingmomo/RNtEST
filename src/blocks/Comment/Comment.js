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
import { css } from '../../utils/style';
import { selectUser } from '../../redux/selectors';
import { makeDeleteCommentReq } from '../../utils/requestFactory';
import Replies from './Replies';

// import CommentAttachment from './CommentAttachment';

type Setting = {
  label: string,
  iconName: IconName,
  key: 'pin' | 'delete' | 'share',
};

type P = {
  data: TComment,
  onMorePress: TComment => void,
  onReplyPress?: Function,
  user: User,
  reloadPost: Function,
};

type S = {
  showReplies: boolean,
  deleting: boolean,
};

const AVATAR_SIZE = 25;
const SETTINGS = [
  // {
  //   key: 'share',
  //   label: 'Share',
  //   iconName: 'share',
  // },
  // {
  //   key: 'pin',
  //   label: 'Pin',
  //   iconName: 'pin',
  // },
  {
    key: 'delete',
    label: 'Delete',
    iconName: 'delete',
  },
];

const mapStateToProps = state => ({
  user: selectUser(state),
});

@connect(mapStateToProps)
export default class Comment extends React.Component<P, S> {
  state = {
    showReplies: false,
    deleting: false,
  };

  get isUserAuthorOfPost(): boolean {
    const { data, user } = this.props;

    return data.author.id === user.id;
  }

  get settings(): Array<*> {
    return SETTINGS.map((setting: Setting) => ({
      label: () => this.renderSettings(setting),
      onPress: () => this.onSettingPress(setting),
    }));
  }

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

  onSettingPress = async (setting: Setting) => {
    switch (setting.key) {
      case 'delete':
        this.deleteComment();
        break;
      default:
    }
  };

  deleteComment = async () => {
    const { data } = this.props;

    const deleteCommentReq = makeDeleteCommentReq(data.id);

    this.setState({ deleting: true });

    try {
      await global.fetch(deleteCommentReq.url, deleteCommentReq.options);
      this.setState({ deleting: false });
      this.props.reloadPost();
    } catch (err) {}
  };

  onCommentPress = () => {};

  viewAllReplies = () => {
    this.setState({ showReplies: !this.state.showReplies });
  };

  render() {
    const { data, onReplyPress } = this.props;
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
            {this.isUserAuthorOfPost ? (
              this.state.deleting ? (
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
              )
            ) : null}
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
            <Replies replies={data.replies} />
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
    paddingVertical: 5,
  },
  headerInfoReply: {
    flexGrow: 1,
    alignItems: 'flex-end',
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
