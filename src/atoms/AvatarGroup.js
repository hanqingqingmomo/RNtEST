// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { css } from '../utils/style';
import { Avatar, Text, View } from './index';

const AVATAR_WIDTH = 24;
const OUTLINE_WIDTH = 2;
const OVERLAP = AVATAR_WIDTH * 0.45;

type Props = {
  imageURIs: Array<string>,
  title: number => string,
  count?: number,
};

export default function AvatarGroup({ imageURIs, title, count }: Props) {
  const total = imageURIs.length;
  let visibleCount = Math.floor(total / 10);
  if (count) {
    visibleCount = Math.min(count, total);
  } else {
    visibleCount = Math.max(2, Math.min(visibleCount, 10));
  }

  const diff = total - visibleCount;

  return (
    <View style={styles.groupContainer}>
      {imageURIs.slice(0, visibleCount).map(
        (uri, i) =>
          uri ? (
            <View key={i} style={styles.avatarContainer}>
              <Avatar
                source={{ uri }}
                size={AVATAR_WIDTH - OUTLINE_WIDTH * 2}
              />
            </View>
          ) : null
      )}
      {diff > 0 ? (
        <Text
          color="gray"
          size={12}
          weight="600"
          lineHeight={18}
          style={css('marginLeft', 5)}
        >
          {title(diff)}
        </Text>
      ) : null}
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
    backgroundColor: '#fff',
    borderColor: 'transparent',
    borderWidth: OUTLINE_WIDTH,
    borderRadius: AVATAR_WIDTH / 2,
    marginLeft: -OVERLAP,
  },
});
