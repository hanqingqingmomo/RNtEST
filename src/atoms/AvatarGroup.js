// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Avatar, Text, View } from './index';

const AVATAR_WIDTH = 22;

type Props = {
  imageURIs: Array<string>,
};

export default function AvatarGroup({ imageURIs }: Props) {
  let total = imageURIs.length;
  let visibleCount = Math.floor(total / 10);
  visibleCount = Math.max(2, Math.min(visibleCount, 10));

  return (
    <View style={styles.groupContainer}>
      {imageURIs.slice(0, visibleCount).map((img, i) => (
        <View
          style={[
            styles.avatarContainer,
            { left: i === 0 ? 0 : -10, marginRight: i === 0 ? 0 : -10 },
          ]}
          key={i}
        >
          <Avatar imageURI={img} size={AVATAR_WIDTH} />
        </View>
      ))}
      <Text style={styles.userCount}>
        {total - visibleCount > 0 ? `+${total - visibleCount}` : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  groupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatarContainer: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: AVATAR_WIDTH / 2,
  },

  userCount: {
    color: '#90A4AE',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
    marginLeft: 1,
  },
});
