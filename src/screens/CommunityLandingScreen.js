// @flow

import React, { Component } from 'react';

import {
  ActivityIndicator,
  CenterView,
  CommunityHeader,
  Fetch,
  Screen,
  Text,
  View,
} from '../atoms';
import { TabNavigator } from '../navigation';
import NewsTab from './CommunityLandingScreen/NewsTab';
import MembersTab from './CommunityLandingScreen/MembersTab';
import FilesTab from './CommunityLandingScreen/FilesTab';
import AboutTab from './CommunityLandingScreen/AboutTab';

const Tabs = ({ screenProps }) => {
  const C = TabNavigator(
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
    }
  );

  return <C screenProps={screenProps} />;
};

export default class CommunityLandingScreen extends Component<{}> {
  render() {
    const { navigation } = this.props;

    return (
      <Fetch url={`v1/communities/${navigation.state.params.communityId}`}>
        {({ loading, error, data }) => (
          <Screen fill>
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
            {data && (
              <View>
                <CommunityHeader
                  title={data.name}
                  subtitle={data.description}
                  profileImageURI={
                    data.profile_photo ||
                    undefined /* TODO remove when doesnt return NULL */
                  }
                  coverImageURI={
                    data.cover_photo ||
                    undefined /* TODO remove when doesnt return NULL */
                  }
                />
                <Tabs
                  screenProps={{ communityId: data.id, members: data.members }}
                />
              </View>
            )}
          </Screen>
        )}
      </Fetch>
    );
  }
}
