// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import format from 'date-fns/format';
import isPast from 'date-fns/is_past';

import { AvatarGroup, Button, Pill, Text, View } from '../../atoms';
import { css } from '../../utils/style';
import { getColor } from '../../utils/color';

const ATTENDING_STATUS = {
  GOING: 'going',
  NOT_GOING: 'not_going',
  PENDING: 'pending',
};

const EVENT_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};

type RSVPStatus = $Values<typeof ATTENDING_STATUS>;

type PostProps = {
  id: string,
  name: string,
};

export type EventProps = {
  id: string,
  name: string,
  location: string,
  post_in: Array<PostProps>,
  start: Date,
  end: Date,
  rsvp: RSVPStatus,
  presenters_contacts: Array<Object>,
  presenters_communities: Array<Object>,
  privacy: 'public' | 'private',
  atendees_contacts: Array<Object>,
  atendees_communities: Array<Object>,
  webinar?: boolean,
};

type Props = {
  onActionPress: (RSVPStatus | 'join') => void,
  event: EventProps,
};

const palettes = {
  [EVENT_STATUS.ACTIVE]: {
    [ATTENDING_STATUS.GOING]: {
      goingButton: {
        color: getColor('green'),
        iconColor: getColor('white'),
      },
      notGoingButton: {
        color: getColor('gray'),
        iconColor: getColor('gray'),
      },
    },
    [ATTENDING_STATUS.NOT_GOING]: {
      goingButton: {
        color: getColor('gray'),
        iconColor: getColor('gray'),
      },
      notGoingButton: {
        color: getColor('red'),
        iconColor: getColor('white'),
      },
    },
    pillTextColor: getColor('orange'),
    titleColor: 'rgba(69,90,100,1)',
  },
  [EVENT_STATUS.INACTIVE]: {
    [ATTENDING_STATUS.GOING]: {
      goingButton: {
        color: getColor('gray'),
        iconColor: getColor('white'),
      },
      notGoingButton: {
        color: getColor('gray'),
        iconColor: getColor('gray'),
      },
    },
    [ATTENDING_STATUS.NOT_GOING]: {
      goingButton: {
        color: getColor('gray'),
        iconColor: getColor('gray'),
      },
      notGoingButton: {
        color: getColor('gray'),
        iconColor: getColor('white'),
      },
    },
    pillTextColor: getColor('gray'),
    titleColor: getColor('gray'),
  },
};

const common = {
  joinButton: {
    color: getColor('green'),
    text: getColor('white'),
  },
  [ATTENDING_STATUS.PENDING]: {
    goingButton: {
      color: getColor('gray'),
      iconColor: getColor('gray'),
    },
    notGoingButton: {
      color: getColor('gray'),
      iconColor: getColor('gray'),
    },
  },
};

function _renderWebinar({ palette, onActionPress }): React$Node {
  return (
    <View style={[styles.midSection, styles.alignment]}>
      <Text style={styles.liveLabel} color="white" size={13} weight="bold">
        Live
      </Text>
      <Button
        color={palette.joinButton.color}
        onPress={() => onActionPress('join')}
        size="md"
        textColor={palette.joinButton.text}
        title="Join"
        style={styles.buttonJoin}
      />
    </View>
  );
}

function _renderEvent({ event, palette, onActionPress }): React$Node {
  const pastEvent = isPast(event.start);

  return (
    <View style={[styles.midSection, styles.alignment]}>
      <Text color="gray" size={13} lineHeight={15}>
        {`${format(event.start, 'h:mm A')} - ${format(event.end, 'h:mm A')}`}
      </Text>
      <View style={styles.alignment}>
        <Button.Icon
          color={
            event.rsvp ? palette[event.rsvp].notGoingButton.color : '#B0BEC5'
          }
          disabled={pastEvent}
          iconColor={
            event.rsvp
              ? palette[event.rsvp].notGoingButton.iconColor
              : '#B0BEC5'
          }
          iconName="close"
          onPress={() => onActionPress(ATTENDING_STATUS.NOT_GOING)}
          outline={event.rsvp !== ATTENDING_STATUS.NOT_GOING}
          size="md"
          style={css('paddingRight', 12)}
        />
        <Button.Icon
          color={event.rsvp ? palette[event.rsvp].goingButton.color : '#B0BEC5'}
          disabled={pastEvent}
          iconColor={
            event.rsvp ? palette[event.rsvp].goingButton.iconColor : '#B0BEC5'
          }
          iconName="check"
          onPress={() => onActionPress(ATTENDING_STATUS.GOING)}
          outline={event.rsvp !== ATTENDING_STATUS.GOING}
          size="md"
        />
      </View>
    </View>
  );
}

export default function Event({ event, onActionPress }: Props): React$Node {
  const pastEvent = isPast(event.start);
  const palette = {
    ...palettes[pastEvent ? EVENT_STATUS.INACTIVE : EVENT_STATUS.ACTIVE],
    ...common,
  };
  const communitiesMembers = event.atendees_communities.reduce(
    (acc, community) => [...acc, ...community.members],
    []
  );
  const atendees = [...event.atendees_contacts, ...communitiesMembers];

  return (
    <View style={styles.container}>
      <Text
        style={css('color', palette.titleColor)}
        fontSize={13}
        weight="500"
        lineHeight={16}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {event.name}
      </Text>

      {event.webinar
        ? _renderWebinar({ palette, onActionPress })
        : _renderEvent({ event, palette, onActionPress })}

      <View style={styles.alignment}>
        <View style={styles.pillWrapper}>
          {event.post_in.map((post: PostProps): React$Node => (
            <Pill
              key={post.id}
              color={palette.pillTextColor}
              title={post.name}
              truncate
            />
          ))}
        </View>
        <AvatarGroup
          imageURIs={atendees
            .map(
              (atendee: Object): string =>
                atendee.thumbnailPath || atendee.profile_photo
            )
            .filter((path: string): boolean => !!path)}
          title={(more: number): string => `+${more}`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingRight: 15,
    paddingVertical: 14,
  },
  alignment: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonJoin: {
    minWidth: 34 + 34 + 12,
  },
  liveLabel: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    backgroundColor: getColor('red'),
    borderRadius: 3,
    overflow: 'hidden',
  },
  midSection: {
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  pillWrapper: {
    maxWidth: '50%',
    paddingRight: 8,
  },
});
