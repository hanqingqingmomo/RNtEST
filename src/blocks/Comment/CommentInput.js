// @flow

import React, { Component } from 'react';
import { StyleSheet, TextInput, Platform } from 'react-native';

import type { Comment as TComment, FetchProps } from '../../Types';
import { Fetch, Text, TouchableItem, View, Icon } from '../../atoms';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';
import { makeCreateCommentReq } from '../../utils/requestFactory';

type P = {
  postId: string,
  replyingTo?: TComment,
  onReplyCancel: Function,
  onSubmitSuccess: Function,
  passRef: Function,
};

type S = {
  text_content: string,
  height: number,
};

export default class CommentInput extends Component<P, S> {
  state = {
    text_content: '',
    height: 0,
  };

  onChangeText = (text_content: string) => {
    this.setState({ text_content });
  };

  handleSubmit = (fetch: any) => async () => {
    const { postId, replyingTo, onSubmitSuccess } = this.props;

    const createCommentReq = makeCreateCommentReq(
      replyingTo ? replyingTo.id : postId,
      {
        text_content: this.state.text_content,
      }
    );

    const createCommentRes = await fetch(
      createCommentReq.url,
      createCommentReq.options
    );

    if (!createCommentRes.error) {
      onSubmitSuccess();
    }
  };

  get isAllowedToSubmit(): boolean {
    return !!this.state.text_content;
  }

  render() {
    const { replyingTo, onReplyCancel, passRef } = this.props;
    const { text_content } = this.state;

    return (
      <Fetch manual>
        {({ loading, error, fetch }: FetchProps<*>) => {
          const disabled = !this.isAllowedToSubmit || !!loading;

          return (
            <View style={styles.container}>
              {!!replyingTo && (
                <View style={styles.targetedReplyWrapper}>
                  <Text size={12} style={css('color', '#8fa3ad')}>
                    Replying to {replyingTo.author.first_name}{' '}
                    {replyingTo.author.last_name}{' '}
                    <Icon
                      name="close"
                      size={12}
                      color={getColor('red')}
                      onPress={onReplyCancel}
                    />
                  </Text>
                </View>
              )}
              {!!error && (
                <View style={styles.targetedReplyWrapper}>
                  <Text size={12} style={css('color', '#ff1744')}>
                    {error.message}
                  </Text>
                </View>
              )}
              <View style={styles.inputRow}>
                <TextInput
                  multiline
                  onChangeText={this.onChangeText}
                  onContentSizeChange={e =>
                    this.setState({ height: e.nativeEvent.contentSize.height })}
                  placeholder="Participate"
                  placeholderTextColor="#8fa3ad"
                  ref={passRef}
                  style={[styles.input, { height: this.state.height }]}
                  value={text_content}
                  underlineColorAndroid="transparent"
                />
                <TouchableItem
                  onPress={this.handleSubmit(fetch)}
                  style={styles.sendButton}
                  disabled={disabled}
                >
                  <Text
                    size={17}
                    color={getColor('orange')}
                    style={disabled ? styles.disabled : undefined}
                  >
                    Send
                  </Text>
                </TouchableItem>
              </View>
            </View>
          );
        }}
      </Fetch>
    );
  }
}

const styles = StyleSheet.create({
  container: Platform.select({
    ios: {
      shadowOffset: { width: 0, height: -2 },
      shadowColor: 'rgba(117,120,128,0.15)',
      shadowOpacity: 1,
      shadowRadius: 10,
    },
    android: {
      borderTopWidth: 1,
      borderColor: 'rgba(117,120,128,0.15)',
    },
  }),
  inputRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    marginRight: 15,
    paddingVertical: 6,
    paddingHorizontal: 13,
    fontSize: 14,
    lineHeight: 22,
    minHeight: 30,
    backgroundColor: '#edf0f2',
    borderRadius: 16,
    color: '#455a64',
  },
  targetedReplyWrapper: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  sendButton: {
    marginTop: 4,
    opacity: 1,
  },
  disabled: {
    opacity: 0.5,
  },
});
