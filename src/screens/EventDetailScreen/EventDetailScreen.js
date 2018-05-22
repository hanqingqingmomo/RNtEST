// @flow

import React, { Component } from 'react';
import { WhitePortal, BlackPortal } from 'react-native-portal';
import {
  DeviceEventEmitter,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';

import {
  Tabs,
  View,
  CenterView,
  ActivityIndicator,
  NavigationTextButton,
  CommentInput,
} from '../../atoms';
import EventHeader from './EventHeader';
import TabAbout, { SORT_KEYS } from './TabAbout';
import TabEventParticipants from './TabEventParticipants';
import TabEventFiles from './TabEventFiles';
import { getColor } from '../../utils/color';
import type { Community, User, RSVPStatuses } from '../../Types';
import {
  acceptEvent,
  getEvent,
  RQCreateEventComment,
  RQCreateComment,
  getEventComments,
} from '../../utils/requestFactory';

type Props = {
  navigation: any,
  screenProps: Object,
};

type State = {
  activeTab: string,
  busy: boolean,
  event: ?Object,
  replyingTo?: Comment,
  request: boolean,
  commentType: $Values<SORT_KEYS>,
};

export default class EventDetailScreen extends Component<Props, State> {
  state = {
    activeTab: 'About',
    busy: false,
    event: null,
    replyingTo: undefined,
    request: false,
    commentType: SORT_KEYS[0],
  };

  inputRef: ?any;

  static navigationOptions = () => ({
    headerTitle: 'Event',
    headerRight: <WhitePortal name="editButton" />,
  });

  componentWillMount() {
    this.fetch();
    this.addListeners();
  }

  addListeners = () => {
    DeviceEventEmitter.addListener('update event', (data: Object) => {
      this.fetch();
    });
    DeviceEventEmitter.addListener('delete comment', (data: Object) => {
      this.fetchComments();
    });
  };

  fetch = async () => {
    this.setState({ busy: true });

    try {
      const { data } = await getEvent(
        this.props.navigation.state.params.event_id
      );

      if (data.error) {
        throw new Error(data.error);
      }

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

  fetchComments = async () => {
    const { event, commentType } = this.state;

    try {
      const { data } = await getEventComments(event.id, commentType);

      if (__DEV__) {
        console.log('[Event detail] fetch comments', data);
      }

      event.replies = data;
      this.setState({ event });
    } catch (err) {
      if (__DEV__) {
        console.log('[Event detail] fetch comments error', err.message);
      }
    }
  };

  _onActiveTab = (activeTab: string) => {
    this.setState({ activeTab });
  };

  _onCommentSorting = (commentType: CommentType) => {
    this.setState({ commentType }, () => {
      this.fetchComments();
    });
  };

  computePaticipantsCount = (): number => {
    const { event } = this.state;

    return event.attendees_communities
      ? event.attendees_communities.reduce(
          (acc: number, community: Community) => {
            acc += (community.members || []).length;

            return acc;
          },
          0
        )
      : 0;
  };

  _onNavigateToMemberProfile = (user: User) => {
    this.props.navigation.navigate('EventTab:MemberProfileScreen', {
      user,
    });
  };

  _onActionPress = async (status: RSVPStatuses) => {
    try {
      const { data, ok } = await acceptEvent(this.state.event.id, status);

      if (!ok) {
        throw new Error(data.error || data);
      }

      if (__DEV__) {
        console.log('[Event detail] accept', data);
      }

      this.fetch();
    } catch (err) {
      global.alertWithType('error', 'Oppps!', err.message);
    }
  };

  _onCreateComment = async (id, value: string) => {
    const { event } = this.state;

    this.setState({ request: true });

    try {
      const { ok } = await (id === event.id
        ? RQCreateEventComment(id, value)
        : RQCreateComment(id, value));

      if (ok) {
        this.fetchComments();
      }

      if (__DEV__) {
        console.log('[Event detail] create comment', event.replies);
      }
    } catch (err) {
      global.alertWithType('error', 'Oppps!', err.message);
    } finally {
      this.setState({ request: false });
    }
  };

  _onEditEvent = () => {
    this.props.screenProps.openModalRoute({
      routeName: 'CreateEventModal',
      params: {
        event_id: this.state.event.id,
      },
    });
  };

  _onRequestReply = (comment: Comment) => {
    comment.type = 'comment';

    this.setState({ replyingTo: comment });

    if (this.inputRef) {
      this.inputRef.focus();
    }
  };

  _onReplyCancel = () => {
    this.setState({ replyingTo: undefined });

    if (this.inputRef) {
      this.inputRef.blur();
    }
  };

  passRef = (ref: any) => {
    this.inputRef = ref;
  };

  render() {
    const { busy, event, activeTab, replyingTo, request } = this.state;

    return busy || !event ? (
      <CenterView>
        <ActivityIndicator />
      </CenterView>
    ) : (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={busy}
              onRefresh={this.fetch}
              colors={[getColor('orange')]}
            />
          }
        >
          {event.is_author ? (
            <BlackPortal name="editButton">
              <NavigationTextButton
                title="Edit"
                textColor={getColor('orange')}
                onPress={this._onEditEvent}
              />
            </BlackPortal>
          ) : null}
          <EventHeader {...event} />
          <Tabs
            activeItem={this.state.activeTab}
            onChange={this._onActiveTab}
            items={[
              {
                label: 'About',
                component: () => (
                  <TabAbout
                    {...event}
                    onActionPress={this._onActionPress}
                    onCommentSorting={this._onCommentSorting}
                    onContactSelect={this._onNavigateToMemberProfile}
                    onCreateComment={this._onCreateComment}
                    onRequestReply={this._onRequestReply}
                  />
                ),
              },
              {
                label: `Participants (${this.computePaticipantsCount()})`,
                component: () => (
                  <TabEventParticipants
                    {...event}
                    onContactSelect={this._onNavigateToMemberProfile}
                  />
                ),
              },
              // {
              //   label: `Files`,
              //   component: () => <TabEventFiles event={EVENT} />,
              // },
            ]}
          />
        </ScrollView>

        {activeTab === 'About' ? (
          <CommentInput
            target={replyingTo || { id: event.id }}
            busy={request}
            onReplyCancel={this._onReplyCancel}
            passRef={this.passRef}
            onCreateComment={this._onCreateComment}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});
