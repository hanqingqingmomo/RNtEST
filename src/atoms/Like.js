// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Fetch, Text, Icon, TouchableItem } from '../atoms';
import { getColor } from '../utils/color';
import { css } from '../utils/style';
import { makeLikeRq } from '../utils/requestFactory';

type P = {
  count: number,
  liked: boolean,
  iconName: string,
  objectId: string,
};

export default function Like({ count, liked, objectId, iconName }: P) {
  const onPress = (fetch: any) => () => {
    const likeRq = makeLikeRq(objectId, liked);
    fetch(likeRq.url, likeRq.options);
  };

  return (
    <Fetch manual>
      {({ loading, data, error, fetch }) => (
        <TouchableItem style={styles.container} onPress={onPress(fetch)}>
          <Icon
            name={iconName}
            size={18}
            color={liked ? getColor('orange') : '#cfd8dc'}
            style={[styles.icon]}
          />
          <Text
            style={css('color', '#8fa3ad')}
            size={13}
            lineHeight={18}
            weight="600"
          >
            {count}
          </Text>
        </TouchableItem>
      )}
    </Fetch>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
});
