// @flow

import React, { Component } from 'react';
import Collapsible from 'react-native-collapsible';

import {
  ActivityIndicator,
  CenterView,
  Fetch,
  CommunityHeader,
  Screen,
  Tabs,
  View,
} from '../../atoms';

import NewsTab from './NewsTab';
import MembersTab from './MembersTab';
import AboutTab from './AboutTab';
import type { Community, User } from '../../Types';

type Props = {
  community: Community,
};

type State = {
  activeTab: string,
};

export default class CommunityCenterScreen extends Component<Props, State> {
  state = {
    activeTab: 'News',
  };

  changeActiveTab = (activeTab: string) => {
    this.setState({ activeTab });
  };

  navigateToMember = (user: User) => {
    this.props.navigation.navigate('CommunityMemberProfileScreen', { user });
  };

  navigateToPost = (post: Object) => {
    console.log(post);
    // this.props.navigation.navigate('CommunityMemberProfileScreen', { user });
  };

  render() {
    const { community } = this.props;
    console.log(community);
    return (
      <View fill>
        <Collapsible collapsed={this.state.activeTab !== 'News'}>
          <CommunityHeader
            title={community.name}
            profileImageURI={community.profile_photo}
            coverImageURI={community.cover_photo}
          />
        </Collapsible>

        <Tabs
          activeItem={this.state.activeTab}
          onChange={this.changeActiveTab}
          items={[
            {
              label: 'News',
              component: () => (
                <NewsTab
                  communityId={community.id}
                  navigateToPost={this.navigateToPost}
                />
              ),
            },
            {
              label: 'Members',
              component: () => (
                <MembersTab
                  community={community}
                  navigateToMember={this.navigateToMember}
                />
              ),
            },
            {
              label: 'About',
              component: () => (
                <AboutTab
                  community={community}
                  navigateToMember={this.navigateToMember}
                />
              ),
            },
          ]}
        />
      </View>
    );
  }
}
