// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import format from 'date-fns/format';
import isPast from 'date-fns/is_past';

import {
  AvatarGroup,
  Button,
  Pill,
  Text,
  View,
  TouchableOpacity,
} from '../../atoms';
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
  current_user_rsvp: RSVPStatus,
  end: Date,
  id: string,
  location: string,
  post_in: Array<PostProps>,
  privacy: 'public' | 'private',
  profile_photos: Array<string>,
  start: Date,
  title: string,
  total_attendees_count: number,
  webinar?: boolean,
  is_author: boolean,
  author_id: string,
};

type Props = {
  onActionPress: RSVPStatus => void,
  event: EventProps,
  onPress: Function,
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

function _renderWebinar({ event, palette, onActionPress }): React$Node {
  const pastEvent = isPast(event.start);

  return (
    <View style={[styles.midSection, styles.alignment]}>
      <Text style={styles.liveLabel} color="white" size={13} weight="bold">
        Live
      </Text>
      {event.is_author ? null : (
        <Button
          disabled={pastEvent || event.current_user_rsvp === 'going'}
          color={palette.joinButton.color}
          onPress={() => onActionPress('going')}
          size="md"
          textColor={palette.joinButton.text}
          title="Join"
          style={styles.buttonJoin}
        />
      )}
    </View>
  );
}

function _renderEvent({ event, palette, onActionPress }): React$Node {
  const pastEvent = isPast(event.start);
  const goingButton = palette[event.current_user_rsvp].goingButton;
  const notGoingButton = palette[event.current_user_rsvp].notGoingButton;

  return (
    <View style={[styles.midSection, styles.alignment]}>
      <Text color="gray" size={13} lineHeight={15}>
        {`${format(event.start, 'h:mm A')} - ${format(event.end, 'h:mm A')}`}
      </Text>
      {event.is_author ? null : (
        <View style={styles.alignment}>
          <Button.Icon
            color={event.current_user_rsvp ? notGoingButton.color : '#B0BEC5'}
            disabled={pastEvent}
            iconColor={
              event.current_user_rsvp ? notGoingButton.iconColor : '#B0BEC5'
            }
            iconName="close"
            onPress={() => onActionPress(ATTENDING_STATUS.NOT_GOING)}
            outline={event.current_user_rsvp !== ATTENDING_STATUS.NOT_GOING}
            size="md"
            style={css('paddingRight', 12)}
          />
          <Button.Icon
            color={event.current_user_rsvp ? goingButton.color : '#B0BEC5'}
            disabled={pastEvent}
            iconColor={
              event.current_user_rsvp ? goingButton.iconColor : '#B0BEC5'
            }
            iconName="check"
            onPress={() => onActionPress(ATTENDING_STATUS.GOING)}
            outline={event.current_user_rsvp !== ATTENDING_STATUS.GOING}
            size="md"
          />
        </View>
      )}
    </View>
  );
}

export default function Event({
  event,
  onActionPress,
  onPress,
}: Props): React$Node {
  const pastEvent = isPast(event.start);
  const palette = {
    ...palettes[pastEvent ? EVENT_STATUS.INACTIVE : EVENT_STATUS.ACTIVE],
    ...common,
  };

  return event.webinar ? null : (
    <View style={styles.container}>
      <TouchableOpacity disabled={pastEvent} onPress={() => onPress(event.id)}>
        <Text
          style={css('color', palette.titleColor)}
          fontSize={13}
          weight="500"
          lineHeight={16}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {event.title}
        </Text>
      </TouchableOpacity>

      {event.webinar
        ? _renderWebinar({ event, palette, onActionPress })
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
        {event.profile_photos.length ? (
          <AvatarGroup
            imageURIs={[...event.profile_photos, '']}
            count={5}
            title={(more: number): string =>
              `+${event.total_attendees_count -
                (event.profile_photos || []).length}`}
          />
        ) : null}
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
