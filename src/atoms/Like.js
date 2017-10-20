// @flow

import React from 'react';

import { Fetch, TouchableItem, Count } from '../atoms';
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
        <TouchableItem onPress={onPress(fetch)}>
          <Count iconName={iconName} count={count} pined={liked} />
        </TouchableItem>
      )}
    </Fetch>
  );
}
