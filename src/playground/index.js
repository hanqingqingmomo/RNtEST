// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';

import AvatarGroupPlayground from './AvatarGroupPlayground';
import ImageInputPlayground from './ImageInputPlayground';
import EventCardPlayground from './EventCardPlayground';
import CommunityCardPlayground from './CommunityCardPlayground';
import CommunityHeaderPlayground from './CommunityHeaderPlayground';
import SegmentedControlPlayground from './SegmentedControlPlayground';
import DonationFormPlayground from './DonationFormPlayground';
import UserProfilePlayground from './UserProfilePlayground';
import { Text, View } from '../atoms';

type LinkProps = {
  screen: string,
  navigation: Object,
  title: string,
};

const Link = ({ screen, navigation, title }: LinkProps) => (
  <Text
    size={16}
    onPress={() => navigation.navigate(screen)}
    style={{ padding: 10 }}
  >
    {title}
  </Text>
);

const PlaygroundIndexScreen = ({ navigation }) => (
  <View>
    <Link
      title="Avatar Group"
      screen="AvatarGroupPlayground"
      navigation={navigation}
    />
    <Link
      title="Image Input"
      screen="ImageInputPlayground"
      navigation={navigation}
    />
    <Link
      title="Event Card"
      screen="EventCardPlayground"
      navigation={navigation}
    />
    <Link
      title="Community Card"
      screen="CommunityCardPlayground"
      navigation={navigation}
    />
    <Link
      title="Community Header"
      screen="CommunityHeaderPlayground"
      navigation={navigation}
    />
    <Link
      title="Segmented control"
      screen="SegmentedControlPlayground"
      navigation={navigation}
    />
    <Link
      title="Donation Form"
      screen="DonationFormPlayground"
      navigation={navigation}
    />
    <Link
      title="User Profile"
      screen="UserProfilePlayground"
      navigation={navigation}
    />
  </View>
);

export const PlaygroundRouter = StackNavigator(
  {
    PlaygroundIndex: {
      screen: PlaygroundIndexScreen,
      navigationOptions: {
        title: 'Component Playground',
      },
    },
    AvatarGroupPlayground: {
      screen: AvatarGroupPlayground,
    },
    ImageInputPlayground: {
      screen: ImageInputPlayground,
    },
    EventCardPlayground: {
      screen: EventCardPlayground,
    },
    CommunityCardPlayground: {
      screen: CommunityCardPlayground,
    },
    CommunityHeaderPlayground: {
      screen: CommunityHeaderPlayground,
    },
    SegmentedControlPlayground: {
      screen: SegmentedControlPlayground,
    },
    DonationFormPlayground: {
      screen: DonationFormPlayground,
    },
    UserProfilePlayground: {
      screen: UserProfilePlayground,
    },
  },
  {
    ...StyleSheet.create({
      cardStyle: {
        backgroundColor: 'white',
      },
    }),
  }
);
