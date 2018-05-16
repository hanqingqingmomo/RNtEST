// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import format from 'date-fns/format';
import isBefore from 'date-fns/is_before';
import isAfter from 'date-fns/is_after';

import { ImageBackground, Pill, Text, View } from './index';
import { getColor } from '../utils/color';
import { css } from '../utils/style';
import type { Community } from '../Types';

type Props = {
  title: string,
  cover_photo: string,
  start: Date,
  end: Date,
  location: string,
  post_in: Array<Community>,
};

function _renderPills(communities: Array<Community>) {
  const copy = [...communities];
  const items = copy.splice(0, 2);

  return (
    <View style={css('flexDirection', 'row')}>
      {items.map((community: Community) => (
        <View key={community.id} style={css('marginHorizontal', 2)}>
          <Pill color={getColor('white')} title={community.name} />
        </View>
      ))}
      {copy.length > 0 ? (
        <View style={css('marginHorizontal', 2)}>
          <Pill color={getColor('white')} title={`+${copy.length}`} />
        </View>
      ) : null}
    </View>
  );
}

export default function EventHeader({
  title,
  cover_photo,
  start,
  end,
  location,
  post_in,
}: Props): React$Node {
  function isBetween(): boolean {
    return isBefore(new Date(), end) && isAfter(new Date(), start);
  }

  function status(): string {
    if (isBetween()) {
      return 'In Progress';
    }

    if (isAfter(new Date(), end)) {
      return format(start, 'MM/DD/YYYY');
    }

    return format(start, 'MM/DD/YYYY');
  }

  return (
    <ImageBackground
      source={{ uri: cover_photo || '' }}
      style={styles.container}
    >
      <View style={[styles.dimm, StyleSheet.absoluteFill]} />
      <View style={styles.headerContainer}>
        <View style={styles.textWrapper}>
          <Text
            color={getColor('white')}
            lineHeight={24}
            size={20}
            style={css('marginBottom', 6)}
          >
            {title}
          </Text>
          <Text
            color={getColor('white')}
            lineHeight={16}
            size={14}
            weight="500"
          >
            {`${status()}, ${format(start, 'h:mm A')} - ${format(
              end,
              'h:mm A'
            )}, ${location}`}
          </Text>
        </View>

        {_renderPills(post_in)}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 186,
  },
  dimm: {
    backgroundColor: '#161D21',
    opacity: 0.35,
  },
  headerContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    justifyContent: 'flex-end',
    flex: 1,
  },
  textWrapper: {
    backgroundColor: 'transparent',
    paddingBottom: 10,
    width: '100%',
  },
});
