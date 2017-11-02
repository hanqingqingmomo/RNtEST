// @flow

import React, { Component } from 'react';
import Collapsible from 'react-native-collapsible';

import { EventHeader, Tabs, View } from '../../atoms';

import TabEventNewsFeed from './TabEventNewsFeed';
import TabEventMembers from './TabEventMembers';
import TabEventFiles from './TabEventFiles';
import { css } from '../../utils/style';

type Props = {
  community: Community,
  navigation: any,
  reloadCommunity: Function,
};

type State = {
  activeTab: string,
};

export default class Event extends Component<Props, State> {
  state = {
    activeTab: 'News',
  };

  changeActiveTab = (activeTab: string) => {
    this.setState({ activeTab });
  };

  render() {
    const { event } = this.props;

    return (
      <View style={css('flexGrow', 1)}>
        <Collapsible collapsed={this.state.activeTab !== 'News'}>
          <EventHeader
            pillTitle="Child Care Assistance Program"
            title="Annual Meeting Reception"
            subtitle="1 day ago, 3:00 AM-5:00 PM, Chicago"
            coverImageURI="https://www.ywcaknox.com/wp-content/uploads/photo3-407x222.jpg"
            isClosed={false}
          />
        </Collapsible>
        <Tabs
          activeItem={this.state.activeTab}
          onChange={this.changeActiveTab}
          items={[
            {
              label: 'News',
              component: () => <TabEventNewsFeed />,
            },
            {
              label: `Members`,
              component: () => <TabEventMembers />,
            },
            {
              label: `Files`,
              component: () => <TabEventFiles />,
            },
          ]}
        />
      </View>
    );
  }
}
