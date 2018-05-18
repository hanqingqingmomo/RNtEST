// @flow

import React, { Component } from 'react';
import { StyleSheet, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import Collapsible from 'react-native-collapsible';
import plural from 'plural-parens';

import type { Comment as TComment, User, PopupAction } from '../../Types';
import { Avatar, Text, TimeAgo, View, TouchableItem, Count } from '../../atoms';
import { PopupActions } from '../../blocks';
import { getColor } from '../../utils/color';
import { selectUser } from '../../redux/selectors';
import { css } from '../../utils/style';
import CommentList from './CommentList';
import {
  destroyContentObjectReq,
  likeContentObjectReq,
  unlikeContentObjectReq,
  reportReq,
} from '../../utils/requestFactory';

type Props = {
  item: TComment,
  onRequestReply?: TComment => mixed,
  viewer: User,
};

type State = {
  showAllReplies: boolean,
  showOnlyLastComment: boolean,
  item: TComment,
};

type ActionCollection = {
  visible?: Props => boolean,
  action: PopupAction,
};

const AVATAR_SIZE = 25;

const mapStateToProps = state => ({
  viewer: selectUser(state),
});

class Comment extends Component<Props, State> {
  state = {
    showAllReplies: false,
    showOnlyLastComment: false,
    item: this.props.item,
  };

  get actions(): Array<PopupAction> {
    const collection: Array<ActionCollection> = [
      {
        visible: props => props.item.author.id === props.viewer.id,
        action: {
          key: 'delete',
          iconName: 'delete',
          label: 'Delete',
          onPress: () => this.onDeleteComment(),
        },
      },
      {
        action: {
          key: 'report',
          iconName: 'report',
          label: 'Report',
          onPress: () => this.onReport(),
        },
      },
    ];
    return collection
      .filter(({ visible }) => (visible ? visible(this.props) : true))
      .map(({ action }) => action);
  }

  get lastComment(): Array<TComment> {
    const replies = [...this.props.item.replies];
    const lastComment = replies.pop();

    return lastComment ? [lastComment] : [];
  }

  onDeleteComment = async () => {
    const { item } = this.props;

    try {
      const { ok } = await destroyContentObjectReq(item);

      if (ok) {
        DeviceEventEmitter.emit('delete comment', item);
      }
    } catch (err) {
      global.alertWithType('error', 'Ooops', err.message);
    }
  };

  onReport = async () => {
    const { item } = this.props;

    try {
      const { ok } = await reportReq(item.author.id);

      if (ok) {
        DeviceEventEmitter.emit('report comment', item);
      }
    } catch (err) {
      global.alertWithType('error', 'Ooops', err.message);
    }
  };

  onLikeComment = async () => {
    const { item } = this.state;

    try {
      const { data, ok } = item.liked
        ? await unlikeContentObjectReq(item)
        : await likeContentObjectReq(item);

      if (ok) {
        this.setState({ item: data });

        DeviceEventEmitter.emit('like comment', data);
      }
    } catch (err) {
      global.alertWithType('error', 'Ooops', err.message);
    }
  };

  toggleShowAllReplies = () => {
    this.setState({
      showAllReplies: !this.state.showAllReplies,
      showOnlyLastComment: false,
    });
  };

  onShowAllReplies = () => {
    this.setState({
      showAllReplies: true,
      showOnlyLastComment: false,
    });
  };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.item.replies.length !== this.state.item.replies.length) {
      if (nextProps.item.replies.length > this.state.item.replies.length) {
        if (nextProps.item.replies.length === 1) {
          this.setState({ showAllReplies: true });
        } else {
          this.setState({ showOnlyLastComment: true });
        }
      } else {
        this.setState({ showAllReplies: true });
      }
    }

    this.setState({ item: nextProps.item });
  }

  render() {
    const { showAllReplies, showOnlyLastComment } = this.state;
    const { onRequestReply } = this.props;
    const { item } = this.state;

    return (
      <View>
        <View style={[styles.flexRow, css('paddingHorizontal', 15)]}>
          <View style={styles.avatarWrapper}>
            <Avatar
              source={{ uri: item.author.profile_photo }}
              size={AVATAR_SIZE}
            />
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
              <PopupActions actions={this.actions} />
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
                  onPress={this.onLikeComment}
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
                  {showAllReplies
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
          </View>
        </View>

        {showOnlyLastComment ? null : (
          <Collapsible
            collapsed={item.replies.length === 0 || showAllReplies === false}
          >
            <View style={[css('paddingTop', 30), css('paddingLeft', 35)]}>
              <CommentList replies={item.replies} />
            </View>
          </Collapsible>
        )}

        {showOnlyLastComment && item.replies.length > 1 ? (
          <Text
            size={13}
            lineHeight={18}
            color={getColor('orange')}
            style={{ textAlign: 'center', marginTop: 30 }}
            onPress={this.onShowAllReplies}
          >
            {plural('Show all reply(s)', item.replies.length)}
          </Text>
        ) : null}

        <Collapsible
          collapsed={
            this.lastComment.length === 0 || showOnlyLastComment === false
          }
        >
          <View style={[css('paddingTop', 30), css('paddingLeft', 35)]}>
            <CommentList replies={this.lastComment} />
          </View>
        </Collapsible>
      </View>
    );
  }
}

export default connect(mapStateToProps, {})(Comment);

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
