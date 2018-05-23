// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import format from 'date-fns/format';
import isPast from 'date-fns/is_past';
import isBefore from 'date-fns/is_before';
import getDay from 'date-fns/get_day';

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

export const ATTENDING_STATUS = {
  GOING: 'going',
  NOT_GOING: 'not_going',
  PENDING: 'pending',
};

export const EVENT_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};

export type RSVPStatus = $Values<typeof ATTENDING_STATUS>;

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

function inProgress(start: Date): boolean {
  if (isPast(start) && isBefore(start, new Date())) {
    return true;
  }

  return false;
}

export const palettes = {
  [EVENT_STATUS.ACTIVE]: {
    [ATTENDING_STATUS.GOING]: {
      goingButton: {
        color: getColor('green'),
        iconColor: getColor('white'),
      },
      notGoingButton: {
        color: getColor('gray'),
        iconColor: getColor('gray'),
        outline: true,
      },
    },
    [ATTENDING_STATUS.NOT_GOING]: {
      goingButton: {
        color: getColor('gray'),
        iconColor: getColor('gray'),
        outline: true,
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
        outline: true,
      },
    },
    [ATTENDING_STATUS.NOT_GOING]: {
      goingButton: {
        color: getColor('gray'),
        iconColor: getColor('gray'),
        outline: true,
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

export const common = {
  joinButton: {
    color: getColor('green'),
    text: getColor('white'),
  },
  [ATTENDING_STATUS.PENDING]: {
    goingButton: {
      color: getColor('gray'),
      iconColor: getColor('gray'),
      outline: true,
    },
    notGoingButton: {
      color: getColor('gray'),
      iconColor: getColor('gray'),
      outline: true,
    },
  },
};

function renderDate(start, end) {
  const startDay = getDay(start);
  const endDay = getDay(end);

  let endFormat = 'h:mm A';

  if (startDay < endDay) {
    endFormat = 'D.MMM, h:mm A';
  }

  return (
    <Text color="gray" size={13} lineHeight={15} style={{ paddingVertical: 9 }}>
      {`${format(start, 'h:mm A')} - ${format(end, endFormat)}`}
    </Text>
  );
}

function _renderWebinar({
  event,
  palette,
  onActionPress,
  onPress,
}): React$Node {
  return (
    <View style={[styles.midSection, styles.alignment]}>
      <TouchableOpacity onPress={onPress}>
        {inProgress(event.start) && !isPast(event.start) ? (
          <Text style={styles.liveLabel} color="white" size={13} weight="bold">
            Live
          </Text>
        ) : (
          renderDate(event.start, event.end)
        )}
      </TouchableOpacity>
      {event.is_author || isPast(event.start) ? null : (
        <Button
          disabled={isPast(event.end) || event.current_user_rsvp === 'going'}
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

function _renderEvent({ event, palette, onActionPress, onPress }): React$Node {
  const pastEvent = isPast(event.start);
  const goingButton = palette[event.current_user_rsvp].goingButton;
  const notGoingButton = palette[event.current_user_rsvp].notGoingButton;

  return (
    <View style={[styles.midSection, styles.alignment]}>
      <TouchableOpacity onPress={() => onPress(event.id)}>
        {renderDate(event.start, event.end)}
      </TouchableOpacity>

      <View style={styles.alignment}>
        <Button.Icon
          {...notGoingButton}
          disabled={pastEvent}
          iconName="close"
          onPress={() => onActionPress(ATTENDING_STATUS.NOT_GOING)}
          size="md"
          style={css('paddingRight', 12)}
        />
        <Button.Icon
          {...goingButton}
          disabled={pastEvent}
          iconName="check"
          onPress={() => onActionPress(ATTENDING_STATUS.GOING)}
          size="md"
        />
      </View>
    </View>
  );
}

function _renderPills(communities, color) {
  if (communities.length === 0) {
    return null;
  }

  const copy = [...communities];
  const item = copy.splice(0, 1);

  return (
    <View style={styles.pillWrapper}>
      {item.map(a => (
        <View key={a.id} style={css('marginHorizontal', 2)}>
          <Pill color={color} title={a.name} truncate />
        </View>
      ))}
      {copy.length > 0 ? (
        <View style={css('marginHorizontal', 2)}>
          <Pill color={color} title={`+${copy.length}`} />
        </View>
      ) : null}
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

  if (!event.current_user_rsvp) {
    event.current_user_rsvp = 'pending';
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPress(event.id)}>
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
        ? _renderWebinar({ event, palette, onActionPress, onPress })
        : _renderEvent({ event, palette, onActionPress, onPress })}

      <TouchableOpacity onPress={() => onPress(event.id)}>
        <View style={styles.alignment}>
          <View style={styles.pillWrapper}>
            {_renderPills(event.post_in, palette.pillTextColor)}
          </View>
          {event.profile_photos.length ? (
            <AvatarGroup
              imageURIs={[...event.profile_photos, '']}
              count={5}
              title={(more: number): string =>
                `+${event.total_attendees_count -
                  (event.profile_photos || []).length}`
              }
            />
          ) : null}
        </View>
      </TouchableOpacity>
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
    paddingRight: 8,
    flexDirection: 'row',
  },
});
