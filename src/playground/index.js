// @flow

import React from 'react';
import { StackNavigator } from 'react-navigation';

import ImageInputScreen from './ImageInputScreen';
import EventCardContainer from './EventCardContainer';
import CommunityCardContainer from './CommunityCardContainer';
import { Text, View } from '../atoms';

type LinkProps = {
  screen: string,
  navigation: Object,
  title: string,
};

const Link = ({ screen, navigation, title }: LinkProps) => (
  <Text size={16} onPress={() => navigation.navigate(screen)}>
    {title}
  </Text>
);

const PlaygroundIndexScreen = ({ navigation }) => (
  <View>
    <Link title="Image Input" screen="ImageInput" navigation={navigation} />
    <Link
      title="Event Card"
      screen="EventCardContainer"
      navigation={navigation}
    />
    <Link
      title="Community Card"
      screen="CommunityCardContainer"
      navigation={navigation}
    />
  </View>
);

export const PlaygroundRouter = StackNavigator({
  PlaygroundIndex: {
    screen: PlaygroundIndexScreen,
  },
  ImageInput: {
    screen: ImageInputScreen,
  },
  EventCardContainer: {
    screen: EventCardContainer,
  },
  CommunityCardContainer: {
    screen: CommunityCardContainer,
  },
});
