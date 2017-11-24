// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import OAuthManager from 'react-native-oauth';
import LinkedInModal from 'react-native-linkedin';

import { Icon, View, Button, Screen, Text } from '../atoms';
import { getColor } from '../utils/color';
import type { ScreenProps } from '../Types';
import { css } from '../utils/style';

type Route =
  | 'FacebookAuthenticationScreen'
  | 'LinkedinAuthenticationScreen'
  | 'TwitterAuthenticationScreen'
  | 'EmailAuthenticationScreen'
  | 'EmailRegistrationScreen';

type Props = ScreenProps<*>;

function AuthenticationButton(props, otherStyles) {
  return (
    <Button block {...props} size="lg" style={[styles.button, otherStyles]} />
  );
}

export default class AuthenticationRootScreen extends Component<Props> {
  navigate = (route: Route) => () => {
    switch (route) {
      case 'EmailAuthenticationScreen':
      case 'EmailRegistrationScreen':
        return this.props.navigation.navigate(route);
      default:
        alert(route);
    }
  };

  authenticateSocialMediaAccount = (
    provider: string,
    configuration: any,
    scopes?: string
  ) => {
    const authorize = () =>
      manager
        .authorize(provider, scopes ? { scopes } : undefined)
        .then(resp => console.log(`(${provider}) new authorization: `, resp))
        .catch(err => console.log(err));

    const manager = new OAuthManager('pba-app');

    manager.configure(configuration);
    manager
      .savedAccounts()
      .then(savedAccounts => {
        console.log(`already authorized against: `, savedAccounts);
        const isAuthorizedAgainstProvider =
          savedAccounts.accounts.filter(
            account => account.provider === provider
          ).length > 0;
        if (isAuthorizedAgainstProvider) {
          console.log('going to deauthorize');
          manager
            .deauthorize(provider)
            .then(deauthorized => {
              console.log(`after deauthorization: `, deauthorized);
              console.log('going to authorize');
              authorize();
            })
            .catch(err => console.log(err));
        } else {
          authorize();
        }
      })
      .catch(err => console.log(err));
  };

  handleTwitterAuthentication = () =>
    this.authenticateSocialMediaAccount('twitter', {
      twitter: {
        consumer_key: 't1vrxymxsalQ84PgD3ew6JZyb',
        consumer_secret: '0T9Lv4hDR2zrJoxqUMD9QGf2pcKSQ8BqFGUHEbk3dRb6bbB2tB',
      },
    });

  handleFacebookAuthentication = () =>
    this.authenticateSocialMediaAccount(
      'facebook',
      {
        facebook: {
          client_id: '1252416728196036',
          client_secret: '9b18fcac2a4fa9d37aa10907dbfc9d51',
        },
      },
      'public_profile'
    );

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
