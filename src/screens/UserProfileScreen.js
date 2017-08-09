// @flow

import React from 'react';

import { ProfileForm } from '../blocks';

export default class WelcomeScreen extends React.Component<*, *, *> {
  static navigationOptions = props => ({
    headerTitle: 'Edit profile',
  });

  render() {
    return <ProfileForm />;
  }
}
