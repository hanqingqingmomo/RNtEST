// @flow

import React, { Component } from 'react';
import Collapsible from 'react-native-collapsible';

import {
  ActivityIndicator,
  CenterView,
  CommunityHeader,
  Fetch,
  Screen,
  Text,
  View,
} from '../../atoms';
import { makeReadCommunityDetailRq } from '../../utils/requestFactory';
import { TabNavigator } from '../../navigation';
import NewsTab from './../CommunityLandingScreen/NewsTab';
import MembersTab from './../CommunityLandingScreen/MembersTab';
import FilesTab from './../CommunityLandingScreen/FilesTab';
import AboutTab from './../CommunityLandingScreen/AboutTab';

const CommunityTabNavigator = TabNavigator(
  {
    NewsTab: {
      screen: NewsTab,
    },
    MembersTab: {
      screen: MembersTab,
    },
    FilesTab: {
      screen: FilesTab,
    },
    AboutTab: {
      screen: AboutTab,
    },
  },
  {
    initialRouteName: 'NewsTab',
    animationEnabled: false,
  }
);

type State = {
  activeTabIndex: number,
};

export default class CommunityLandingScreen extends Component<{}, State> {
  state = {
    activeTabIndex: 0,
  };

  trackTabChange = (prevState, currentState) => {
    this.setState({
      activeTabIndex: currentState.index,
    });
  };

  render() {
    const { navigation } = this.props;
    const { activeTabIndex } = this.state;

    const readCommunityDetailRq = makeReadCommunityDetailRq(
      navigation.state.params.communityId
    );

    return (
      <Screen fill>
        <Fetch
          url={readCommunityDetailRq.url}
          options={readCommunityDetailRq.options}
        >
          {({ loading, error, data }) => (
            <View>
              {loading && (
                <CenterView>
                  <ActivityIndicator />
                </CenterView>
              )}
              {error && (
                <CenterView>
                  <Text>{error.message}</Text>
                </CenterView>
              )}
              {!loading &&
                data && (
                  <View style={{ flex: 1, height: '100%' }}>
                    <Collapsible collapsed={activeTabIndex !== 0}>
                      <CommunityHeader
                        title={data.name}
                        profileImageURI={data.profile_photo}
                        coverImageURI={data.cover_photo}
                      />
                    </Collapsible>
                    <CommunityTabNavigator
                      onNavigationStateChange={this.trackTabChange}
                      screenProps={{
                        communityId: data.id,
                        members: data.members,
                        communitiesNavigation: navigation,
                      }}
                    />
                  </View>
                )}
            </View>
          )}
        </Fetch>
      </Screen>
    );
  }
}
