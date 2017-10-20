// @flow

import React, { Component } from 'react';
import { InteractionManager } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { connect } from 'react-redux';

import {
  ActivityIndicator,
  CenterView,
  CommunityHeader,
  Fetch,
  Screen,
} from '../../atoms';
import {
  makeJoinCommunity,
  makeReadCommunityReq,
} from '../../utils/requestFactory';
import { selectUser } from '../../redux/selectors';
import AboutTab from './AboutTab';
import JoinSection from './JoinSection';
import { type User } from '../../Types';

type Props = {
  navigation?: any,
  user: User,
};

type State = {
  screenIsReady: boolean,
  activeTab: string,
  joined: boolean,
};

const mapStateToProps = state => ({
  user: selectUser(state),
});

@connect(mapStateToProps)
export default class CommunityCenterScreen extends Component<Props, State> {
  state = {
    screenIsReady: false,
    activeTab: 'News',
    joined: false,
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

  handleOnJoin = async (community: Object, fetch: any) => {
    const { user, navigation } = this.props;
    const makeJoinCommunityReq = makeJoinCommunity(user.id, community.id);
    const makeJoinCommunityRes = await fetch(
      makeJoinCommunityReq.url,
      makeJoinCommunityReq.options
    );

    if (makeJoinCommunityRes.error) {
      this.setState({ joined: false });
    }

    if (makeJoinCommunityRes.response.status < 300) {
      this.setState({ joined: true });
      navigation.state.params.onMemershipStatusChange('joined');
      setTimeout(() => navigation.goBack(), 1000);
    }
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
        {({ loading, data, error, fetch }) => {
          return loading === false ? (
            <Screen fill>
              <Collapsible collapsed={this.state.activeTab !== 'News'}>
                <CommunityHeader
                  title={data.name}
                  profileImageURI={data.profile_photo}
                  coverImageURI={data.cover_photo}
                />
              </Collapsible>
              <JoinSection
                community={data}
                onJoin={() => this.handleOnJoin(data, fetch)}
                joined={this.state.joined}
              />
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
