// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { View, ScrollView } from '../atoms';
import { NewsfeedItem } from '../blocks';

export default class NewsfeedPlayground extends React.Component<*, *, *> {
  static navigationOptions = {
    title: 'Newsfeed',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.item}>
          <NewsfeedItem
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
            onReplayPress={props => {
              console.log(props);
            }}
            onLinkPress={(key: 'share' | 'comment', props) =>
              console.log(key, props)}
            onTagPress={tag => console.log(tag)}
          />
        </View>
        <View style={styles.item}>
          <NewsfeedItem
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
            onReplayPress={props => {
              console.log(props);
            }}
            onLinkPress={(key: 'share' | 'comment', props) =>
              console.log(key, props)}
            onTagPress={tag => console.log(tag)}
          />
        </View>
        <View style={styles.item}>
          <NewsfeedItem
            tags={[
              {
                name: 'Make a Donation',
                disabled: true,
              },
            ]}
            user={{
              username: 'Maurice Ramirez',
              imageURI:
                'https://thumbs.dreamstime.com/t/man-avatar-icon-flat-style-illustration-vector-web-lime-background-86384399.jpg',
            }}
            date={new Date()}
            onReplayPress={props => console.log(props)}
            onLinkPress={(key: 'share' | 'comment', props) =>
              console.log(key, props)}
            onTagPress={tag => console.log(tag)}
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
