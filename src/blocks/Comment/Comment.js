// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import type { Comment } from '../../Types';
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

import Attachment from './Attachment';

type P = {
  data: Comment,
  onReplyRequested: Comment => void,
  onMorePress: Comment => void,
};

const AVATAR_SIZE = 25;

export default class CommentItem extends React.Component<void, P, void> {
  onReplyRequested = () => {
    this.props.onReplyRequested(this.props.data);
  };

  onMorePress = () => {
    this.props.onMorePress(this.props.data);
  };

  onLikePress = () => {};

  onCommentPress = () => {};

  render() {
    const { data } = this.props;

    return (
      <View style={[styles.flexRow, styles.container]}>
        <View style={styles.avatarWrapper}>
          <Avatar imageURI={data.author.avatar} size={AVATAR_SIZE} />
        </View>

        <View style={styles.containerWrapper}>
          <View style={[styles.alignItemsCenter, styles.flexRow]}>
            <View style={[styles.headerInfo, styles.flexRow]}>
              <Text
                size={13}
                lineHeight={15}
                weight="600"
                style={[styles.authorName, css('color', '#455A64')]}
              >
                {data.author.name}
              </Text>
              <Text
                size={11}
                weight="500"
                lineHeight={13}
                style={css('color', getColor('gray'))}
              >
                <TimeAgo timestamp={data.timestamp} />
              </Text>
            </View>
            <TouchableItem onPress={this.onMorePress}>
              <Icon name="menu" size={24} color="#CFD8DC" />
            </TouchableItem>
          </View>

          <Text size={14} lineHeight={18} style={css('color', '#455A64')}>
            {data.content}
          </Text>

          <Attachment
            imageURI="https://www.muprint.com/wp-content/uploads/2016/12/pdf-icon-png-pdf-zum-download-2.png"
            title="Computer Hardware Desktops And Notebooks And Handhelds"
            date={new Date()}
            comments={8}
            onCommentPress={this.onCommentPress}
          />

          <View style={[styles.footer, styles.flexRow]}>
            <View style={styles.likeWrapper}>
              <Like count={10} name="like" liked onPress={this.onLikePress} />
            </View>

            {!data.parentId && (
              <Text
                onPress={this.onReplyRequested}
                size={13}
                lineHeight={18}
                style={[styles.replyButton, css('color', getColor('blue'))]}
              >
                Reply
              </Text>
            )}
          </View>
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
    paddingRight: 15,
    paddingBottom: 12,
  },
  avatarWrapper: {
    paddingLeft: 15,
    paddingRight: 11,
    paddingTop: 5,
  },
  headerInfo: {
    flexGrow: 1,
    alignItems: 'flex-end',
  },
  container: {
    paddingTop: 12,
  },
  likeWrapper: {
    paddingRight: 10,
  },
  footer: {
    marginTop: 12,
  },
  replyButton: {
    marginLeft: 10,
  },
});
