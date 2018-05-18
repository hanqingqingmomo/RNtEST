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
import { CommentInput } from '../../blocks';
import CommentList from './CommentList';
import EventHeader from './EventHeader';
import TabAbout from './TabAbout';
import TabEventParticipants from './TabEventParticipants';
import TabEventFiles from './TabEventFiles';
import { css } from '../../utils/style';
import { getColor } from '../../utils/color';
import type { Community, User, RSVPStatuses } from '../../Types';
import {
  acceptEvent,
  getEvent,
  createEventComment,
  RQCreateComment,
  getEventComments,
} from '../../utils/requestFactory';

const SORT_KEYS = {
  'Top comments': 'popularity',
  'Newest first': '',
};

type CommentType = $Keys<typeof SORT_KEYS>;

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
  request: ?{
    loading: boolean,
    error: boolean,
  },
};

export default class EventDetailScreen extends Component<Props, State> {
  state = {
    activeTab: 'About',
    commentType: 'Top comments',
    busy: false,
    event: null,
    replyingTo: undefined,
    request: null,
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
    const { commentType } = this.state;
    const event = { ...this.state.event };

    try {
      const { data } = await getEventComments(event.id, SORT_KEYS[commentType]);

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
    let { request } = this.state;

    if (!request) {
      request = {};
    }

    request.loading = true;

    this.setState({ request });

    try {
      const { ok } = await (id === event.id
        ? createEventComment(id, value)
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
      this.setState({ request: null });
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
    const { busy, event, activeTab, replyingTo, request } = this.state;

    return busy && !event ? (
      <CenterView>
        <ActivityIndicator />
      </CenterView>
    ) : (
      <View style={[css('backgroundColor', 'white'), css('flex', 1)]}>
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
            busy={request}
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
