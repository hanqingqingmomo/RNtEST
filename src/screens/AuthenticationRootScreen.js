// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import OAuthManager from 'react-native-oauth';
import LinkedInModal from 'react-native-linkedin';

import {
  ActivityIndicator,
  Button,
  CenterView,
  Icon,
  Screen,
  Text,
  View,
} from '../atoms';
import { getColor } from '../utils/color';
import { RQSocialSignIn, RQReadProfile } from '../utils/requestFactory';
import type { ScreenProps } from '../Types';
import { setUserAccessToken, setUserProfile } from '../redux/ducks/application';

type Provider = 'twitter' | 'facebook' | 'linkedin';

type Config = {
  facebook: {
    client_id: string,
    client_secret: string,
  },
  twitter: {
    consumer_key: string,
    consumer_secret: string,
  },
  linkedin: {
    clientID: string,
    clientSecret: string,
  },
};

type Status = string | 'ok';

type OAuthResponse = {
  provider: Provider, // for saved accounts
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

type LinkedInResponse = {
  access_token: string,
  expires_in: number,
};

type Route = 'EmailAuthenticationScreen' | 'EmailRegistrationScreen';

type Props = ScreenProps<*> & {
  setUserAccessToken: Function,
  setUserProfile: Function,
};

type State = {
  busy: boolean,
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
  linkedin: {
    clientID: '78inys69jtxa3d',
    clientSecret: 'HBztjlroz9LLztpP',
  },
};

function AuthenticationButton(props, otherStyles): React$Node {
  return (
    <Button block {...props} size="lg" style={[styles.button, otherStyles]} />
  );
}

class AuthenticationRootScreen extends Component<Props, State> {
  state = {
    busy: false,
  };

  manager: any = null;

  componentWillMount() {
    this.manager = new OAuthManager('pba-app');
    this.manager.configure({
      facebook: config.facebook,
      twitter: config.twitter,
    });
  }

  navigate = (route: Route) => () => {
    switch (route) {
      case 'EmailAuthenticationScreen':
      case 'EmailRegistrationScreen':
        return this.props.navigation.navigate(route);
      default:
        alert(route);
    }
  };

  login = async (provider: Provider, access_token: string) => {
    this.setState({ busy: true });

    const signinResponse = await RQSocialSignIn({ provider, access_token });

    if (signinResponse.ok) {
      this.props.setUserAccessToken(signinResponse.data.mobile_token);
      const profileResponse = await RQReadProfile('me');
      this.props.setUserProfile(profileResponse.data);
    } else {
      // TODO doplnit vypisovanie error message ked bude endpoint opraveny a bude vracat spravny error message

      this.setState({ busy: false });
    }
  };

  // only for facebook and twitter
  authenticate = (provider: Provider, resp: OAuthResponse) => {
    if (resp.status === 'ok' && ['facebook', 'twitter'].includes(provider)) {
      const { credentials } = resp.response;
      const access_token = credentials.accessToken || credentials.access_token;

      if (!!access_token) {
        this.login(provider, access_token);
      } else {
        alert('Missing access token');
      }
    }
  };

  authorize = (provider: Provider, scopes?: string) => {
    this.manager
      .authorize(provider, scopes ? { scopes } : undefined)
      .then((resp: OAuthResponse) => {
        console.log(resp);
        if (process.env.NODE_ENV === 'development') {
          console.log(`${provider} resp: `, resp);
        }

        this.authenticate(provider, resp);
      })
      .catch((err: any) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`${provider} error: `, err);
        }
      });
  };

  authenticateSocialMediaAccount = (provider: Provider, scopes?: string) => {
    this.manager
      .savedAccounts()
      .then((resp: { accounts: Array<OAuthResponse> }) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('already authorized against: ', resp);
        }

        const account = resp.accounts.find(
          (account: OAuthResponse): boolean => account.provider === provider
        );

        if (!!account) {
          if (process.env.NODE_ENV === 'development') {
            console.log('relogin');
          }

          this.authenticate(provider, account);
        } else {
          this.authorize(provider, scopes);
        }
      })
      .catch((err: any) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`${provider} error: `, err);
        }
      });
  };

  handleTwitterAuthentication = () => {
    this.authenticateSocialMediaAccount('twitter');
  };

  handleFacebookAuthentication = () => {
    this.authenticateSocialMediaAccount('facebook', 'email,public_profile');
  };

  render() {
    return (
      <Screen fill>
        <View style={styles.container}>
          <Icon color="orange" name="mpwr-logo" size={64} style={styles.icon} />

          {this.state.busy ? (
            <CenterView>
              <ActivityIndicator />
            </CenterView>
          ) : (
            <View>
              <AuthenticationButton
                color={getColor('facebookBlue')}
                textColor={getColor('white')}
                onPress={this.handleFacebookAuthentication}
                title="Continue with Facebook"
              />
              <LinkedInModal
                {...config.linkedin}
                renderButton={() => (
                  <AuthenticationButton
                    color={getColor('linkedinBlue')}
                    textColor={getColor('white')}
                    title={'Continue with LinkedIn'}
                    noWrap={false}
                    disabled={true}
                    otherStyles={styles.buttonForcedOpacity}
                  />
                )}
                redirectUri="https://www.linkedin.com/developer/apps?abcd"
                onSuccess={(resp: LinkedInResponse) => {
                  this.login('linkedin', resp.access_token);
                }}
                onError={(err: any) => {
                  if (process.env.NODE_ENV === 'developemnt') {
                    console.log('LinkedIn error: ', err);
                  }
                }}
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
          )}
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
