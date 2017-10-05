// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { type Comment as TComment } from '../../Types';
import { Avatar, Like, Text, TimeAgo, View } from '../../atoms';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';

type P = {
  data: TComment,
  onLikePress: () => void,
};

export default class Comment extends React.Component<void, P, void> {
  render() {
    const { data } = this.props;

    return (
      <View style={[styles.flexRow, styles.container]}>
        <View style={styles.avatarWrapper}>
          <Avatar imageURI={data.author.avatar} size={25} />
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
          </View>

          <Text size={14} lineHeight={18} style={css('color', '#455A64')}>
            {data.content}
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
                  count={10}
                  iconName="like"
                  liked
                  onPress={this.props.onLikePress}
                />
              </View>
            </View>
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
    flex: 1,
    paddingTop: 5,
  },
  avatarWrapper: {
    paddingRight: 11,
  },
  headerInfo: {
    flexGrow: 1,
    alignItems: 'flex-end',
    marginBottom: 4,
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
  footerLeft: {
    flexGrow: 1,
  },
  replyButton: {
    marginLeft: 10,
  },
});
