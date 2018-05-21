// @flow

import React, { Component } from 'react';
import { StyleSheet, TextInput, Platform } from 'react-native';

import { Text, TouchableItem, View, Icon } from '../atoms';
import { type Comment } from '../Types';
import { css } from '../utils/style';

type Props = {
  busy: boolean,
  onCreateComment: Function,
  onReplyCancel: Function,
  passRef: Function,
  target: { id: string } | Comment,
};

type State = {
  height: number,
  value: string,
};

const MIN_INPUT_HEIGHT = 32;
const MAX_INPUT_HEIGHT = MIN_INPUT_HEIGHT * 3;

export default class CommentInput extends Component<Props, State> {
  state = {
    height: MIN_INPUT_HEIGHT,
    value: '',
  };

  get disabled(): boolean {
    return !!this.props.busy || this.state.value === '';
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.busy && !nextProps.busy) {
      this.setState({ value: '' });
      this.props.onReplyCancel();
    }
  }

  onChangeText = (value: string) => {
    this.setState({ value });
  };

  onContentSizeChange = (e: Object) => {
    const height = Math.max(MIN_INPUT_HEIGHT, e.nativeEvent.contentSize.height);
    this.setState({ height });
  };

  handleSubmit = () => {
    this.props.onCreateComment(this.props.target.id, this.state.value);
  };

  renderReplyIndicator = () => {
    const { target, onReplyCancel } = this.props;

    return target.type ? (
      <View style={styles.replyIndicatorContainer}>
        <Text size={12} style={css('color', '#8fa3ad')}>
          {`Replying to ${target.author.first_name} ${target.author
            .last_name}   `}
          <Icon name="close" size={12} color="red" onPress={onReplyCancel} />
        </Text>
      </View>
    ) : null;
  };

  renderInputAndActions = (inputStyle: Object) => {
    return (
      <View style={styles.inputRow}>
        <View style={styles.inputBubble}>
          <TextInput
            ref={this.props.passRef}
            multiline
            placeholder="Participate"
            placeholderTextColor="#8fa3ad"
            style={[styles.input, inputStyle]}
            value={this.state.value}
            underlineColorAndroid="transparent"
            onChangeText={this.onChangeText}
            onContentSizeChange={this.onContentSizeChange}
          />
        </View>

        <TouchableItem
          disabled={this.disabled}
          onPress={this.handleSubmit}
          style={styles.sendButton}
        >
          <Text
            size={17}
            color="orange"
            style={
              this.props.busy || !this.state.value
                ? css('opacity', 0.5)
                : undefined
            }
          >
            {this.props.busy ? 'Sending' : 'Send'}
          </Text>
        </TouchableItem>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderReplyIndicator()}
        {this.renderInputAndActions(
          Platform.select({
            android: { height: this.state.height },
            ios: {},
          })
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: -2 },
        shadowColor: 'rgba(117,120,128,0.15)',
        shadowOpacity: 1,
        shadowRadius: 10,
      },
      android: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(117,120,128,0.5)',
      },
    }),
  },
  inputRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    flexGrow: 1,
    alignItems: 'center',
  },
  inputBubble: {
    flex: 1,
    paddingRight: 15,
  },
  input: {
    borderRadius: 16,
    fontSize: 14,
    color: '#455a64',
    backgroundColor: '#edf0f2',
    paddingHorizontal: 15,
    maxHeight: MAX_INPUT_HEIGHT,
    ...Platform.select({
      ios: {
        paddingTop: 7,
        paddingBottom: 8,
      },
      android: {
        paddingTop: 2,
        paddingBottom: 2,
      },
    }),
  },
  replyIndicatorContainer: {
    paddingHorizontal: 15,
    paddingTop: 5,
  },
});
