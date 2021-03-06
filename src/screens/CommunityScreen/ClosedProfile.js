// @flow

import React, { Component } from 'react';
import { InteractionManager } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { connect } from 'react-redux';

import { CommunityHeader, Screen } from '../../atoms';
import { RQJoinCommunity } from '../../utils/requestFactory';
import { setUserProfile } from '../../redux/ducks/application';
import { selectUser } from '../../redux/selectors';
import TabAbout from './TabAbout';
import JoinSection from './JoinSection';
import type { User, CommunitySimple, ScreenProps } from '../../Types';

type Props = ScreenProps<*> & {
  community: CommunitySimple,
  navigateToMember(User): mixed,
  reloadCommunity: Function,
  reloadCommunityList: Function,
  setUserProfile: Function,
  user: User,
};

type State = {
  activeTab: string,
  joined: boolean,
  screenIsReady: boolean,
};

const mapStateToProps = state => ({
  user: selectUser(state),
});

class ClosedProfile extends Component<Props, State> {
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

  handleOnJoin = async (community: Object, fetch: any) => {
    const { user, reloadCommunity, reloadCommunityList } = this.props;
    const response = await RQJoinCommunity(user.id, community.id);
    if (!response.ok) {
      this.setState({ joined: false });
    } else {
      const user = { ...this.props.user };
      user.joined_communities.push(community);
      this.setState({ joined: true });
      setTimeout(() => {
        if (typeof reloadCommunity === 'function') {
          reloadCommunity(community.id);
        }
        if (typeof reloadCommunityList === 'function') {
          reloadCommunityList();
        }
        this.props.setUserProfile(user);
      }, 1000);
    }
  };

  render() {
    const { community } = this.props;

    return (
      <Screen fill>
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
      </Screen>
    );
  }
}

export default connect(mapStateToProps, { setUserProfile })(ClosedProfile);
