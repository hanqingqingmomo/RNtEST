// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import {
  CommunityHeader,
  EventCard,
  Screen,
  TableView,
  ScrollView,
  View,
} from '../atoms';
import { NewsFeedItem } from '../blocks';
import { NewsFeedConversation } from './index';

const { Table, Section, Cell } = TableView;

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
        <View style={styles.container}>
          {items.map((item, idx) => (
            <View style={styles.item} key={idx}>
              <EventCard
                {...item}
                onPress={item => console.log('press', item)}
                onJoin={item => console.log('join', item)}
                onInviteMember={item => console.log('invite', item)}
              />
            </View>
          ))}
        </View>
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
          <View style={styles.newsFeedItem}>
            <NewsFeedItem
              isNew
              title="The YWCA Aurora has partnered with YWCA Metropolitan Chicago to
            offer parents and child care providers The YWCA Aurora has partnered with YWCA Metropolitan Chicago to
            offer parents and child care providers"
              tags={[
                {
                  name: 'Child Care',
                },
                {
                  name: '3D Youth',
                },
              ]}
              user={{
                username: 'Kyle Day',
                imageURI: 'https://www.w3schools.com/w3css/img_avatar2.png',
              }}
              date={new Date()}
              attachment={{
                imageURI: require('../images/2.jpg'),
                title: 'YWCA new initiative set to increase the',
              }}
            />
          </View>
          <View style={styles.newsFeedItem}>
            <NewsFeedItem
              isNew
              title="Watching the news the other day, it occurred to me that people who have “words to live by” often begin to attack and"
              tags={[
                {
                  name: 'Young Parents Program',
                },
              ]}
              user={{
                username: 'Maurice Ramirez',
                imageURI:
                  'https://www.m3sm.co.uk/wp-content/uploads/2016/06/avatar-m3sm-fahd.jpg',
              }}
              date={new Date()}
            />
          </View>
          <View style={styles.newsFeedItem}>
            <NewsFeedItem
              tags={[
                {
                  name: 'Make a Donation',
                  disabled: true,
                },
              ]}
              user={{
                username: 'Lucinda Taylor',
                imageURI:
                  'https://thumbs.dreamstime.com/t/man-avatar-icon-flat-style-illustration-vector-web-lime-background-86384399.jpg',
              }}
              date={new Date()}
              image={{
                imageURI: require('../images/3.jpg'),
                title: 'YWCA new initiative set to increase the',
              }}
            />
          </View>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
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

  newsFeedItem: {
    paddingBottom: 10,
  },

  itemsContainer: {
    padding: 10,
    paddingBottom: 0,
  },
});
