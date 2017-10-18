// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Fetch, Screen } from '../../atoms';
import {
  setUserAccessToken,
  setUserProfile,
} from '../../redux/ducks/application';
import FormBlock, { type FormValues } from './EmailAuthenticationBlock';
import { authenticateRq, readProfileRq } from '../../utils/requestFactory';

class EmailAuthenticationScreen extends Component<{}> {
  navigateToPasswordResetScreen = () => {
    this.props.navigation.navigate('PasswordResetScreen');
  };

  handleAuthenticationRequest = ({ fetch }, profile) => async (
    values: FormValues
  ) => {
    const { email, password } = values;

    const authenticationR = authenticateRq({ email, password });
    const authenticationResponse = await fetch(
      authenticationR.url,
      authenticationR.options
    );

    if (authenticationResponse.response.ok) {
      this.props.setUserAccessToken(authenticationResponse.data.mobile_token);

      // TODO reinject, subscribe to store update
      const profileR = readProfileRq('me');
      const { data: userProfile } = await fetch(profileR.url, {
        ...profileR.options,
        headers: {
          ...profileR.options.headers,
          'API-KEY': authenticationResponse.data.mobile_token,
        },
      });

      this.props.setUserProfile(userProfile);
    }
  };

  render() {
    return (
      <Screen fill>
        <Fetch manual>
          {authentication => (
            <FormBlock
              loading={authentication.loading}
              error={!!authentication.error}
              handleAuthenticationRequest={this.handleAuthenticationRequest(
                authentication
              )}
              handlePasswordScreenRequest={this.navigateToPasswordResetScreen}
            />
          )}
        </Fetch>
      </Screen>
    );
  }
}

export default connect(null, { setUserAccessToken, setUserProfile })(
  EmailAuthenticationScreen
);
