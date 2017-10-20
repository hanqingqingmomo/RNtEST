// @flow

import React, { Component } from 'react';
import Collapsible from 'react-native-collapsible';

import { CommunityHeader, Tabs, View } from '../../atoms';
import TabNewsFeed from './TabNewsFeed';
import TabMembers from './TabMembers';
import TabAbout from './TabAbout';
import type { Community, User } from '../../Types';
import { css } from '../../utils/style';

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
    return (
      <View style={css('flexGrow', 1)}>
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
                <TabNewsFeed
                  communityId={community.id}
                  navigateToPost={this.navigateToPost}
                />
              ),
            },
            {
              label: 'Members',
              component: () => (
                <TabMembers
                  community={community}
                  navigateToMember={this.navigateToMember}
                />
              ),
            },
            {
              label: 'About',
              component: () => (
                <TabAbout
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
