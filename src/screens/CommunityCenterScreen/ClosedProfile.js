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
import { type User, type CommunitySimple } from '../../Types';

type Props = {
  community: CommunitySimple,
  navigateToMember: Function,
  navigation?: any,
  reloadCommunity: Function,
  reloadCommunityList: Function,
  user?: User,
};

type State = {
  activeTab: string,
  joined: boolean,
  screenIsReady: boolean,
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
    const { user, reloadCommunity, reloadCommunityList } = this.props;
    const makeJoinCommunityReqReq = makeJoinCommunityReq(user.id, community.id);
    const makeJoinCommunityReqRes = await fetch(
      makeJoinCommunityReqReq.url,
      makeJoinCommunityReqReq.options
    );

    if (makeJoinCommunityReqRes.error) {
      this.setState({ joined: false });
    } else {
      this.setState({ joined: true });
      setTimeout(() => {
        reloadCommunity();
        reloadCommunityList();
      }, 1000);
    }
  };

  render() {
    const { community } = this.props;

    return (
      <View>
        <Collapsible collapsed={this.state.activeTab !== 'News'}>
          <CommunityHeader
            title={community.name}
            profileImageURI={community.profile_photo}
            coverImageURI={community.cover_photo}
          />
        </Collapsible>
        <JoinSection
          community={community}
          onJoin={() => this.handleOnJoin(community, fetch)}
          joined={this.state.joined}
        />
        <TabAbout
          community={community}
          navigateToMember={this.props.navigateToMember}
        />
      </View>
    );
  }
}
