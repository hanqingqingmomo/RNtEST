// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { Section } from 'react-native-tableview-simple';

import {
  Avatar,
  CommunityHeader,
  EventCard,
  Icon,
  Screen,
  ScrollView,
  Text,
  View,
} from '../atoms';
import { NewsFeedItem } from '../blocks';
import { NewsFeedConversation } from './index';
import { getColor } from '../utils/color';
import { css } from '../utils/style';

const SectionComponent = ({ headerLeft, headerRight }) => {
  return (
    <View
      style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}
    >
      <Text
        color="#90A4AE"
        style={[
          styles.headerContainer,
          styles.headerText,
          css('alignSelf', 'flex-start'),
        ]}
      >
        {headerLeft.toUpperCase()}
      </Text>
      <Text
        color={getColor('orange')}
        onPress={() => {}}
        style={[
          styles.headerContainer,
          styles.headerText,
          css('alignSelf', 'flex-end'),
        ]}
      >
        {headerRight.toUpperCase()}
      </Text>
    </View>
  );
};

const PinnedComponent = () => {
  return (
    <View style={styles.pinnedContainer}>
      <View
        style={[
          styles.shadow,
          styles.centerContent,
          css('marginLeft', 10),
          css('width', 55),
        ]}
      >
        <Avatar
          imageURI={
            'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg'
          }
          size={38}
        />
        <View
          style={[styles.editIconCircle, styles.centerContent, styles.shadow]}
        >
          <Icon name="pin" size={16} color="#90A4AE" />
        </View>
      </View>
      <View style={styles.pinnedTextContainer}>
        <Text>Don’t forget about the upcoming workshop on August 12</Text>
      </View>
    </View>
  );
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

export default class CommunityLandingScreen extends React.Component {
  render() {
    return (
      <Screen>
        <CommunityHeader
          title="Child Care Assistance Program"
          profileImageURI="https://logos-download.com/wp-content/uploads/2016/11/YWCA_logo_logotype.png"
          coverImageURI="https://www.ywcaknox.com/wp-content/uploads/photo3-407x222.jpg"
        />
        <NewsFeedConversation />
        <Section
          sectionPaddingBottom={0}
          sectionPaddingTop={20}
          headerComponent={
            <SectionComponent headerLeft="Events" headerRight="See All" />
          }
        />
        <View style={styles.eventsContainer}>
          {items.map((item, idx) => (
            <View style={styles.eventItem} key={idx}>
              <EventCard
                {...item}
                onPress={item => console.log('press', item)}
                onJoin={item => console.log('join', item)}
                onInviteMember={item => console.log('invite', item)}
              />
            </View>
          ))}
        </View>
        <Section
          sectionPaddingBottom={0}
          sectionPaddingTop={20}
          headerComponent={
            <SectionComponent headerLeft="Pinned items" headerRight="See All" />
          }
        />
        <PinnedComponent />
        <View style={styles.itemsContainer}>
          <View style={styles.newsFeedItem}>
            <NewsFeedItem
              tags={[
                {
                  name: 'Event',
                  disabled: true,
                },
                {
                  name: 'Child Care...',
                },
              ]}
              image={{
                title:
                  'A donation is a gift given by physical or legal A donation is a gift given by physical or legal',
                imageURI: require('../images/1.jpg'),
              }}
              donation={{
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
              }}
            />
          </View>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  editIconCircle: {
    position: 'absolute',
    top: 0,
    right: -8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: getColor('white'),
  },

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

  headerContainer: {
    marginHorizontal: 8,
    marginBottom: 8,
  },

  headerText: {
    lineHeight: 13,
    fontSize: 12,
    fontWeight: '600',
  },

  itemsContainer: {
    backgroundColor: '#ECEFF1',
    margin: 0,
    padding: 10,
    paddingBottom: 0,
  },

  newsFeedItem: {
    paddingBottom: 10,
  },

  pinnedContainer: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: getColor('white'),
  },

  pinnedTextContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginLeft: 10,
  },

  shadow: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
});
