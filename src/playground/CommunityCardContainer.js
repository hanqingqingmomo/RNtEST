// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../atoms';
import { CommunityCard } from '../atoms';

type ItemProps = {
  imageURI: string,
  isNew: boolean,
  subtitle: string,
  title: string,
};

type P = {
  items: Array<ItemProps>,
  onPress: Function,
};

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

export default class CommunityCardContainer extends React.Component<*, P, *> {
  render() {
    return (
      <View style={style.container}>
        {items.map((item, idx) => (
          <View style={style.item} key={idx}>
            <CommunityCard
              {...item}
              onPress={item => console.log('press', item)}
            />
          </View>
        ))}
      </View>
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
