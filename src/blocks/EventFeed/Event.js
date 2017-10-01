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
    onJoin: id => void,
    onGoing: id => void,
    onNotGoing: id => void,
  },
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

export default function Event({ actions, event }: P) {
  const { date, duration, id, live, name, participants, status, tag } = event;

  const pastEvent = isPast(date);
  const palette = {
    ...palettes[pastEvent ? EVENT_STATUS.INACTIVE : EVENT_STATUS.ACTIVE],
    ...common,
  };

  return (
    <View style={[styles.alignment]}>
      <View style={[styles.eventInfo]}>
        <View style={[styles.topSection]}>
          <Text style={[styles.eventName, css('color', palette.titleColor)]}>
            {name}
          </Text>
        </View>
        <View style={[styles.midSection]}>
          {live ? (
            <View style={[styles.liveLabelWrapper]}>
              <Text style={[styles.liveLabel]}>Live</Text>
            </View>
          ) : (
            <Text style={[styles.durationText]}>
              {`${format(duration.from, 'h:mm A')} - ${format(
                duration.to,
                'h:mm A'
              )}`}
            </Text>
          )}
        </View>
        <View style={[styles.alignment]}>
          <View style={[styles.pillWrapper]}>
            <Pill color={palette.pillTextColor} title={tag} />
          </View>
          <AvatarGroup imageURIs={participants} />
        </View>
      </View>
      <View style={[styles.alignment, styles.eventActions]}>
        {live ? (
          <Button
            color={palette.joinButton.color}
            onPress={() => actions.onJoin(id)}
            size="md"
            textColor={palette.joinButton.text}
            title="Join"
          />
        ) : (
          <View style={[styles.alignment]}>
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
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  alignment: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomSection: {},
  durationText: {
    color: getColor('gray'),
    fontSize: 13,
    lineHeight: 15,
  },
  eventActions: {
    // backgroundColor: '#f0ece5',
    justifyContent: 'center',
    width: '30%',
  },
  eventInfo: {
    // backgroundColor: '#ffede0',
    width: '70%',
  },
  eventName: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 16,
  },
  liveLabel: {
    color: getColor('white'),
    fontSize: 13,
    fontWeight: 'bold',
    paddingTop: 1,
    paddingRight: 7,
    paddingBottom: 1,
    paddingLeft: 7,
  },
  liveLabelWrapper: {
    alignSelf: 'flex-start',
    backgroundColor: getColor('red'),
  },
  midSection: {
    paddingBottom: 12,
  },
  pillWrapper: {
    maxWidth: '50%',
    paddingRight: 10,
  },
  topSection: {
    paddingBottom: 6,
  },
});
