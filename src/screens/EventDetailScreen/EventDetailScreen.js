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
  SegmentedControl,
} from '../../atoms';
import { CommentList, CommentInput } from '../../blocks';
import EventHeader from './EventHeader';
import TabAbout from './TabAbout';
import TabEventParticipants from './TabEventParticipants';
import TabEventFiles from './TabEventFiles';
import { css } from '../../utils/style';
import { getColor } from '../../utils/color';
import type { Community, User } from '../../Types';
import {
  acceptEvent,
  getEvent,
  createEventComment,
  RQCreateComment,
  getEventComments,
} from '../../utils/requestFactory';

type CommentType = 'Top comments' | 'Newest first';

type Props = {
  navigation: any,
  screenProps: Object,
};

type State = {
  activeTab: string,
  busy: boolean,
  event: ?Object,
  replyingTo?: Comment,
  commentType: CommentType,
};

export default class EventDetailScreen extends Component<Props, State> {
  state = {
    activeTab: 'About',
    commentType: 'Top comments',
    busy: false,
    event: null,
    replyingTo: undefined,
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
    const { commentType, event } = this.state;
    const sortKeys = {
      'Top comments': 'popularity',
      'Newest first': '',
    };

    try {
      const { data } = await getEventComments(event.id, sortKeys[commentType]);

      if (__DEV__) {
        console.log('[Event detail] fetch comments', data);
      }
      event.replies = [];
      this.setState({ event });

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
    this.setState({ commentType });
    this.fetchComments();
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
    this.props.navigation.navigate('MemberProfileScreen', {
      user,
    });
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
    const replies = [...event.replies];

    try {
      const { data } = await (id === event.id
        ? createEventComment(id, value)
        : RQCreateComment(id, value));

      if (id === event.id) {
        replies.push(data);
      } else {
        replies.map((reply: Object) => {
          if (id === reply.id) {
            reply.replies.push(data);
          }

          return reply;
        });
      }

      event.replies = [];
      this.setState({ event });

      event.replies = replies;
      this.setState({ event });

      if (__DEV__) {
        console.log('[Event detail] create comment', event.replies);
      }
    } catch (err) {
      global.alertWithType('error', 'Oppps!', err.message);
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

  _onReply = (comment: Comment) => {
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
    const { busy, event, activeTab, replyingTo } = this.state;

    return busy && !event ? (
      <CenterView>
        <ActivityIndicator />
      </CenterView>
    ) : (
      <View style={css('flex', 1)}>
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
                    onCreateComment={this._onCreateComment}
                    onContactSelect={this._onNavigateToMemberProfile}
                  >
                    {event.replies && event.replies.length ? (
                      <View>
                        <View style={styles.segmentedWrapper}>
                          {/* $FlowFixMe */}
                          <SegmentedControl
                            labels={['Top comments', 'Newest first']}
                            selectedLabel={this.state.commentType}
                            onChange={this._onCommentSorting}
                          />
                        </View>

                        <View style={css('paddingVertical', 20)}>
                          {/* $FlowFixMe */}
                          <CommentList
                            replies={event.replies}
                            onRequestReply={this._onReply}
                          />
                        </View>
                      </View>
                    ) : null}
                  </TabAbout>
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
        </ScrollView>

        {activeTab === 'About' ? (
          <CommentInput
            target={replyingTo || { id: event.id, type: 'event' }}
            type="event"
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
  segmentedWrapper: {
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
});
