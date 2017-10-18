// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../../atoms';
import { NewsFeedItem } from '../../blocks';

const mockedItem = {
  tags: [
    {
      name: 'Event',
      disabled: true,
    },
    {
      name: 'Child Care...',
    },
  ],
  image: {
    title:
      'A donation is a gift given by physical or legal A donation is a gift given by physical or legal',
    imageURI:
      'https://pbs.twimg.com/profile_images/697175174651600897/fqbU2kNN.png',
  },
  donation: {
    title: 'YWCA',
    imageURI:
      'https://pbs.twimg.com/profile_images/697175174651600897/fqbU2kNN.png',
    donors: [
      {
        username: 'Maurice Ramirez',
        imageURI:
          'https://www.m3sm.co.uk/wp-content/uploads/2016/06/avatar-m3sm-fahd.jpg',
      },
      {
        username: 'Maurice Ramirez',
        imageURI:
          'https://www.m3sm.co.uk/wp-content/uploads/2016/06/avatar-m3sm-fahd.jpg',
      },
      {
        username: 'Maurice Ramirez',
        imageURI:
          'https://www.m3sm.co.uk/wp-content/uploads/2016/06/avatar-m3sm-fahd.jpg',
      },
      {
        username: 'Maurice Ramirez',
        imageURI:
          'https://www.m3sm.co.uk/wp-content/uploads/2016/06/avatar-m3sm-fahd.jpg',
      },
    ],
  },
};

export default function CommunityNewsfeed() {
  return (
    <View style={styles.itemsContainer}>
      <View style={styles.newsFeedItem}>
        <NewsFeedItem {...mockedItem} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemsContainer: {
    backgroundColor: '#ECEFF1',
    margin: 0,
    padding: 10,
    paddingBottom: 0,
  },

  newsFeedItem: {
    paddingBottom: 10,
  },
});
