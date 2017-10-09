// @flow

import React from 'react';
import { CenterView, Like, View } from '../../atoms';

const LikePlayground = () => (
  <CenterView style={{ flexDirection: 'row' }}>
    <View style={{ paddingHorizontal: 5 }}>
      <Like count={10} iconName="like" liked onPress={() => {}} />
    </View>
    <View style={{ paddingHorizontal: 5 }}>
      <Like count={5} iconName="comment" onPress={() => {}} />
    </View>
  </CenterView>
);

LikePlayground.navigationOptions = { headerTitle: 'Like' };

export default LikePlayground;
