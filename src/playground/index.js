// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { Text, View } from '../atoms';
import AvatarPlayground from './AvatarPlayground';
import EventCardPlayground from './EventCardPlayground';
import CommunityCardPlayground from './CommunityCardPlayground';
import CommunityHeaderPlayground from './CommunityHeaderPlayground';
import FormPlayground from './FormPlayground';
import SegmentedControlPlayground from './SegmentedControlPlayground';
import DonationFormPlayground from './DonationFormPlayground';
import IconPlayground from './IconPlayground';

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
      title="Avatar, Avatar group &amp; Avatar picker"
      screen="AvatarPlayground"
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
      title="Donation Form"
      screen="DonationFormPlayground"
      navigation={navigation}
    />
    <Link
      title="Event Card"
      screen="EventCardPlayground"
      navigation={navigation}
    />
    <Link
      title="Form &amp; Form fields"
      screen="FormPlayground"
      navigation={navigation}
    />
    <Link title="Icons" screen="IconPlayground" navigation={navigation} />
    <Link
      title="Segmented control"
      screen="SegmentedControlPlayground"
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
    AvatarPlayground: {
      screen: AvatarPlayground,
    },
    CommunityCardPlayground: {
      screen: CommunityCardPlayground,
    },
    CommunityHeaderPlayground: {
      screen: CommunityHeaderPlayground,
    },
    EventCardPlayground: {
      screen: EventCardPlayground,
    },
    FormPlayground: {
      screen: FormPlayground,
    },
    IconPlayground: {
      screen: IconPlayground,
    },
    SegmentedControlPlayground: {
      screen: SegmentedControlPlayground,
    },
    DonationFormPlayground: {
      screen: DonationFormPlayground,
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
