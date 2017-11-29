// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { FlatList, View } from '../../atoms';
import NewsFeedItem from '../../blocks/NewsFeedItem/NewsFeedItem';

import type { Post } from '../../Types';

type Props = {
  data: Array<Post>,
  // TODO remove renderItemProps
  renderItemProps: Object,
};

function ItemSeparatorComponent() {
  return <View style={styles.separator} />;
}

export default class NewsFeedList extends Component<Props> {
  // TODO move keyExtractor to parent
  keyExtractor = (item: Post): string => item.id;

  renderItem = ({ item }: { item: Post }) => (
    <View style={{ paddingHorizontal: 10 }}>
      <NewsFeedItem item={item} {...this.props.renderItemProps} />
    </View>
  );

  render() {
    const { data, renderItemProps, ...bag } = this.props;

    return (
      <FlatList
        data={data}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={ItemSeparatorComponent}
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
