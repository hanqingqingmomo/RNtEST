// @flow
// TODO speed up loading of community

import React, { Component } from 'react';
import { InteractionManager } from 'react-native';

import { ActivityIndicator, CenterView } from '../../atoms';
import { RQReadCommunity } from '../../utils/requestFactory';
import type { User, Community, ScreenProps } from '../../Types';
import ClosedProfile from './ClosedProfile';
import OpenProfile from './OpenProfile';

type NavigationState = {
  params: {
    communityId: string,
    reloadCommunityList: Function,
  },
};

type Props = ScreenProps<NavigationState>;

type State = {
  activeTab: string,
  community: ?Community,
  screenIsReady: boolean,
};

export default class CommunityCenterScreen extends Component<Props, State> {
  static navigationOptions = {
    title: 'Community',
  };

  state = {
    activeTab: 'News',
    community: null,
    screenIsReady: false,
  };

  componentWillMount() {
    this.fetchCommunity(this.props.navigation.state.params.communityId);
    InteractionManager.runAfterInteractions(() => {
      this.setState({ screenIsReady: true });
    });
  }

  changeActiveTab = (activeTab: string) => {
    this.setState({ activeTab });
  };

  async fetchCommunity(communityId: string) {
    const response = await RQReadCommunity(communityId);

    this.setState({ community: response.data });
  }

  navigateToMember = (user: User) => {
    this.props.navigation.navigate('CommunityTab:MemberProfileScreen', {
      user,
    });
  };

  render() {
    const { community, screenIsReady } = this.state;

    if (community === null || screenIsReady === false) {
      return (
        <CenterView>
          <ActivityIndicator />
        </CenterView>
      );
    }

    return community.joined ? (
      <OpenProfile
        community={community}
        navigation={this.props.navigation}
        navigateToMember={this.navigateToMember}
      />
    ) : (
      <ClosedProfile
        community={community}
        navigateToMember={this.navigateToMember}
        reloadCommunity={id => this.fetchCommunity(id)}
        reloadCommunityList={
          this.props.navigation.state.params.reloadCommunityList
        }
      />
    );
  }
}
