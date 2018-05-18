// @flow

import React, { Component } from 'react';
import { StyleSheet, TextInput, Platform } from 'react-native';
import { connect } from 'react-redux';

import { Text, TouchableItem, View, Icon } from '../../atoms';
import { selectRequest } from '../../redux/selectors';
import { createComment } from '../../redux/ducks/contentObject';
import { type Comment } from '../../Types';
import { css } from '../../utils/style';

type Props = {
  target: { id: string, type: 'post' } | Comment,
  onReplyCancel: Function,
  passRef: Function,
  type?: 'comment' | 'event',
  createComment: typeof createComment,
  onCreateComment: Function,
  busy?: Object,
};

type State = {
  height: ?number,
  value: string,
};

const MAX_INPUT_HEIGHT = 80;
const MIN_INPUT_HEIGHT = 32;

class CommentInput extends Component<Props, State> {
  state = {
    height: null,
    value: '',
  };

  get busy(): boolean {
    const req = this.props.busy || this.props.request;
    return req && req.loading ? true : false;
  }

  get disabled(): boolean {
    return this.busy || this.state.value === '';
  }

  componentDidUpdate(prevProps, prevState) {
    const prevReq = prevProps.busy || prevProps.request;
    const thisReq = this.props.busy || this.props.request;

    if (
      prevReq &&
      thisReq &&
      prevReq.loading === true &&
      thisReq.loading === false
    ) {
      this.setState({ value: '' });
      this.props.onReplyCancel();
    }
  }

  onChangeText = (value: string) => {
    this.setState({ value });
  };

  onContentSizeChange = e => {
    const height = Math.max(MIN_INPUT_HEIGHT, e.nativeEvent.contentSize.height);
    this.setState({ height });
  };

  handleSubmit = () => {
    const { target, type } = this.props;

    if (type === 'event') {
      this.props.onCreateComment(target.id, this.state.value);
    } else {
      // TODO move to parent
      this.props.createComment(target.id, this.state.value);
    }
  };

  renderReplyIndicator = () => {
    const { target, onReplyCancel } = this.props;
    return target.type !== 'comment' ? null : (
      <View style={styles.replyIndicatorContainer}>
        <Text size={12} style={css('color', '#8fa3ad')}>
          {`Replying to ${target.author.first_name} ${target.author
            .last_name}   `}
          <Icon name="close" size={12} color="red" onPress={onReplyCancel} />
        </Text>
      </View>
    );
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
          style={[
            styles.sendButton,
            this.disabled
              ? styles.sendButtonDisabled
              : styles.sendButtonEnabled,
          ]}
        >
          <Text size={17} color="orange">
            {this.busy ? 'Sending' : 'Send'}
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

export default connect(
  state => ({
    request: selectRequest('req:content-object:create', state),
  }),
  { createComment }
)(CommentInput);

const styles = StyleSheet.create({
  container: Platform.select({
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
  inputRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  inputBubble: {
    flexGrow: 1,
    marginRight: 15,
    maxHeight: MAX_INPUT_HEIGHT,
  },
  input: {
    borderRadius: 16,
    fontSize: 14,
    color: '#455a64',
    backgroundColor: '#edf0f2',
    paddingHorizontal: 15,
    minHeight: 32,
    maxHeight: '100%',
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
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  sendButton: {
    height: MIN_INPUT_HEIGHT,
    justifyContent: 'center',
  },
  sendButtonDisabled: {},
  sendButtonEnabled: {
    opacity: 0.5,
  },
});
