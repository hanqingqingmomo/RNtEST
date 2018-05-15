// @flow

import React, { Component } from 'react';

import {
  Screen,
  Tabs,
  View,
  EventHeader,
  CenterView,
  ActivityIndicator,
} from '../../atoms';
import TabAbout from './TabAbout';
import TabEventParticipants from './TabEventParticipants';
import TabEventFiles from './TabEventFiles';
import { css } from '../../utils/style';
import type { Community } from '../../Types';
import { acceptEvent, getEvent } from '../../utils/requestFactory';

const EVENT = {
  id: 'eb5905ecb542',
};

type Props = {
  navigation: any,
};

type State = {
  activeTab: string,
  busy: boolean,
  event: ?Object,
};

export default class EventDetailScreen extends Component<Props, State> {
  state = {
    activeTab: 'About',
    busy: false,
    event: null,
  };

  componentWillMount() {
    this.fetch();
  }

  fetch = async () => {
    this.setState({ busy: true });

    try {
      const { data } = await getEvent(EVENT.id);

      if (__DEV__) {
        console.log('[Event detail] fetch', data);
      }

      this.setState({ event: data });
    } catch (err) {
      if (__DEV__) {
        console.log('[Event detail] error', err.message);
      }
    } finally {
      this.setState({ busy: false });
    }
  };

  changeActiveTab = (activeTab: string) => {
    this.setState({ activeTab });
  };

  computePaticipantsCount = (): number => {
    const { event } = this.state;

    return event.atendees_communities && event.atendees_contacts
      ? event.atendees_communities.reduce(
          (acc: number, community: Community) => {
            acc += (community.members || []).length;

            return acc;
          },
          0
        ) + event.atendees_contacts.length
      : 0;
  };

  _onActionPress = async (status: 'going' | 'not_going') => {
    try {
      await acceptEvent(this.state.event.id, status);
    } catch (err) {}
  };

  render() {
    const { busy } = this.state;

    return busy ? (
      <CenterView>
        <ActivityIndicator />
      </CenterView>
    ) : (
      <View style={css('flex', 1)}>
        <EventHeader {...EVENT} />
        <Tabs
          activeItem={this.state.activeTab}
          onChange={this.changeActiveTab}
          items={[
            {
              label: 'About',
              component: () => (
                <TabAbout {...EVENT} onActionPress={this._onActionPress} />
              ),
            },
            {
              label: `Participants (${this.computePaticipantsCount()})`,
              component: () => <TabEventParticipants {...EVENT} />,
            },
            // {
            //   label: `Files`,
            //   component: () => <TabEventFiles event={EVENT} />,
            // },
          ]}
        />
      </View>
    );
  }
}
