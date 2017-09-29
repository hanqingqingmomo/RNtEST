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
  PENDING: 'PENDING',
  NOT_GOING: 'NOT_GOING',
};

type Props = {
  imageURI: string,
  size: number,
};

const palettes = {
  inactive: {
    GOING: {
      color: {
        true: getColor('gray'),
        false: getColor('gray'),
      },
      iconColor: {
        true: getColor('white'),
        false: getColor('gray'),
      },
    },
    NOT_GOING: {
      color: {
        true: getColor('gray'),
        false: getColor('gray'),
      },
      iconColor: {
        true: getColor('white'),
        false: getColor('gray'),
      },
    },
    titleColor: getColor('gray'),
    pillTextColor: getColor('gray'),
  },
  active: {
    GOING: {
      color: {
        true: getColor('green'),
        false: getColor('gray'),
      },
      iconColor: {
        true: getColor('white'),
        false: getColor('gray'),
      },
    },
    NOT_GOING: {
      color: {
        true: getColor('red'),
        false: getColor('gray'),
      },
      iconColor: {
        true: getColor('white'),
        false: getColor('gray'),
      },
    },
    titleColor: 'rgba(69,90,100,1)',
    pillTextColor: getColor('orange'),
  },
};

const common = {
  joinButton: {
    color: getColor('green'),
    text: getColor('white'),
  },
  pendingButton: {
    color: getColor('gray'),
    iconColor: getColor('white'),
  },
  PENDING: {
    color: {
      true: getColor('gray'),
      false: getColor('white'),
    },
    iconColor: {
      true: getColor('white'),
      false: getColor('gray'),
    },
  },
};

export default function Event({ event }: Props) {
  const { date, duration, live, name, participants, status, tag } = event;

  const pastEvent = isPast(date);
  const palette = { ...palettes[pastEvent ? 'inactive' : 'active'], ...common };

  return (
    <View style={[styles.eventWrapper]}>
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
            onPress={() => {}}
            size="md"
            textColor={palette.joinButton.text}
            title="Join"
          />
        ) : (
          <View style={[styles.alignment]}>
            <Button.Icon
              color={
                palette[ATTENDING_STATUS.NOT_GOING].color[
                  status === ATTENDING_STATUS.NOT_GOING
                ]
              }
              disabled={pastEvent}
              iconColor={
                palette[status].iconColor[status === ATTENDING_STATUS.NOT_GOING]
              }
              iconName="close"
              onPress={() => {}}
              outline={status !== ATTENDING_STATUS.NOT_GOING}
              size="sm"
              style={css('paddingRight', 12)}
            />
            <Button.Icon
              color={
                palette[ATTENDING_STATUS.GOING].color[
                  status === ATTENDING_STATUS.GOING
                ]
              }
              disabled={pastEvent}
              iconColor={
                palette[status].iconColor[status === ATTENDING_STATUS.GOING]
              }
              iconName="close"
              onPress={() => {}}
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
    backgroundColor: '#f0ece5',
    justifyContent: 'center',
    width: '30%',
  },
  eventInfo: {
    backgroundColor: '#ffede0',
    width: '70%',
  },
  eventName: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 16,
  },
  eventWrapper: {
    flexDirection: 'row',
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
