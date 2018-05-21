// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import type { Comment as TComment } from '../../Types';
import { FlatList, View } from '../../atoms';
import { Comment } from '../../blocks';
import { css } from '../../utils/style';

export type Props = {
  onRequestReply?: TComment => mixed,
  replies: Array<TComment>,
};

function Separator() {
  return (
    <View style={[css('paddingLeft', 50)]}>
      <View
        style={[
          css('height', StyleSheet.hairlineWidth),
          css('backgroundColor', '#EDEFF2'),
          css('marginVertical', 14),
        ]}
      />
    </View>
  );
}

export default class CommentList extends Component<Props> {
  keyExtractor = (comment: TComment) => comment.id;

  renderItem = ({ item }: { item: TComment }) => (
    <Comment item={item} onRequestReply={this.props.onRequestReply} />
  );

  render() {
    return (
      <FlatList
        scrollEnabled={false}
        data={this.props.replies}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ItemSeparatorComponent={() => <Separator />}
      />
    );
  }
}
