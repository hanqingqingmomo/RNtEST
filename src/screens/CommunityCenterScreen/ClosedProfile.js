// @flow

import React, { Component } from 'react';
import { InteractionManager } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { connect } from 'react-redux';

import { CommunityHeader, View } from '../../atoms';
import { makeJoinCommunityReq } from '../../utils/requestFactory';
import { selectUser } from '../../redux/selectors';
import TabAbout from './TabAbout';
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
    const makeJoinCommunityReqReq = makeJoinCommunityReq(user.id, community.id);
    const makeJoinCommunityReqRes = await fetch(
      makeJoinCommunityReqReq.url,
      makeJoinCommunityReqReq.options
    );

    if (makeJoinCommunityReqRes.error) {
      this.setState({ joined: false });
    }

    if (makeJoinCommunityReqRes.response.status < 300) {
      this.setState({ joined: true });
      navigation.state.params.onMemershipStatusChange('joined');
      setTimeout(() => navigation.goBack(), 1000);
    }
  };

  render() {
    const { profile } = this.props;
    return (
      <View>
        <Collapsible collapsed={this.state.activeTab !== 'News'}>
          <CommunityHeader
            title={profile.name}
            profileImageURI={profile.profile_photo}
            coverImageURI={profile.cover_photo}
          />
        </Collapsible>
        <JoinSection
          community={profile}
          onJoin={() => this.handleOnJoin(profile, fetch)}
          joined={this.state.joined}
        />
        <TabAbout
          community={profile}
          navigateToMember={this.props.navigateToMember}
        />
      </View>
    );
  }
}
