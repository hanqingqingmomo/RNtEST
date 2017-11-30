// @flow

import React, { Component } from 'react';
import Collapsible from 'react-native-collapsible';

import { EventHeader, Tabs, View } from '../../atoms';

import TabEventAbout from './TabEventAbout';
import TabEventParticipants from './TabEventParticipants';
import TabEventFiles from './TabEventFiles';
import { css } from '../../utils/style';

type Props = {
  event: Object,
};

type State = {
  activeTab: string,
};

export default class Event extends Component<Props, State> {
  state = {
    activeTab: 'About',
  };

  changeActiveTab = (activeTab: string) => {
    this.setState({ activeTab });
  };

  render() {
    const { event } = this.props;

    return (
      <View style={css('flexGrow', 1)}>
        <EventHeader
          pillTitle={event.community}
          title={event.title}
          subtitle={event.subtitle}
          coverImageURI={event.coverImageURI}
          status={event.status}
        />
        <Tabs
          activeItem={this.state.activeTab}
          onChange={this.changeActiveTab}
          items={[
            {
              label: 'About',
              component: () => <TabEventAbout event={event} />,
            },
            {
              label: `Participants (${event.participants})`,
              component: () => <TabEventParticipants event={event} />,
            },
            {
              label: `Files`,
              component: () => <TabEventFiles event={event} />,
            },
          ]}
        />
      </View>
    );
  }
}
