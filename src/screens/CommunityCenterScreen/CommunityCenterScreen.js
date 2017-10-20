// @flow

import React, { Component } from 'react';
import { InteractionManager } from 'react-native';
import Collapsible from 'react-native-collapsible';

import {
  ActivityIndicator,
  CenterView,
  Fetch,
  CommunityHeader,
  Screen,
  Tabs,
} from '../../atoms';
import { makeReadCommunityReq } from '../../utils/requestFactory';
import NewsTab from './NewsTab';
import MembersTab from './MembersTab';
import AboutTab from './AboutTab';
import { type User } from '../../Types';

import ClosedCommunityCenterScreen from './ClosedCommunityCenterScreen';

type State = {
  screenIsReady: boolean,
  activeTab: string,
};

export default class CommunityCenterScreen extends Component<{}, State> {
  state = {
    screenIsReady: false,
    activeTab: 'News',
  };

  componentWillMount() {
    InteractionManager.runAfterInteractions(this.initDataFetch);
  }

  initDataFetch = () => {
    this.setState({ screenIsReady: true });
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
    const { navigation } = this.props;

    if (this.state.screenIsReady === false) {
      return <Screen fill />;
    }

    const readCommunityReg = makeReadCommunityReq(
      navigation.state.params.communityId
    );

    return (
      <Fetch url={readCommunityReg.url} options={readCommunityReg.options}>
        {({ loading, data, error }) => {
          if (loading === false && data && !data.joined) {
            return <ClosedCommunityCenterScreen {...this.props} />;
          }
          return loading === false ? (
            <Screen fill>
              <Collapsible collapsed={this.state.activeTab !== 'News'}>
                <CommunityHeader
                  title={data.name}
                  profileImageURI={data.profile_photo}
                  coverImageURI={data.cover_photo}
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
                        communityId={data.id}
                        navigateToPost={this.navigateToPost}
                      />
                    ),
                  },
                  {
                    label: 'Members',
                    component: () => (
                      <MembersTab
                        community={data}
                        navigateToMember={this.navigateToMember}
                      />
                    ),
                  },
                  {
                    label: 'About',
                    component: () => (
                      <AboutTab
                        community={data}
                        navigateToMember={this.navigateToMember}
                      />
                    ),
                  },
                ]}
              />
            </Screen>
          ) : (
            <CenterView>
              <ActivityIndicator />
            </CenterView>
          );
        }}
      </Fetch>
    );
  }
}
