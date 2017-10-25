// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { FlatList, View } from '../../atoms';

import type { Post } from '../../Types';

type Props = {
  data: Array<Post>,
  renderItem: (props: { item: Post }) => React$Node,
};

function ItemSeparatorComponent() {
  return <View style={styles.separator} />;
}

export default class NewsFeedList extends Component<Props> {
  // TODO move keyExtractor to parent
  keyExtractor = (item: Post) => item.id;

  render() {
    const { data, renderItem, ...bag } = this.props;

    return (
      <FlatList
        data={data}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={this.props.renderItem}
        {...bag}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 10,
  },
  separator: {
    height: 10,
  },
});
