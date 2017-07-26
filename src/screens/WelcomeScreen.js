// @flow

import React from 'react';

import { Button, CenterView, Text } from '../atoms';

export default class WelcomeScreen extends React.Component<*, *, *> {
  static navigationOptions = props => ({
    headerTitle: 'Welcome',
    headerRight: (
      <Button
        title="Profile"
        onPress={() =>
          props.navigation.navigate('UserProfileScreen', {
            profile: props.screenProps.user,
          })}
      />
    ),
  });

  render() {
    return (
      <CenterView>
        <Text>
          Welcome {this.props.screenProps.user.firstName}
        </Text>
      </CenterView>
    );
  }
}
