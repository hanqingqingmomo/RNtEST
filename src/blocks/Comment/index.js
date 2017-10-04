// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import type { Comment as TComment } from '../../Types';
import { View } from '../../atoms';
import { getColor } from '../../utils/color';
import ContentEntry from './ContentEntry';

type P = {
  comments: Array<TComment>,
};

type S = {
  replyToId?: number,
};

export default class Comment extends Component<void, P, S> {
  state = {
    replyToId: undefined,
  };

  input: ?any;

  onReplyPress = (replyToId: number) => {
    this.setState({ replyToId });

    if (this.input) {
      this.input.focus();
    }
  };

  onReplyCancel = () => {
    this.setState({ replyToId: undefined });

    if (this.input) {
      this.input.blur();
    }
  };

  passRef = (ref: any) => {
    this.input = ref;
  };

  render() {
    const { replyToId } = this.state;

    return (
      <View style={styles.container}>
        <ContentEntry
          isReplying={!!replyToId}
          onReplyCancel={this.onReplyCancel}
          passRef={this.passRef}
          placeholder="Participate"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: getColor('white'),
  },
});
