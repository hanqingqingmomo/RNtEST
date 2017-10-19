// @flow

import React, { Component } from 'react';

import { Screen } from '../../atoms';
import { type User, type JoinedCommunity } from '../../Types';
import PostEditorContent from './PostEditorContent';
import PosteEditorSearchBox from './PostEditorSearchBox';

type Props = {
  user: User,
  onChange: Function,
};

export default class PostEditorScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Start New Conversation',
  };

  formData = {
    attachment: null,
    communities: [],
    text_content: '',
  };

  onChangeText = (text: string) => {
    this.formData.text_content = text;

    this.props.onChange(this.formData);
  };

  selectCommunity = (items: Array<JoinedCommunity>) => {
    this.formData.communities = items.map(item => item.id);

    this.props.onChange(this.formData);
  };

  render() {
    const { user } = this.props;

    return (
      <Screen tintColor="white">
        <PosteEditorSearchBox
          communities={user.joined_communities}
          selectCommunity={this.selectCommunity}
        />
        <PostEditorContent onChangeText={this.onChangeText} />
      </Screen>
    );
  }
}
