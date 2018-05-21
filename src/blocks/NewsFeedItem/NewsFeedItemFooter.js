// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { contentLike } from '../../redux/ducks/contentObject';
import { Text, View, TouchableOpacity, Count, AvatarGroup } from '../../atoms';
import { type Post, User } from '../../Types';
import { css } from '../../utils/style';

type Action = {
  label: string,
  onPress: Function,
};

type Props = {
  isDetail: boolean,
  item: Post,
  like: Post => mixed,
  navigateToPostDetail(): mixed,
};

const HIT_SLOP = {
  top: 2,
  right: 2,
  bottom: 2,
  left: 2,
};

class NewsFeedItemFooter extends Component<Props> {
  get actions(): Array<Action> {
    const links = [];

    if (!this.props.isDetail) {
      links.push({
        label: 'Comment',
        onPress: this.props.navigateToPostDetail,
      });
    }

    return links;
  }

  get authors(): Array<User> {
    const a = [];
    return this.props.item.replies
      .reduce((acc: Array<User>, comment: Comment) => {
        if (comment.replies.length > 0) {
          acc = [
            ...acc,
            comment.author,
            ...comment.replies.map((comment: Comment) => comment.author),
          ];
        } else {
          acc.push(comment.author);
        }

        return acc;
      }, [])
      .filter((user: User): boolean => {
        if (a.includes(user.id)) {
          return false;
        }

        a.push(user.id);

        return true;
      });
  }

  renderAvatarGroup(authors: Array<User>) {
    return (
      <View style={css('paddingRight', 15)}>
        <AvatarGroup
          imageURIs={authors.map((author: User) => author.profile_photo)}
          title={more => `+${more}`}
        />
      </View>
    );
  }

  renderActions(actions: Array<Action>) {
    return actions.map((action, idx) => (
      <View
        key={action.label}
        style={[styles.action, idx > 0 ? styles.actionWithBorder : {}]}
      >
        <TouchableOpacity onPress={action.onPress} hitSlop={HIT_SLOP}>
          <Text size={13} lineHeight={18} color="linkBlue">
            {action.label}
          </Text>
        </TouchableOpacity>
      </View>
    ));
  }

  render() {
    const { isDetail } = this.props;
    const { likes_count, comments_count, liked } = this.props.item;

    return (
      <View style={[styles.footer, styles.row]}>
        <View style={[styles.footerLeft, styles.row]}>
          <TouchableOpacity
            style={styles.likeWrapper}
            onPress={() => {
              this.props.contentLike(this.props.item);
            }}
          >
            <Count iconName="like" count={likes_count} pinned={liked} />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isDetail}
            onPress={this.props.navigateToPostDetail}
            style={styles.likeWrapper}
          >
            <Count iconName="comment" count={comments_count} />
          </TouchableOpacity>
        </View>
        <View style={[styles.actionsWrapper]}>
          {this.props.isDetail
            ? this.renderAvatarGroup(this.authors)
            : this.renderActions(this.actions)}
        </View>
      </View>
    );
  }
}

export default connect(null, { contentLike })(NewsFeedItemFooter);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  footer: {
    paddingVertical: 7,
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ECEFF1',
  },
  likeWrapper: {
    paddingHorizontal: 8,
  },
  footerLeft: {
    flexGrow: 1,
    marginHorizontal: -8,
    paddingVertical: 3,
  },
  actionsWrapper: {
    marginHorizontal: -15,
    flexDirection: 'row',
  },
  action: {
    paddingHorizontal: 15,
  },
  actionWithBorder: {
    borderLeftWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ECEFF1',
  },
});
