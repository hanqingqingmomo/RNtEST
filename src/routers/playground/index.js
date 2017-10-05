// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { ScrollView, Text } from '../../atoms';

import {
  AuthenticationRootScreen,
  LandingScreen,
  EmailRegistrationScreen,
} from '../../screens';

import AvatarPlayground from './AvatarPlayground';
import ButtonPlayground from './ButtonPlayground';
import CommunityCardPlayground from './CommunityCardPlayground';
import CommunityHeaderPlayground from './CommunityHeaderPlayground';
import ContactGroupPlayground from './ContactGroupPlayground';
import DonationFormPlayground from './DonationFormPlayground';
import EventCardPlayground from './EventCardPlayground';
import FormPlayground from './FormPlayground';
import IconPlayground from './IconPlayground';
import NewsfeedPlayground from './NewsfeedPlayground';
import SearchResultPlayground from './SearchResultPlayground';
import SegmentedControlPlayground from './SegmentedControlPlayground';
import TabsPlayground from './TabsPlayground';
import UserProfilePlayground from './UserProfilePlayground';

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
  <ScrollView>
    <Link
      title="Avatar, Avatar group &amp; Avatar picker"
      screen="AvatarPlayground"
      navigation={navigation}
    />
    <Link
      title="Authentication Root"
      screen="AuthenticationRootScreen"
      navigation={navigation}
    />
    <Link title="Buttons" screen="ButtonPlayground" navigation={navigation} />
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
      title="Contact Group"
      screen="ContactGroupPlayground"
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
      title="Landing screen"
      screen="LandingScreen"
      navigation={navigation}
    />
    <Link
      title="Newsfeed"
      screen="NewsfeedPlayground"
      navigation={navigation}
    />
    <Link
      title="Search Result"
      screen="SearchResultPlayground"
      navigation={navigation}
    />
    <Link
      title="Segmented control"
      screen="SegmentedControlPlayground"
      navigation={navigation}
    />
    <Link
      title="SignUp screen"
      screen="EmailRegistrationScreen"
      navigation={navigation}
    />
    <Link title="Tabs" screen="TabsPlayground" navigation={navigation} />
    <Link
      title="User Profile"
      screen="UserProfilePlayground"
      navigation={navigation}
    />
  </ScrollView>
);

export default StackNavigator(
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
    AuthenticationRootScreen: {
      screen: AuthenticationRootScreen,
    },
    ButtonPlayground: {
      screen: ButtonPlayground,
    },
    CommunityCardPlayground: {
      screen: CommunityCardPlayground,
    },
    CommunityHeaderPlayground: {
      screen: CommunityHeaderPlayground,
    },
    ContactGroupPlayground: {
      screen: ContactGroupPlayground,
    },
    DonationFormPlayground: {
      screen: DonationFormPlayground,
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
    LandingScreen: {
      screen: LandingScreen,
    },
    NewsfeedPlayground: {
      screen: NewsfeedPlayground,
    },
    SearchResultPlayground: {
      screen: SearchResultPlayground,
    },
    SegmentedControlPlayground: {
      screen: SegmentedControlPlayground,
    },
    EmailRegistrationScreen: {
      screen: EmailRegistrationScreen,
    },
    TabsPlayground: {
      screen: TabsPlayground,
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
