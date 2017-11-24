// @flow

import React from 'react';
import { CenterView, View } from '../../atoms';

const LikePlayground = () => (
  <CenterView style={{ flexDirection: 'row' }}>
    <View style={{ paddingHorizontal: 5 }} />
  </CenterView>
);

LikePlayground.navigationOptions = { headerTitle: 'Like' };

export default LikePlayground;
