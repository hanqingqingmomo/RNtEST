// @flow

import React, { Component } from 'react';

import { View } from '../../atoms';
import { NewsFeedConversation } from '../index';
import PinnedSection from './PinnedSection';
import EventsSection from './EventsSection';
import CommunityNewsfeed from './CommunityNewsfeed';

export default class NewsTab extends Component<{}> {
  static navigationOptions = {
    tabBarLabel: 'News',
  };

  render() {
    return (
      <View>
        <NewsFeedConversation />
        <EventsSection />
        <PinnedSection />
        <CommunityNewsfeed />
      </View>
    );
  }
}
