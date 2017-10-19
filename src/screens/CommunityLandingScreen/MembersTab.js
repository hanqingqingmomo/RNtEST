// @flow

import React, { Component } from 'react';

import { ActivityIndicator, CenterView, Fetch, Text, View } from '../../atoms';
import { makeReadCommunityMembersRq } from '../../utils/requestFactory';
import { MemberList } from '../../blocks';

export default class MembersTab extends Component<{}> {
  static navigationOptions = ({ screenProps }) => ({
    tabBarLabel: `Members (${screenProps.members})`,
  });

  render() {
    const { screenProps } = this.props;

    const readCommunityMembersRq = makeReadCommunityMembersRq(
      screenProps.communityId,
      9999 // TODO pagination
    );

    return (
      <Fetch
        url={readCommunityMembersRq.url}
        options={readCommunityMembersRq.options}
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
                <MemberList
                  members={data.data}
                  navigation={screenProps.communitiesNavigation}
                />
              )}
          </View>
        )}
      </Fetch>
    );
  }
}
