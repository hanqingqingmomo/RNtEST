// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { css } from '../utils/style';
import { Avatar, Text, View } from './index';

const AVATAR_WIDTH = 22;
const OUTLINE_WIDTH = 2;
const OVERLAP = AVATAR_WIDTH * 0.45;

type Props = {
  imageURIs: Array<string>,
};

export default function AvatarGroup({ imageURIs }: Props) {
  const total = imageURIs.length;
  let visibleCount = Math.floor(total / 10);
  visibleCount = Math.max(2, Math.min(visibleCount, 10));

  return (
    <View style={styles.groupContainer}>
      {imageURIs.slice(0, visibleCount).map((img, i) => (
        <View key={i} style={styles.avatarContainer}>
          <Avatar imageURI={img} size={AVATAR_WIDTH - OUTLINE_WIDTH * 2} />
        </View>
      ))}
      <Text
        size={12}
        weight="600"
        lineHeight={18}
        style={[css('color', '#90A4AE'), css('marginLeft', 5)]}
      >
        {total - visibleCount > 0 ? `+${total - visibleCount}` : ''}
      </Text>
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
    borderRadius: AVATAR_WIDTH / 2,
    borderWidth: OUTLINE_WIDTH,
    marginLeft: -OVERLAP,
  },
});
