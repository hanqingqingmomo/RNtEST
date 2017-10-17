// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Fetch, View, Screen, ShadowView } from '../../atoms';
import { NewsFeedItem } from '../../blocks';
import FriendInvitationWidget from './FriendInvitationWidget';
import NewsFeedHeader from './NewsFeedHeader';
import NewsFeedConversation from './NewsFeedConversation';

function NavigatorHeader(props) {
  return (
    <ShadowView radius={0} style={{ paddingTop: 20, backgroundColor: 'white' }}>
      <NewsFeedHeader openDrawer={props.screenProps.openDrawer} />
    </ShadowView>
  );
}

export default class AggregatedNewsFeedScreen extends Component<{}> {
  static navigationOptions = {
    header: NavigatorHeader,
  };

  render() {
    return (
      <Fetch url="/feed" options={{}}>
        {({ loading, data, error }) => {
          return (
            <Screen>
              <View>
                <NewsFeedConversation />
                <FriendInvitationWidget
                  openModal={this.props.screenProps.openFriendsInitationModal}
                />
                <View style={styles.itemsContainer}>
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
                        imageURI: require('../../images/1.jpg'),
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
                        imageURI:
                          'https://www.w3schools.com/w3css/img_avatar2.png',
                      }}
                      date={new Date()}
                      attachment={{
                        imageURI: require('../../images/2.jpg'),
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
                        imageURI: require('../../images/3.jpg'),
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
                        imageURI: require('../../images/4.jpg'),
                      }}
                    />
                  </View>
                </View>
              </View>
            </Screen>
          );
        }}
      </Fetch>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingBottom: 10,
  },
  itemsContainer: {
    padding: 10,
    paddingBottom: 0,
  },
});
