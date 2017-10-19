// @flow

import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import type { Comment as TComment } from '../../Types';
import { Text, TouchableItem, View, Icon } from '../../atoms';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';

type P = {
  replyingTo?: TComment,
  onReplyCancel: Function,
  passRef: Function,
};

type S = {
  content: string,
};

export default class CommentInput extends Component<P, S> {
  state = {
    content: '',
  };

  onSubmit = () => {
    this.setState({ content: '' });
  };

  onChange = (content: string) => {
    this.setState({ content });
  };

  render() {
    const { replyingTo, onReplyCancel, passRef } = this.props;
    const { content } = this.state;

    return (
      <View style={styles.container}>
        {!!replyingTo && (
          <View style={styles.targetedReplyWrapper}>
            <Text size={12} style={css('color', '#8fa3ad')}>
              Replying to {replyingTo.author.first_name}{' '}
              {replyingTo.author.last_name}
              <Icon
                name="close"
                size={12}
                color={getColor('red')}
                onPress={onReplyCancel}
              />
            </Text>
          </View>
        )}
        <View style={styles.inputRow}>
          <TextInput
            multiline
            onChangeText={this.onChange}
            placeholder="Participate"
            placeholderTextColor="#8fa3ad"
            ref={passRef}
            returnKeyType="send"
            style={styles.input}
            value={content}
          />
          <TouchableItem onPress={this.onSubmit} style={styles.sendButton}>
            <Text size={17} style={css('color', getColor('orange'))}>
              Send
            </Text>
          </TouchableItem>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    shadowOffset: { width: 0, height: -2 },
    shadowColor: 'rgba(117,120,128,0.15)',
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  inputRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  input: {
    flexGrow: 1,
    marginRight: 15,
    paddingVertical: 8,
    paddingHorizontal: 13,
    fontSize: 14,
    lineHeight: 22,
    backgroundColor: 'rgb(237,240,242)',
    borderRadius: 16,
    color: 'rgb(69,90,100)',
  },
  targetedReplyWrapper: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  sendButton: {
    marginTop: 4,
  },
});
