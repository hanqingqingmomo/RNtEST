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
  onRequestReply?: TComment => mixed,
  viewer: User,
};

type State = {
  showAllReplies: boolean,
  showOnlyLastComment: boolean,
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

function Separator() {
  return (
    <View style={[css('paddingLeft', 15), css('marginVertical', 14)]}>
      <View
        style={[
          css('height', StyleSheet.hairlineWidth),
          css('backgroundColor', '#EDEFF2'),
        ]}
      />
    </View>
  );
}

class Comment extends Component<Props, State> {
  state = {
    showAllReplies: false,
    showOnlyLastComment: false,
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

  get lastComment(): Array<TComment> {
    const replies = [...this.props.item.replies];
    const lastComment = replies.pop();

    return lastComment ? [lastComment] : [];
  }

  toggleShowAllReplies = () => {
    this.setState({
      showAllReplies: !this.state.showAllReplies,
      showOnlyLastComment: false,
    });
  };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.item.replies.length !== this.props.item.replies.length) {
      if (nextProps.item.replies.length > this.props.item.replies.length) {
        // added new comment
        this.setState({ showAllReplies: false, showOnlyLastComment: true });
      } else {
        // removed some comment
        this.setState({ showAllReplies: true });
      }
    }
  }

  render() {
    const { showAllReplies, showOnlyLastComment } = this.state;
    const { item, onRequestReply, contentLike } = this.props;

    return (
      <View>
        <View style={[styles.flexRow, css('paddingHorizontal', 15)]}>
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
                  onPress={() => contentLike(this.props.item)}
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

        <Collapsible
          collapsed={item.replies.length === 0 || showAllReplies === false}
          style={css('paddingLeft', 35)}
        >
          <View>
            <Separator />
            <CommentList replies={item.replies} />
          </View>
        </Collapsible>

        {showOnlyLastComment ? (
          <Text
            size={13}
            lineHeight={18}
            color={getColor('orange')}
            style={{ textAlign: 'center', marginTop: 30 }}
            onPress={this.toggleShowAllReplies}
          >
            {plural('Show all reply(s)', item.replies.length)}
          </Text>
        ) : null}

        <Collapsible
          collapsed={
            this.lastComment.length === 0 || showOnlyLastComment === false
          }
        >
          <View>
            <Separator />
            <CommentList replies={this.lastComment} />
          </View>
        </Collapsible>
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
