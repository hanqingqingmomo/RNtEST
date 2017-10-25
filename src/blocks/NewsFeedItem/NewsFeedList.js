// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { FlatList, View } from '../../atoms';

import type { CommunitySimple, Post } from '../../Types';

type Props = {
  data: Array<Post>,
  renderItem: (props: { item: Post }) => React$Node,
};

export default class NewsFeedList extends Component<Props> {
  render() {
    const { data, ...args } = this.props;
    // TODO move keyExtractor to parent
    return (
      <View style={styles.itemsContainer}>
        <FlatList
          data={data}
          keyExtractor={(item: CommunitySimple) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          {...args}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 10,
  },
  itemsContainer: {
    flex: 1,
  },
  separator: {
    height: 10,
  },
});
