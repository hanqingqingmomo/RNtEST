// @flow

import React, { Component } from 'react';
import { InteractionManager } from 'react-native';

import { ActivityIndicator, CenterView, Fetch, Screen } from '../../atoms';
import { makeReadCommunityReq } from '../../utils/requestFactory';
import type { User, Community } from '../../Types';
import ClosedProfile from './ClosedProfile';
import OpenProfile from './OpenProfile';

type FetchData = {
  data?: Community,
};

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

  renderLoader() {
    return (
      <CenterView>
        <ActivityIndicator />
      </CenterView>
    );
  }

  render() {
    if (this.state.screenIsReady === false) {
      return this.renderLoader();
    }

    const readCommunityReg = makeReadCommunityReq(
      this.props.navigation.state.params.communityId
    );

    return (
      <Screen fill>
        <Fetch url={readCommunityReg.url} options={readCommunityReg.options}>
          {({ data, pinnedData }: FetchData) => {
            if (data) {
              return <OpenProfile community={data} {...this.props} />;
            }
            return !data ? (
              this.renderLoader()
            ) : data.joined ? (
              <OpenProfile community={data} />
            ) : (
              <ClosedProfile
                profile={data}
                navigateToMember={this.navigateToMember}
              />
            );
          }}
        </Fetch>
      </Screen>
    );
  }
}
