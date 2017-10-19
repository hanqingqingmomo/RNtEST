// @flow

import React, { Component } from 'react';
import { InteractionManager } from 'react-native';
import Collapsible from 'react-native-collapsible';

import {
  ActivityIndicator,
  CenterView,
  CommunityHeader,
  Fetch,
  Screen,
  TableView,
} from '../../atoms';
import {
  makeJoinCommunity,
  makeReadCommunityReq,
} from '../../utils/requestFactory';
import AboutTab from './AboutTab';
import JoinSection from './JoinSection';
import { type User } from '../../Types';

const { Table, Section, Cell } = TableView;

type Props = {
  navigation?: any,
};

type State = {
  screenIsReady: boolean,
  activeTab: string,
};

export default class CommunityCenterScreen extends Component<Props, State> {
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

    const readCommunityRes = makeReadCommunityReq(
      navigation.state.params.communityId
    );

    return (
      <Fetch url={readCommunityRes.url} options={readCommunityRes.options}>
        {({ loading, data, error }) => {
          console.log(data);
          return loading === false ? (
            <Screen fill>
              <Collapsible collapsed={this.state.activeTab !== 'News'}>
                <CommunityHeader
                  title={data.name}
                  profileImageURI={data.profile_photo}
                  coverImageURI={data.cover_photo}
                />
              </Collapsible>
              <JoinSection community={data} />
              <AboutTab community={data} navigateToMember={() => {}} />
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
