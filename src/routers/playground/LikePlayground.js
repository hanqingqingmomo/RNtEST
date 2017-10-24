// @flow

import React from 'react';
import { CenterView, Like, View } from '../../atoms';

const LikePlayground = () => (
  <CenterView style={{ flexDirection: 'row' }}>
    <View style={{ paddingHorizontal: 5 }}>
      <Like
        count={10}
        liked
        objectId="aaa"
        requestUpdate={() => {}}
        isBeingUpdated={false}
      />
    </View>
  </CenterView>
);

LikePlayground.navigationOptions = { headerTitle: 'Like' };

export default LikePlayground;
