// @flow
import React from 'react';
import { StackNavigator } from 'react-navigation';
import ImageInputScreen from './ImageInputScreen';
import { CenterView, TextDeprecated } from '../atoms';

const PlaygroundIndexScreen = ({ navigation }) => (
  <CenterView>
    <TextDeprecated onPress={() => navigation.navigate('ImageInput')}>
      Image Input
    </TextDeprecated>
  </CenterView>
);

export const PlaygroundRouter = StackNavigator(
  {
    PlaygroundIndex: {
      screen: PlaygroundIndexScreen,
    },
    ImageInput: {
      screen: ImageInputScreen,
    },
  },
  {
    initialRouteName: 'PlaygroundIndex',
  }
);
