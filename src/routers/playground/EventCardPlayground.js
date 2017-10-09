// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../../atoms';
import { EventCard } from '../../atoms';

type ItemProps = {
  endDate?: Date,
  imageURI: string,
  isCommunityMember: boolean,
  isLive?: boolean,
  members: number,
  startDate: Date,
  title: string,
};

type P = {
  items: Array<ItemProps>,
  onInviteMember: P => void,
  onJoin: P => void,
  onPress: P => void,
};

const items = [
  {
    title: 'Child Care Provider Training & Assistance',
    startDate: new Date(),
    endDate: new Date(),
    members: 57,
    imageURI: 'https://www.w3schools.com/css/img_fjords.jpg',
    isLive: true,
    isCommunityMember: false,
  },
  {
    title: 'Open Lab @ YWCA Julian Grace Center',
    startDate: new Date(),
    endDate: new Date(),
    members: 35,
    imageURI: 'https://www.w3schools.com/css/img_fjords.jpg',
    isCommunityMember: true,
  },
];

export default class EventCardPlayground extends Component<P> {
  static navigationOptions = { title: 'Event card' };
  render() {
    return (
      <View style={style.container}>
        {items.map((item, idx) => (
          <View style={style.item} key={idx}>
            <EventCard
              {...item}
              onPress={item => console.log('press', item)}
              onJoin={item => console.log('join', item)}
              onInviteMember={item => console.log('invite', item)}
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
