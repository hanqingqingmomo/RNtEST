// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Fetch, Screen } from '../../atoms';
import {
  setUserAccessToken,
  setUserProfile,
} from '../../redux/ducks/application';
import FormBlock, { type FormValues } from './EmailAuthenticationBlock';
import { makeSigninRq, makeReadProfileRq } from '../../utils/requestFactory';
import type { ScreenProps, FetchProps } from '../../Types';

type Props = ScreenProps<*> & {
  setUserAccessToken: Function,
  setUserProfile: Function,
};

class EmailAuthenticationScreen extends Component<Props> {
  static navigationOptions = {
    headerTitle: 'Log In',
  };

  navigateToPasswordResetScreen = () => {
    this.props.navigation.navigate('PasswordResetScreen');
  };

  handleAuthenticationRequest = fetch => async (values: FormValues) => {
    const { email, password } = values;

    const signinReq = makeSigninRq({ email, password });
    const signinRes = await fetch(signinReq.url, signinReq.options);

    if (signinRes.response.ok) {
      this.props.setUserAccessToken(signinRes.data.mobile_token);

      // TODO reinject, subscribe to store update
      const readProfileReq = makeReadProfileRq('me');
      const { data: userProfile } = await fetch(readProfileReq.url, {
        ...readProfileReq.options,
        headers: {
          ...readProfileReq.options.headers,
          'API-KEY': signinRes.data.mobile_token,
        },
      });

      this.props.setUserProfile(userProfile);
    }
  };

  render() {
    return (
      <Screen fill>
        <Fetch manual>
          {({ loading, fetch, error }: FetchProps<*>) => (
            <FormBlock
              loading={!!loading}
              error={loading === false && !!error}
              handleAuthenticationRequest={this.handleAuthenticationRequest(
                fetch
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
