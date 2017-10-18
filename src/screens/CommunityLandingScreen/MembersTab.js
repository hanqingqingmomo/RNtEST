// @flow

import React, { Component } from 'react';

import {
  ActivityIndicator,
  CenterView,
  Fetch,
  Screen,
  Text,
  View,
} from '../../atoms';

const limit = 9999; // TODO pagination

export default class MembersTab extends Component<{}> {
  static navigationOptions = ({ screenProps }) => ({
    tabBarLabel: `Members (${screenProps.members})`,
  });

  render() {
    const { communityId } = this.props.screenProps;

    return (
      <Fetch url={`v1/communities/${communityId}/members?limit=${limit}`}>
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
                {data.data.map(member => (
                  <Text key={member.id}>{member.first_name}</Text>
                ))}
              </View>
            )}
          </Screen>
        )}
      </Fetch>
    );
  }
}
