// @flow

import React, { Component } from 'react';
import Collapsible from 'react-native-collapsible';

import { CommunityHeader, Tabs, Screen } from '../../atoms';
import TabMembers from './TabMembers';
import TabAbout from './TabAbout';
import CommunityFeedScreen from '../CommunityFeedScreen';
import type { Community, User, ScreenProps } from '../../Types';

type Props = ScreenProps<*> & {
  community: Community,
  // TODO proper type
  navigation: Object,
  navigateToMember(User): any,
};

type State = {
  activeTab: string,
};

export default class OpenProfile extends Component<Props, State> {
  state = {
    activeTab: 'News',
  };

  changeActiveTab = (activeTab: string) => {
    this.setState({ activeTab });
  };

  render() {
    const { community } = this.props;

    return (
      <Screen fill scrollEnabled={false}>
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
                <CommunityFeedScreen
                  navigation={this.props.navigation}
                  communityId={community.id}
                />
              ),
            },
            {
              label: `Members (${community.members})`,
              component: () => (
                <TabMembers
                  community={community}
                  navigateToMember={this.props.navigateToMember}
                />
              ),
            },
            {
              label: 'About',
              component: () => (
                <TabAbout
                  community={community}
                  navigateToMember={this.props.navigateToMember}
                />
              ),
            },
          ]}
        />
      </Screen>
    );
  }
}
