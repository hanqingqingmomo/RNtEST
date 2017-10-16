// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Fetch, Screen } from '../../atoms';
import {
  setUserAccessToken,
  setUserProfile,
} from '../../redux/ducks/application';
import FormBlock, { type FormValues } from './EmailAuthenticationBlock';

class EmailAuthenticationScreen extends Component<{}> {
  navigateToPasswordResetScreen = () => {
    this.props.navigation.navigate('PasswordResetScreen');
  };

  handleAuthenticationRequest = (authentication, profile) => async (
    values: FormValues
  ) => {
    const { email, password } = values;
    const options = {
      ...authentication.request.options,
      body: JSON.stringify({ email, password }),
    };

    const authenticationResponse = await authentication.fetch(
      authentication.request.url,
      options
    );

    if (authenticationResponse.data) {
      this.props.setUserAccessToken(authenticationResponse.data.mobile_token);

      const { data: userProfile } = await profile.fetch(profile.request.url);
      this.props.setUserProfile(userProfile);
    }
  };

  render() {
    return (
      <Screen fill>
        <Fetch url="v1/members" manual>
          {profile => (
            <Fetch manual url="/v1/members/login" options={{ method: 'POST' }}>
              {authentication => (
                <FormBlock
                  loading={!!(authentication.loading || profile.loading)}
                  error={!!authentication.error}
                  handleAuthenticationRequest={this.handleAuthenticationRequest(
                    authentication,
                    profile
                  )}
                  handlePasswordScreenRequest={
                    this.navigateToPasswordResetScreen
                  }
                />
              )}
            </Fetch>
          )}
        </Fetch>
      </Screen>
    );
  }
}

export default connect(null, { setUserAccessToken, setUserProfile })(
  EmailAuthenticationScreen
);
