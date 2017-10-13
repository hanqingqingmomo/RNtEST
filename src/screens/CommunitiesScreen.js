// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { View, Screen, CommunityCard, TouchableItem } from '../atoms';
import { CommunitiesHeader } from './index';

const items = [
  {
    title: 'Child Care Assistance Program',
    subtitle: '12 New conversations',
    imageURI: 'https://www.w3schools.com/css/img_fjords.jpg',
    isNew: true,
  },
  {
    title: '3D Youth',
    subtitle: '12 New conversations',
    imageURI: 'https://www.w3schools.com/css/img_mountains.jpg',
  },
  {
    title: 'Young Parents Program',
    subtitle: '0 New convesations',
    imageURI: 'https://www.reduceimages.com/img/image-after.jpg',
  },
];

export default class CommunitiesScreen extends React.Component {
  render() {
    return (
      <Screen tintColor="#ECEFF1">
        <View style={style.container}>
          {items.map((item, idx) => (
            <TouchableItem
              onPress={item =>
                this.props.navigation.navigate('CommunityLandingScreen')}
              key={idx}
              style={style.item}
            >
              <CommunityCard {...item} />
            </TouchableItem>
          ))}
        </View>
      </Screen>
    );
  }
}

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  item: {
    paddingTop: 1,
    paddingBottom: 5,
    paddingHorizontal: 5,
    flexGrow: 1,
    width: '50%',
  },
});
