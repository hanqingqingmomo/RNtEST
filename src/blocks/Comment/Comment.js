// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Collapsible from 'react-native-collapsible';
import plural from 'plural-parens';

import type { Comment as TComment, User, PopupAction } from '../../Types';
import { Avatar, Text, TimeAgo, View, TouchableItem, Count } from '../../atoms';
import { PopupActions } from '../../blocks';
import { getColor } from '../../utils/color';
import { selectUser } from '../../redux/selectors';
import {
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
};

type State = {
  showReplies: boolean,
};

type ActionCollection = {
  visible?: Props => boolean,
  action: PopupAction,
};

const AVATAR_SIZE = 25;

const mapStateToProps = state => ({
  viewer: selectUser(state),
});

const mapDispatch = { contentLike, contentDestroy, contentReport };

class Comment extends Component<Props, State> {
  state = {
    showReplies: false,
  };

  toggleShowAllReplies = () => {
    this.setState({ showReplies: !this.state.showReplies });
  };

  get actions(): Array<PopupAction> {
    const collection: Array<ActionCollection> = [
      {
        visible: props => props.item.author.id === props.viewer.id,
        action: {
          key: 'delete',
          iconName: 'delete',
          label: 'Delete',
          onPress: () => this.props.contentDestroy(this.props.item),
        },
      },
      {
        action: {
          key: 'report',
          iconName: 'report',
          label: 'Report',
          onPress: () => this.props.contentReport(this.props.item),
        },
      },
    ];
    return collection
      .filter(({ visible }) => (visible ? visible(this.props) : true))
      .map(({ action }) => action);
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

export default connect(mapStateToProps, mapDispatch)(Comment);

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
