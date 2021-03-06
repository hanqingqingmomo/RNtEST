// @flow

import React from 'react';

import { StackNavigator } from '../../navigation';
import { ScrollView, Text, NavigationIconButton } from '../../atoms';
import {
  AuthenticationRootScreen,
  EmailRegistrationScreen,
  EventDetailScreen,
  InviteFriendsScreen,
  LandingScreen,
  NewsFeedSettingsScreen,
  NotificationSettingsScreen,
  UserProfileScreen,
  UserSettingsScreen,
} from '../../screens';

import AvatarPlayground from './AvatarPlayground';
import ButtonPlayground from './ButtonPlayground';
import CommentPlayground from './CommentPlayground';
import CommunityCardPlayground from './CommunityCardPlayground';
import CommunityHeaderPlayground from './CommunityHeaderPlayground';
import ContactGroupPlayground from './ContactGroupPlayground';
import DonationFormPlayground from './DonationFormPlayground';
import EventCardPlayground from './EventCardPlayground';
import EventFeedPlayground from './EventFeedPlayground';
import FormPlayground from './FormPlayground';
import IconPlayground from './IconPlayground';
import LikePlayground from './LikePlayground';
import NewsfeedPlayground from './NewsfeedPlayground';
import PollEditorPlayground from './PollEditorPlayground';
import PopoverPlayground from './PopoverPlayground';
import RichTextEditorPlayground from './RichTextEditorPlayground';
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
    <Link title="Comments" screen="CommentPlayground" navigation={navigation} />
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
      title="Edit User Profile"
      screen="UserProfileScreen"
      navigation={navigation}
    />
    <Link
      title="Event Card"
      screen="EventCardPlayground"
      navigation={navigation}
    />
    <Link
      title="Event Screen"
      screen="EventDetailScreen"
      navigation={navigation}
    />
    <Link
      title="Event Feed"
      screen="EventFeedPlayground"
      navigation={navigation}
    />
    <Link
      title="Form &amp; Form fields"
      screen="FormPlayground"
      navigation={navigation}
    />
    <Link title="Icons" screen="IconPlayground" navigation={navigation} />
    <Link
      title="Invite Friends"
      screen="InviteFriendsScreen"
      navigation={navigation}
    />
    <Link
      title="Landing screen"
      screen="LandingScreen"
      navigation={navigation}
    />
    <Link
      title="Likes &amp; Comments"
      screen="LikePlayground"
      navigation={navigation}
    />
    <Link
      title="Newsfeed"
      screen="NewsfeedPlayground"
      navigation={navigation}
    />
    <Link
      title="Newsfeed Settings"
      screen="NewsFeedSettingsPlayground"
      navigation={navigation}
    />
    <Link
      title="Notification Settings"
      screen="NotificationSettingsScreen"
      navigation={navigation}
    />
    <Link
      title="Poll Editor"
      screen="PollEditorPlayground"
      navigation={navigation}
    />
    <Link title="Popover" screen="PopoverPlayground" navigation={navigation} />
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
      title="Sign Up screen"
      screen="EmailRegistrationScreen"
      navigation={navigation}
    />
    <Link
      title="Settings Screen"
      screen="UserSettingsScreen"
      navigation={navigation}
    />
    <Link title="Tabs" screen="TabsPlayground" navigation={navigation} />
    <Link
      title="User Profile"
      screen="UserProfilePlayground"
      navigation={navigation}
    />
    <Link
      title="Rich Text Editor"
      screen="RichTextEditorPlayground"
      navigation={navigation}
    />
  </ScrollView>
);

export default StackNavigator(
  {
    PlaygroundIndex: {
      screen: PlaygroundIndexScreen,
      navigationOptions: ({ navigation, screenProps }) => {
        return {
          title: 'Component Playground',
          headerLeft: (
            <NavigationIconButton
              name="close"
              color="orange"
              onPress={screenProps.dismissModalRoute}
            />
          ),
        };
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
    CommentPlayground: {
      screen: CommentPlayground,
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
    EventFeedPlayground: {
      screen: EventFeedPlayground,
    },
    EventDetailScreen: {
      screen: EventDetailScreen,
    },
    EmailRegistrationScreen: {
      screen: EmailRegistrationScreen,
    },
    FormPlayground: {
      screen: FormPlayground,
    },
    IconPlayground: {
      screen: IconPlayground,
    },
    InviteFriendsScreen: {
      screen: InviteFriendsScreen,
    },
    LandingScreen: {
      screen: LandingScreen,
    },
    LikePlayground: {
      screen: LikePlayground,
    },
    NewsfeedPlayground: {
      screen: NewsfeedPlayground,
    },
    NewsFeedSettingsPlayground: {
      screen: NewsFeedSettingsScreen,
    },
    NotificationSettingsScreen: {
      screen: NotificationSettingsScreen,
    },
    PollEditorPlayground: {
      screen: PollEditorPlayground,
    },
    PopoverPlayground: {
      screen: PopoverPlayground,
    },
    SearchResultPlayground: {
      screen: SearchResultPlayground,
    },
    SegmentedControlPlayground: {
      screen: SegmentedControlPlayground,
    },
    TabsPlayground: {
      screen: TabsPlayground,
    },
    UserProfilePlayground: {
      screen: UserProfilePlayground,
    },
    UserProfileScreen: {
      screen: UserProfileScreen,
    },
    UserSettingsScreen: {
      screen: UserSettingsScreen,
    },
    RichTextEditorPlayground: {
      screen: RichTextEditorPlayground,
    },
  },
  {
    initialRouteName: 'PlaygroundIndex',
  }
);
