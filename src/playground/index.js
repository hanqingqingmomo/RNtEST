// @flow
import React from 'react';
import { StackNavigator } from 'react-navigation';
import ImageInputScreen from './ImageInputScreen';
import { CenterView, Text } from '../atoms';

const PlaygroundIndexScreen = ({ navigation }) => (
  <CenterView>
    <Text onPress={() => navigation.navigate('ImageInput')}>Image Input</Text>
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
