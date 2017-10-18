// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { Section } from 'react-native-tableview-simple';

import { EventCard, View } from '../../atoms';
import SectionHeader from './SectionHeader';
import { getColor } from '../../utils/color';

const mockedEvents = [
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

export default function EventsSection() {
  return (
    <View>
      <Section
        sectionPaddingBottom={0}
        sectionPaddingTop={20}
        headerComponent={
          <SectionHeader headerLeft="Events" headerRight="See All" />
        }
      />
      <View style={styles.eventsContainer}>
        {mockedEvents.map((event, idx) => (
          <View style={styles.eventItem} key={idx}>
            <EventCard
              {...event}
              onPress={event => console.log('press', event)}
              onJoin={event => console.log('join', event)}
              onInviteMember={event => console.log('invite', event)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  eventsContainer: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: getColor('white'),
  },

  eventItem: {
    paddingTop: 1,
    paddingBottom: 5,
    paddingHorizontal: 5,
    flexGrow: 1,
    width: '50%',
  },
});
