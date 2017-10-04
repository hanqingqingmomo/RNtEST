// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { View, ScrollView } from '../../atoms';
import { NewsFeedItem } from '../../blocks';

export default class NewsfeedPlayground extends React.Component<*, *, *> {
  static navigationOptions = {
    title: 'News Feed',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.item}>
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
              imageURI:
                'https://www.m3sm.co.uk/wp-content/uploads/2016/06/avatar-m3sm-fahd.jpg',
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
        <View style={styles.item}>
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
              imageURI:
                'https://s3-us-west-1.amazonaws.com/powr/defaults/Siberian-Tiger-Running-Through-Snow-Tom-Brakefield-Getty-Images-200353826-001.jpg',
              title: 'YWCA new initiative set to increase the',
            }}
          />
        </View>
        <View style={styles.item}>
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

        <View style={styles.item}>
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
              imageURI:
                'https://s3-us-west-1.amazonaws.com/powr/defaults/Siberian-Tiger-Running-Through-Snow-Tom-Brakefield-Getty-Images-200353826-001.jpg',
              title: 'YWCA new initiative set to increase the',
            }}
          />
        </View>
        <View style={styles.item}>
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
            event={{
              startDate: new Date(),
              endDate: new Date(),
              title:
                'YWCA new initiative set to increase the YWCA new initiative set to increase the',
              imageURI:
                'https://s3-us-west-1.amazonaws.com/powr/defaults/Siberian-Tiger-Running-Through-Snow-Tom-Brakefield-Getty-Images-200353826-001.jpg',
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(236,239,241,0.6)',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
  },
  item: {
    paddingBottom: 10,
  },
});
