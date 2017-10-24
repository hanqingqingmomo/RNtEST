// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { FlatList, View } from '../../atoms';
import NewsFeedItem from '../../blocks/NewsFeedItem/NewsFeedItem';

import { type CommunitySimple } from '../../Types';

type P = {
  navigation: any,
  data: Array<CommunitySimple>,
};

export default class NewsFeedList extends Component<P> {
  render() {
    const { navigation, data, ...args } = this.props;
    return (
      <View style={styles.itemsContainer}>
        <FlatList
          data={data}
          keyExtractor={(item: CommunitySimple) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <NewsFeedItem
                isBeingUpdated={false /* TODO */}
                item={item}
                navigation={navigation}
                onDelete={() => {} /* TODO */}
                refetch={() => {} /* TODO */}
                requestUpdate={() => {} /* TODO */}
              />
            </View>
          )}
          {...args}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  itemsContainer: {
    paddingTop: 10,
    flex: 1,
  },
});
