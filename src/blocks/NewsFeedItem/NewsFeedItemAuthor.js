// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Text, Avatar, Spacer, TouchableItem, View } from '../../atoms';
import { css } from '../../utils/style';
import { type User } from '../../Types';

type P = {
  onPress: Function,
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
    const { author, onPress } = this.props;
    const { first_name, last_name, profile_photo } = author;

    return (
      <TouchableItem onPress={onPress} hitSlop={HIT_SLOP}>
        <View style={styles.container}>
          <Avatar source={{ uri: profile_photo }} size={28} />
          <Spacer width={10} />
          <Text
            style={css('color', '#455A64')}
            size={13}
            lineHeight={15}
            weight="600"
          >
            {`${first_name} ${last_name}`}
          </Text>
        </View>
      </TouchableItem>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
