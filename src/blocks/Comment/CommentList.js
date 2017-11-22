// @flow

import React, { Component } from 'react';

import type { Comment as TComment } from '../../Types';
import { FlatList, View } from '../../atoms';
import { Comment } from '../../blocks';
import { css } from '../../utils/style';

export type Props = {
  level: number,
  // ListFooterComponent: ?(React$ComponentType<any> | React$Element<any>),
  // ListHeaderComponent: ?(React$ComponentType<any> | React$Element<any>),
  onRequestReply: TComment => mixed,
  replies: Array<TComment>,
};

function Separator(props: { level: number }) {
  return (
    <View
      style={[
        // css('backgroundColor', '#EDEFF2'),
        css('height', 30),
        // css('marginVertical', 10),
        css('marginLeft', props.level === 0 ? 50 : 35),
        css('marginRight', props.level === 0 ? 15 : 0),
      ]}
    />
  );
}

export default class CommentList extends Component<Props> {
  keyExtractor = (comment: TComment) => comment.id;

  renderItem = ({ item, ...rest }: { item: TComment }) => (
    <View style={css('paddingHorizontal', this.props.level === 0 ? 15 : 0)}>
      <Comment
        level={this.props.level}
        item={item}
        onRequestReply={this.props.onRequestReply}
      />
    </View>
  );

  render() {
    return (
      <FlatList
        scrollEnabled={false}
        data={this.props.replies}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ItemSeparatorComponent={() => <Separator level={this.props.level} />}
      />
    );
  }
}
