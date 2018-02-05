// @flow

import React, { Component } from 'react';
import { StyleSheet, Modal } from 'react-native';
import { connect } from 'react-redux';

import { ActivityIndicator, Icon, Screen, Text, View } from '../../atoms';
import { RQSocialSignIn, RQReadProfile } from '../../utils/requestFactory';
import type { ScreenProps } from '../../Types';
import {
  setUserAccessToken,
  setUserProfile,
} from '../../redux/ducks/application';
import {
  EmailRegistration,
  Facebook,
  LinkedIn,
  Twitter,
  type AuthPayload,
} from './ProviderButtons';

type Route = 'EmailAuthenticationScreen' | 'EmailRegistrationScreen';

type Props = ScreenProps<*> & {
  setUserAccessToken: Function,
  setUserProfile: Function,
};

type State = {
  busy: boolean,
};

class AuthenticationRootScreen extends Component<Props, State> {
  state = {
    busy: false,
  };

  navigate = (route: Route) => () => {
    return this.props.navigation.navigate(route);
  };

  onAuthStatusChange = async (payload: ?AuthPayload) => {
    if (payload) {
      this.setState({ busy: true });

      const response = await RQSocialSignIn({
        provider: payload.provider,
        access_token: payload.credentials.access_token,
        // $FlowExpectedError
        access_token_secret: payload.credentials.access_token_secret,
      });

      if (response.ok) {
        this.props.setUserAccessToken(response.data.mobile_token);
        const profileResponse = await RQReadProfile('me');
        this.props.setUserProfile(profileResponse.data);
      }

      this.setState({ busy: false });
    }
  };

  render() {
    return (
      <Screen fill>
        <View style={styles.container}>
          <Icon color="orange" name="mpwr-logo" size={64} style={styles.icon} />

          <View>
            <Facebook onAuthStatusChange={this.onAuthStatusChange} />
            <Twitter onAuthStatusChange={this.onAuthStatusChange} />
            <LinkedIn onAuthStatusChange={this.onAuthStatusChange} />
            <EmailRegistration
              onPress={this.navigate('EmailRegistrationScreen')}
            />
            <Text size={15} color="#455A64" style={styles.footerText}>
              {'Already have an account? '}
              <Text
                color="orange"
                onPress={this.navigate('EmailAuthenticationScreen')}
              >
                Log In
              </Text>
            </Text>
          </View>
        </View>
        <Modal
          onRequestClose={() => {}}
          visible={this.state.busy}
          transparent
          animationType="fade"
        >
          <View style={styles.modalLayer}>
            <ActivityIndicator color="#333" />
          </View>
        </Modal>
      </Screen>
    );
  }
}

export default connect(null, { setUserAccessToken, setUserProfile })(
  AuthenticationRootScreen
);

const styles = StyleSheet.create({
  container: {
    width: 275,
    flexGrow: 1,
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  footerText: {
    alignSelf: 'center',
    marginTop: 30,
  },
  icon: {
    marginVertical: 20,
  },
  modalLayer: {
    flexGrow: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
