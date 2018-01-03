// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Screen } from '../../atoms';
import {
  setUserAccessToken,
  setUserProfile,
} from '../../redux/ducks/application';
import FormBlock, { type FormValues } from './EmailAuthenticationBlock';
import { RQSignIn, RQReadProfile } from '../../utils/requestFactory';
import type { ScreenProps } from '../../Types';

type Props = ScreenProps<*> & {
  setUserAccessToken: Function,
  setUserProfile: Function,
};

type State = {
  busy: boolean,
  error: boolean,
};

class EmailAuthenticationScreen extends Component<Props, State> {
  static navigationOptions = {
    headerTitle: 'Log In',
  };

  state = {
    busy: false,
    error: false,
  };

  mounted: boolean = true;

  componentWillUnmount() {
    this.mounted = false;
  }

  updateState = (nextState: $Shape<State>) => {
    if (this.mounted) {
      this.setState(nextState);
    }
  };

  attemptSignIn = async (credentials: FormValues) => {
    this.updateState({ busy: true });
    const signinResponse = await RQSignIn(credentials);
    if (signinResponse.ok) {
      this.updateState({ error: false });
      this.props.setUserAccessToken(signinResponse.data.mobile_token);
      const profileResponse = await RQReadProfile('me');
      if (profileResponse.ok) {
        this.props.setUserProfile(profileResponse.data);
      } else {
        this.updateState({ error: true });
      }
    } else {
      this.updateState({ error: true });
    }
    this.updateState({ busy: false });
  };

  render() {
    return (
      <Screen>
        <FormBlock
          disabled={this.state.busy}
          error={this.state.error}
          onSubmit={this.attemptSignIn}
          requestNavigationToScreen={(
            routeName: string,
            routeParams?: Object
          ) => this.props.navigation.navigate(routeName, routeParams)}
        />
      </Screen>
    );
  }
}

export default connect(null, { setUserAccessToken, setUserProfile })(
  EmailAuthenticationScreen
);
