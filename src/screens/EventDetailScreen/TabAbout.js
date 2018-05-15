// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import isPast from 'date-fns/is_past';

import {
  View,
  Button,
  ScrollView,
  Text,
  ContactGroup,
  SegmentedControl,
} from '../../atoms';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';
import { parseTextContent } from '../../utils/text';
import { CommentList, CommentInput } from '../../blocks';
import {
  ATTENDING_STATUS,
  common,
  EVENT_STATUS,
  palettes,
  type RSVPStatus,
} from '../../blocks/EventFeed/Event';
import type { Comment, User, Contact, Community } from '../../Types';

type CommentType = 'Top comments' | 'Newest first';

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
  replyingTo?: Comment,
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
    return null;
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
          color={current_user_rsvp ? notGoingButton.color : getColor('gray')}
          iconColor={getColor('gray')}
          iconName="close"
          outline
          size="md"
          style={css('paddingRight', 12)}
          onPress={() => onPress(ATTENDING_STATUS.NOT_GOING)}
        />
        <Button.Icon
          color={current_user_rsvp ? goingButton.color : getColor('gray')}
          iconColor={getColor('white')}
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
    commentType: 'Top comments',
    replyingTo: undefined,
  };

  inputRef: ?any;

  _onReply = (comment: Comment) => {
    console.log('reply');

    this.setState({ replyingTo: comment });

    if (this.inputRef) {
      this.inputRef.focus();
    }
  };

  _onReplyCancel = () => {
    console.log('cancel');

    this.setState({ replyingTo: undefined });

    if (this.inputRef) {
      this.inputRef.blur();
    }
  };

  passRef = (ref: any) => {
    this.inputRef = ref;
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

  render() {
    const {
      description,
      replies,
      id,
      onActionPress,
      webinar,
      is_author,
    } = this.props;
    const { replyingTo } = this.state;

    return (
      <View style={[css('flex', 1), css('backgroundColor', 'white')]}>
        <ScrollView>
          {is_author ? null : webinar ? (
            <LiveEventButton onPress={onActionPress} {...this.props} />
          ) : (
            <FutureEventButtons onPress={onActionPress} {...this.props} />
          )}

          {description ? (
            <Text
              size={14}
              lineHeight={18}
              color={getColor('gray')}
              style={styles.text}
            >
              {parseTextContent(description, 80)}
            </Text>
          ) : null}

          <ContactGroup
            users={this.parsePresenters()}
            onContactSelect={this.props.onContactSelect}
          />

          {replies && replies.length ? (
            <View style={styles.segmentedWrapper}>
              <SegmentedControl
                labels={['Top comments', 'Newest first']}
                selectedLabel={this.state.commentType}
                onChange={(commentType: CommentType) => {
                  this.setState({ commentType });
                }}
              />
            </View>
          ) : null}

          {replies && replies.length ? (
            <View style={css('paddingVertical', 20)}>
              <CommentList replies={replies} onRequestReply={this._onReply} />
            </View>
          ) : null}
        </ScrollView>

        <CommentInput
          target={replyingTo || { id, type: 'event' }}
          type="event"
          onReplyCancel={this._onReplyCancel}
          passRef={this.passRef}
          onCreateComment={this.props.onCreateComment}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  },
});
