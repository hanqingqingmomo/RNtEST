// @flow

import React, { Component } from 'react';
import { StyleSheet, TextInput, Platform } from 'react-native';
import { connect } from 'react-redux';

import { Text, TouchableItem, View, Icon } from '../../atoms';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';
import { selectRequest } from '../../redux/selectors';
import { createComment } from '../../redux/ducks/contentObject';
import { type Comment } from '../../Types';

type Props = {
  target: { id: string, type: 'post' } | Comment,
  onReplyCancel: Function,
  passRef: Function,
};

type State = {
  height: number,
  text_content: string,
};

class CommentInput extends Component<Props, State> {
  state = {
    height: 0,
    text_content: '',
  };

  get busy(): boolean {
    return this.props.request && this.props.request.loading ? true : false;
  }

  get disabled(): boolean {
    return this.busy || this.state.text_content === '';
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.request &&
      this.props.request &&
      prevProps.request.loading === true &&
      this.props.request.loading === false
    ) {
      this.setState({ text_content: null });
      this.props.onReplyCancel();
    }
  }

  onChangeText = (text_content: string) => {
    this.setState({ text_content });
  };

  handleSubmit = () => {
    this.props.createComment(this.props.target.id, this.state.text_content);
  };

  render() {
    const { target, onReplyCancel, passRef } = this.props;
    const { text_content } = this.state;
    return (
      <View style={styles.container}>
        {target.type === 'comment' ? (
          <View style={styles.targetedReplyWrapper}>
            <Text size={12} style={css('color', '#8fa3ad')}>
              Replying to {target.author.first_name} {target.author.last_name}{' '}
              <Icon
                name="close"
                size={12}
                color={getColor('red')}
                onPress={onReplyCancel}
              />
            </Text>
          </View>
        ) : null}

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
            onPress={this.handleSubmit}
            style={styles.sendButton}
            disabled={this.disabled}
          >
            <Text
              size={17}
              color={getColor('orange')}
              style={this.disabled ? styles.disabled : undefined}
            >
              {this.busy ? 'Sending' : 'Send'}
            </Text>
          </TouchableItem>
        </View>
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
      borderTopWidth: 1,
      borderColor: 'rgba(117,120,128,0.15)',
    },
  }),
  inputRow: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 45,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    marginRight: 15,
    marginLeft: 10,
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
    opacity: 1,
  },
  disabled: {
    opacity: 0.5,
  },
});
