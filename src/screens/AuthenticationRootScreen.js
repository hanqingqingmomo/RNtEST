// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import OAuthManager from 'react-native-oauth';
import LinkedInModal from 'react-native-linkedin';

import { Icon, View, Button, Screen, Text } from '../atoms';
import { getColor } from '../utils/color';
import { RQSocialSignIn, RQReadProfile } from '../utils/requestFactory';
import type { ScreenProps } from '../Types';
import { setUserAccessToken, setUserProfile } from '../redux/ducks/application';

type Provider = 'twitter' | 'facebook';

type Config = {
  facebook: {
    client_id: string,
    client_secret: string,
  },
  twitter: {
    consumer_key: string,
    consumer_secret: string,
  },
};

type Status = string | 'ok';

type Response = {
  provider?: Provider,
  response: {
    authorized: boolean,
    credentials: {
      accessToken?: string, // facebook
      access_token?: string, // twitter
      authorizationHeader?: string, // facebook
      access_token_secret?: string, // twitter
      clientID?: string, // facebook
      clientSecret?: string, // facebook
      scopes?: Array<string>, // facebook
      type?: number, // facebook
    },
    identifier: string,
    uuid: string,
  },
  status: Status,
};

type Route =
  | 'FacebookAuthenticationScreen'
  | 'LinkedinAuthenticationScreen'
  | 'TwitterAuthenticationScreen'
  | 'EmailAuthenticationScreen'
  | 'EmailRegistrationScreen';

type Props = ScreenProps<*> & {
  setUserAccessToken: Function,
  setUserProfile: Function,
};

type State = {
  busy: boolean,
  errors: Array<string>,
};

const config: Config = {
  facebook: {
    client_id: '1252416728196036',
    client_secret: '9b18fcac2a4fa9d37aa10907dbfc9d51',
  },
  twitter: {
    consumer_key: 't1vrxymxsalQ84PgD3ew6JZyb',
    consumer_secret: '0T9Lv4hDR2zrJoxqUMD9QGf2pcKSQ8BqFGUHEbk3dRb6bbB2tB',
  },
};

function AuthenticationButton(props, otherStyles) {
  return (
    <Button block {...props} size="lg" style={[styles.button, otherStyles]} />
  );
}

class AuthenticationRootScreen extends Component<Props, State> {
  state = {
    busy: false,
    errors: [],
  };

  navigate = (route: Route) => () => {
    switch (route) {
      case 'EmailAuthenticationScreen':
      case 'EmailRegistrationScreen':
        return this.props.navigation.navigate(route);
      default:
        alert(route);
    }
  };

  authenticate = async (provider: Provider, resp: Response) => {
    if (resp.status === 'ok') {
      const { credentials } = resp.response;
      const access_token = credentials.accessToken || credentials.access_token;

      const signinResponse = await RQSocialSignIn({ provider, access_token });

      console.log(access_token);

      if (signinResponse.ok) {
        this.props.setUserAccessToken(signinResponse.data.mobile_token);
        const profileResponse = await RQReadProfile('me');
        this.props.setUserProfile(profileResponse.data);
      } else {
        this.setState(state => ({
          errors: state.errors.concat(
            'Authentication failed. Invalid access token.'
          ),
        }));
      }
    }
  };

  authenticateSocialMediaAccount = (provider: Provider, scopes?: string) => {
    const manager = new OAuthManager('pba-app');

    const authorize = () =>
      manager
        .authorize(provider, scopes ? { scopes } : undefined)
        .then(async (resp: Response) => {
          console.log('resp', resp);
          this.authenticate(provider, resp);
        })
        .catch(err => console.log(err));

    manager.configure(config);

    manager
      .savedAccounts()
      .then((savedAccounts: { accounts: Array<Response> }) => {
        console.log('already authorized against: ', savedAccounts);

        const account = savedAccounts.accounts.find(
          account => account.provider === provider
        );

        if (!!account) {
          console.log('relogin');

          this.authenticate(provider, account);

          // manager
          //   .deauthorize(provider)
          //   .then((deauthorized: { status: Status }) => {
          //     console.log('after deauthorization: ', deauthorized);

          //     if (deauthorized.status === 'ok') {
          //       console.log('going to authorize');
          //       authorize();
          //     }
          //   })
          //   .catch(err => console.log(err));
        } else {
          authorize();
        }
      })
      .catch(err => console.log(err));
  };

  handleTwitterAuthentication = () =>
    this.authenticateSocialMediaAccount('twitter');

  handleFacebookAuthentication = () =>
    this.authenticateSocialMediaAccount('facebook', 'public_profile');

  render() {
    return (
      <Screen fill>
        <View style={styles.container}>
          <Icon color="orange" name="mpwr-logo" size={64} style={styles.icon} />

          <View>
            <AuthenticationButton
              color={getColor('facebookBlue')}
              textColor={getColor('white')}
              onPress={this.handleFacebookAuthentication}
              title="Continue with Facebook"
            />
            <LinkedInModal
              renderButton={() =>
                AuthenticationButton(
                  {
                    color: getColor('linkedinBlue'),
                    textColor: getColor('white'),
                    title: 'Continue with LinkedIn',
                    onPress: undefined,
                    noWrap: false,
                    disabled: true,
                  },
                  styles.buttonForcedOpacity
                )}
              clientID="78inys69jtxa3d"
              clientSecret="HBztjlroz9LLztpP"
              redirectUri="https://www.linkedin.com/developer/apps?abcd"
              onSuccess={token => console.log('onSuccess: ', token)}
              onError={token => console.log('onError: ', token)}
              onClose={token => console.log('onClose: ', token)}
              onOpen={token => console.log('onOpen: ', token)}
              onSignIn={token => console.log('onSignIn: ', token)}
            />
            <AuthenticationButton
              color={getColor('twitterBlue')}
              textColor={getColor('white')}
              onPress={this.handleTwitterAuthentication}
              title="Continue with Twitter"
            />
            <AuthenticationButton
              outline
              color={getColor('orange')}
              textColor={getColor('orange')}
              onPress={this.navigate('EmailRegistrationScreen')}
              title="Sign Up"
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
      </Screen>
    );
  }
}

export default connect(null, { setUserAccessToken, setUserProfile })(
  AuthenticationRootScreen
);

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
  },
  buttonForcedOpacity: {
    opacity: 1,
  },
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
});
