// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, Avatar, TouchableItem } from '../../atoms';
import { css } from '../../utils/style';
import { type User } from '../../Types';

type P = {
  onUserPress: Function,
  author: User,
};

const HIT_SLOP = {
  top: 6,
  right: 6,
  bottom: 6,
  left: 6,
};

export default class NewsFeedItemAuthor extends Component<P> {
  render() {
    const { author, onUserPress } = this.props;
    const { first_name, last_name, profile_photo } = author;

    return (
      <View style={[styles.container, styles.row]}>
        <TouchableItem
          onPress={onUserPress}
          style={styles.user}
          hitSlop={HIT_SLOP}
        >
          <View style={styles.row}>
            <Avatar imageURI={profile_photo} size={28} />
            <Text
              style={[styles.username, css('color', '#455A64')]}
              size={13}
              lineHeight={15}
              weight="600"
            >
              {`${first_name} ${last_name}`}
            </Text>
          </View>
        </TouchableItem>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 11,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    flexGrow: 1,
  },
  username: {
    marginLeft: 10,
  },
});
