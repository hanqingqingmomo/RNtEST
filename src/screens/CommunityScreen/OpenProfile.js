// @flow

import React, { Component } from 'react';
import Collapsible from 'react-native-collapsible';
import { RefreshControl, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { CommunityHeader, Tabs } from '../../atoms';
import { getColor } from '../../utils/color';
import TabMembers from './TabMembers';
import TabAbout from './TabAbout';
import CommunityFeedScreen from '../CommunityFeedScreen';
import type { Community, User, ScreenProps } from '../../Types';
import { loadTimeline, type Timeline } from '../../redux/ducks/timelines';
import { selectTimeline } from '../../redux/selectors';

type Props = ScreenProps<*> & {
  community: Community,
  // TODO proper type
  navigation: Object,
  navigateToMember(User): any,
  timeline: Timeline,
  loadTimeline: typeof loadTimeline,
};

type State = {
  activeTab: string,
};

class OpenProfile extends Component<Props, State> {
  state = {
    activeTab: 'News',
  };

  changeActiveTab = (activeTab: string) => {
    this.setState({ activeTab });
  };

  loadTimeline = mergeMode => {
    const { community } = this.props;

    this.props.loadTimeline({
      id: community.id,
      path: `content_objects/posts/${community.id}`,
      limit: 20,
      mergeMode,
    });
  };

  fetchFreshData = async () => {
    this.loadTimeline('replace');
  };

  render() {
    const { community, timeline } = this.props;

    return (
      <ScrollView
        style={{ flex: 1 }}
        scrollEnabled={true}
        refreshControl={
          <RefreshControl
            refreshing={timeline.refreshing}
            onRefresh={this.fetchFreshData}
            colors={[getColor('orange')]}
          />
        }
      >
        <Collapsible collapsed={this.state.activeTab !== 'News'}>
          <CommunityHeader
            title={community.name}
            profileImageURI={community.profile_photo}
            coverImageURI={community.cover_photo}
          />
        </Collapsible>

        <Tabs
          activeItem={this.state.activeTab}
          onChange={this.changeActiveTab}
          items={[
            {
              label: 'News',
              component: () => (
                <CommunityFeedScreen
                  navigation={this.props.navigation}
                  communityId={community.id}
                  disableRefreshControl
                />
              ),
            },
            {
              label: `Members (${community.members})`,
              component: () => (
                <TabMembers
                  community={community}
                  navigateToMember={this.props.navigateToMember}
                />
              ),
            },
            {
              label: 'About',
              component: () => (
                <TabAbout
                  community={community}
                  navigateToMember={this.props.navigateToMember}
                />
              ),
            },
          ]}
        />
      </ScrollView>
    );
  }
}

const mapState = (state, props: Props) => ({
  timeline: selectTimeline(props.community.id)(state),
});

export default connect(mapState, { loadTimeline })(OpenProfile);
