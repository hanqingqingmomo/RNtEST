// @flow

import React from 'react';
import { CenterView, Like } from '../atoms';

const LikePlayground = () => (
  <CenterView>
    <Like count={10} name="like" liked onPress={() => {}} />
    <Like count={5} name="comment" onPress={() => {}} />
  </CenterView>
);

LikePlayground.navigationOptions = { headerTitle: 'Like' };

export default LikePlayground;
