// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import format from 'date-fns/format';
import isPast from 'date-fns/is_past';

import { AvatarGroup, Button, Pill, Text, View } from '../../atoms';
import { css } from '../../utils/style';
import { getColor } from '../../utils/color';

const ATTENDING_STATUS = {
  GOING: 'GOING',
  NOT_GOING: 'NOT_GOING',
  PENDING: 'PENDING',
};

const EVENT_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};

type P = {
  actions: {
    onJoin: (number | string) => void,
    onGoing: (number | string) => void,
    onNotGoing: (number | string) => void,
  },
  border?: boolean,
  event: {
    date: Date,
    duration: { from: Date, to: Date },
    id: string,
    live: boolean,
    name: string,
    participants: Array<string>,
    status: $Keys<typeof ATTENDING_STATUS>,
    tag: string,
  },
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

export default function Event({ actions, event, border }: P) {
  const { date, duration, id, live, name, participants, status, tag } = event;

  const pastEvent = isPast(date);
  const palette = {
    ...palettes[pastEvent ? EVENT_STATUS.INACTIVE : EVENT_STATUS.ACTIVE],
    ...common,
  };

  return (
    <View style={[styles.container, border ? styles.borderBottom : undefined]}>
      <Text
        style={css('color', palette.titleColor)}
        fontSize={13}
        weight="500"
        lineHeight={16}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {name}
      </Text>

      {live ? (
        <View style={[styles.midSection, styles.alignment]}>
          <Text style={styles.liveLabel} color="white" size={13} weight="bold">
            Live
          </Text>
          <Button
            color={palette.joinButton.color}
            onPress={() => actions.onJoin(id)}
            size="sm"
            textColor={palette.joinButton.text}
            title="Join"
            style={styles.buttonJoin}
          />
        </View>
      ) : (
        <View style={[styles.midSection, styles.alignment]}>
          <Text color="gray" size={13} lineHeight={15}>
            {`${format(duration.from, 'h:mm A')} - ${format(
              duration.to,
              'h:mm A'
            )}`}
          </Text>
          <View style={styles.alignment}>
            <Button.Icon
              color={palette[status].notGoingButton.color}
              disabled={pastEvent}
              iconColor={palette[status].notGoingButton.iconColor}
              iconName="close"
              onPress={() => actions.onNotGoing(id)}
              outline={status !== ATTENDING_STATUS.NOT_GOING}
              size="sm"
              style={css('paddingRight', 12)}
            />
            <Button.Icon
              color={palette[status].goingButton.color}
              disabled={pastEvent}
              iconColor={palette[status].goingButton.iconColor}
              iconName="close"
              onPress={() => actions.onGoing(id)}
              outline={status !== ATTENDING_STATUS.GOING}
              size="sm"
            />
          </View>
        </View>
      )}

      <View style={styles.alignment}>
        <View style={styles.pillWrapper}>
          <Pill color={palette.pillTextColor} title={tag} />
        </View>
        <AvatarGroup imageURIs={participants} title={more => `+${more}`} />
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
  borderBottom: {
    borderColor: '#EDEFF2',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  alignment: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonJoin: {
    width: 60,
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
    marginVertical: 8,
  },
  pillWrapper: {
    maxWidth: '50%',
    paddingRight: 8,
  },
});
