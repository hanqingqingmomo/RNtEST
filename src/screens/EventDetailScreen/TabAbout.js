// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import isPast from 'date-fns/is_past';

import {
  View,
  Button,
  Text,
  ContactGroup,
  HTML,
  SegmentedControl,
} from '../../atoms';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';
import {
  ATTENDING_STATUS,
  common,
  EVENT_STATUS,
  palettes,
  type RSVPStatus,
} from '../../blocks/EventFeed/Event';
import type { Comment, User, Contact, Community } from '../../Types';
import CommentList from './CommentList';

export const SORT_KEYS = {
  'Top comments': 'popularity',
  'Newest first': 'newest',
};

const LABELS = Object.keys(SORT_KEYS);

type CommentType = $Keys<typeof SORT_KEYS>;

type Props = {
  webinar: boolean,
  is_author: boolean,
  start: Date,
  end: Date,
  presenters_contacts: Array<Contact>,
  presenters_communities: Array<Community>,
  description: string,
  replies: Array<Comment>,
  id: string,
  current_user_rsvp: RSVPStatus,
  onActionPress: Function,
  onCreateComment: Function,
  onContactSelect: Function,
};

type State = {
  commentType: CommentType,
};

type Presenter = User & { role: string };

const LiveEventButton = ({ onPress, current_user_rsvp }) => (
  <View style={styles.join}>
    <View style={styles.joinButton}>
      <Button
        block
        disabled={current_user_rsvp === ATTENDING_STATUS.GOING}
        title="Join Now!"
        size="lg"
        color={getColor('#00E676')}
        textColor="white"
        onPress={() => onPress(ATTENDING_STATUS.GOING)}
      />
    </View>
  </View>
);

const FutureEventButtons = ({ onPress, current_user_rsvp, start }) => {
  if (!current_user_rsvp) {
    current_user_rsvp = 'pending';
  }
  const pastEvent = isPast(start);
  const palette = {
    ...palettes[pastEvent ? EVENT_STATUS.INACTIVE : EVENT_STATUS.ACTIVE],
    ...common,
  };
  const goingButton = palette[current_user_rsvp].goingButton;
  const notGoingButton = palette[current_user_rsvp].notGoingButton;

  return (
    <View style={styles.going}>
      <Text>Are you going?</Text>
      <View style={styles.buttonsWrapper}>
        <Button.Icon
          {...notGoingButton}
          disabled={pastEvent}
          iconName="close"
          size="md"
          style={css('paddingRight', 12)}
          onPress={() => onPress(ATTENDING_STATUS.NOT_GOING)}
        />
        <Button.Icon
          {...goingButton}
          disabled={pastEvent}
          iconName="check"
          size="md"
          onPress={() => onPress(ATTENDING_STATUS.GOING)}
        />
      </View>
    </View>
  );
};

export default class TabAbout extends Component<Props, State> {
  static navigationOptions = {
    tabBarLabel: 'About',
  };

  state = {
    commentType: LABELS[0],
  };

  parsePresenters = (): Array<Presenter> => {
    const { presenters_contacts, presenters_communities } = this.props;
    let members = [];

    if (presenters_communities) {
      members = presenters_communities.reduce(
        (acc: Array<*>, communuty: Community) => {
          return [...acc, ...communuty.members];
        },
        []
      );
    }

    if (presenters_contacts) {
      members = [...members, ...presenters_contacts];
    }

    return members.map((member: User): Presenter => {
      member.role = 'Presenter';

      return member;
    });
  };

  _onCommentSorting = (commentType: CommentType) => {
    this.setState({ commentType });
    this.props.onCommentSorting(SORT_KEYS[commentType]);
  };

  render() {
    const {
      description,
      onActionPress,
      webinar,
      replies,
      onContactSelect,
      onRequestReply,
    } = this.props;

    return (
      <View style={styles.container}>
        {webinar ? (
          <LiveEventButton onPress={onActionPress} {...this.props} />
        ) : (
          <FutureEventButtons onPress={onActionPress} {...this.props} />
        )}

        {description ? (
          <View style={styles.text}>
            <HTML html={description} />
          </View>
        ) : null}

        <ContactGroup
          users={this.parsePresenters()}
          onContactSelect={onContactSelect}
        />

        {replies && replies.length ? (
          <View>
            <View style={styles.segmentedWrapper}>
              <SegmentedControl
                labels={LABELS}
                selectedLabel={this.state.commentType}
                onChange={this._onCommentSorting}
              />
            </View>

            <View style={css('paddingVertical', 20)}>
              <CommentList replies={replies} onRequestReply={onRequestReply} />
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonsWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  going: {
    height: 90,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: getColor('#EDEFF2'),
    borderBottomWidth: 1,
  },
  joinButton: {
    width: 285,
  },
  join: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
  },
  text: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  segmentedWrapper: {
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
});
