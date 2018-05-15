// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import isBefore from 'date-fns/is_before';

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
import type { Comment, User, Contact, Community } from '../../Types';

type CommentType = 'Top comments' | 'Newest first';

type Props = {
  start: Date,
  end: Date,
  presenters_contacts: Array<Contact>,
  presenters_communities: Array<Community>,
  description: string,
  replies: Array<Comment>,
  id: string,
  onActionPress: Function,
  onCreateComment: Function,
};

type State = {
  commentType: CommentType,
  replyingTo?: Comment,
};

const LiveEventButton = () => (
  <View style={styles.join}>
    <View style={styles.joinButton}>
      <Button
        block
        title="Join Now!"
        size="lg"
        color={getColor('#00E676')}
        textColor="white"
        onPress={() => {}}
      />
    </View>
  </View>
);

const FutureEventButtons = ({ onPress }) => (
  <View style={styles.going}>
    <Text>Are you going?</Text>
    <View style={styles.buttonsWrapper}>
      <Button.Icon
        color={getColor('gray')}
        iconColor={getColor('gray')}
        iconName="close"
        outline
        size="md"
        style={css('paddingRight', 12)}
        onPress={() => onPress('not_going')}
      />
      <Button.Icon
        color={getColor('green')}
        iconColor={getColor('white')}
        iconName="check"
        size="md"
        onPress={() => onPress('going')}
      />
    </View>
  </View>
);

export default class TabAbout extends Component<Props, State> {
  static navigationOptions = {
    tabBarLabel: 'About',
  };

  state = {
    commentType: 'Top comments',
    replyingTo: undefined,
  };

  inputRef: ?any;

  _onContactSelect = (user: User) => {
    console.log(user);
  };

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

  parsePresenters = (): Array<User> => {
    const { presenters_contacts, presenters_communities } = this.props;

    if (!presenters_contacts || !presenters_communities) {
      return [];
    }

    return [
      ...presenters_contacts.map((contact: Contact): User => ({
        id: contact.recordID,
        first_name: contact.givenName,
        last_name: contact.familyName,
        profile_photo: contact.thumbnailPath,
        disabled: true,
      })),
      ...presenters_communities.reduce(
        (acc: Array<*>, communuty: Community) => {
          return [...acc, ...communuty.members];
        },
        []
      ),
    ];
  };

  render() {
    const { start, end, description, replies, id, onActionPress } = this.props;
    const { replyingTo } = this.state;

    return (
      <View style={[css('flex', 1), css('backgroundColor', 'white')]}>
        <ScrollView>
          {isBefore(new Date(), start) ? (
            <FutureEventButtons onPress={onActionPress} />
          ) : isBefore(new Date(), end) ? (
            <LiveEventButton />
          ) : null}

          {description ? (
            <Text size={14} lineHeight={18} color="#455A64" style={styles.text}>
              {parseTextContent(description, 80)}
            </Text>
          ) : null}

          <ContactGroup
            users={this.parsePresenters()}
            onContactSelect={this._onContactSelect}
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
