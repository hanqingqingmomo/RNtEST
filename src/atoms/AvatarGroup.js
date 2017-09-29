// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Avatar, Text, View } from './index';

const AVATAR_WIDTH = 22;
const OUTLINE_WIDTH = 2;
const TOTAL_WIDTH = AVATAR_WIDTH + OUTLINE_WIDTH * 2;
const OVERLAP = TOTAL_WIDTH * 0.45;

type Props = {
  imageURIs: Array<string>,
  title: number => string,
};

export default function AvatarGroup({ imageURIs, title }: Props) {
  const total = imageURIs.length;
  let visibleCount = Math.floor(total / 10);
  visibleCount = Math.max(2, Math.min(visibleCount, 10));

  const diff = total - visibleCount;

  return (
    <View style={styles.groupContainer}>
      {imageURIs.slice(0, visibleCount).map((img, i) => (
        <View key={i} style={styles.avatarContainer}>
          <Avatar imageURI={img} size={AVATAR_WIDTH} />
        </View>
      ))}
      <Text style={styles.userCount}>{title(diff)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  groupContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: OVERLAP,
  },
  avatarContainer: {
    backgroundColor: '#90A4AE',
    borderColor: '#fff',
    borderRadius: TOTAL_WIDTH / 2,
    borderWidth: OUTLINE_WIDTH,
    marginLeft: -OVERLAP,
  },
  userCount: {
    color: '#90A4AE',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
    marginLeft: 1,
  },
});
