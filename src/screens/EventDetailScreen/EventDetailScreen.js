// @flow

import React, { Component } from 'react';

import {
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
import {
  acceptEvent,
  getEvent,
  createEventCommnet,
} from '../../utils/requestFactory';

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
      const { data } = await getEvent(
        this.props.navigation.state.params.event_id
      );

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

    return event.attendees_communities && event.attendees_contacts
      ? event.attendees_communities.reduce(
          (acc: number, community: Community) => {
            acc += (community.members || []).length;

            return acc;
          },
          0
        ) + event.attendees_contacts.length
      : 0;
  };

  _onActionPress = async (status: 'going' | 'not_going') => {
    try {
      const { data } = await acceptEvent(this.state.event.id, status);

      if (data.error) {
        throw new Error(data.error);
      }

      if (__DEV__) {
        console.log('[Event detail] accept', data);
      }
    } catch (err) {
      global.alertWithType('error', 'Oppps!', err.message);
    }
  };

  _onCreateComment = async (id, value: string) => {
    const { event } = this.state;

    if (!event.replies) {
      event.replies = [];
    }

    try {
      const { data } = await createEventCommnet(id, value);

      event.replies.push(data);

      if (__DEV__) {
        console.log('[Event detail] create comment', event.replies);
      }
    } catch (err) {
      global.alertWithType('error', 'Oppps!', err.message);
    }
  };

  render() {
    const { busy, event } = this.state;

    return busy ? (
      <CenterView>
        <ActivityIndicator />
      </CenterView>
    ) : (
      <View style={css('flex', 1)}>
        <EventHeader {...event} />
        <Tabs
          activeItem={this.state.activeTab}
          onChange={this.changeActiveTab}
          items={[
            {
              label: 'About',
              component: () => (
                <TabAbout
                  {...event}
                  onActionPress={this._onActionPress}
                  onCreateComment={this._onCreateComment}
                />
              ),
            },
            {
              label: `Participants (${this.computePaticipantsCount()})`,
              component: () => <TabEventParticipants {...event} />,
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
