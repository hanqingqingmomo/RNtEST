// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import OAuthManager from 'react-native-oauth';

import { Icon, View, Button, Screen, Text } from '../atoms';
import { getColor } from '../utils/color';
import type { ScreenProps } from '../Types';

type Route =
  | 'FacebookAuthenticationScreen'
  | 'LinkedinAuthenticationScreen'
  | 'TwitterAuthenticationScreen'
  | 'EmailAuthenticationScreen'
  | 'EmailRegistrationScreen';

type Props = ScreenProps<*>;

function AuthenticationButton(props) {
  return <Button block {...props} size="lg" style={styles.button} />;
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

  authenticateSocialMediaAccount = (manager, configuration, media) => {
    manager.configure(configuration);
    manager
      .authorize(media)
      .then(resp => console.log(resp))
      .catch(err => console.log(err));
  };

  handleTwitterAuthentication = () => {
    const manager = new OAuthManager('pba-app');
    const configuration = {
      twitter: {
        consumer_key: 't1vrxymxsalQ84PgD3ew6JZyb',
        consumer_secret: '0T9Lv4hDR2zrJoxqUMD9QGf2pcKSQ8BqFGUHEbk3dRb6bbB2tB',
      },
    };

    manager.deauthorize('twitter');
    this.authenticateSocialMediaAccount(manager, configuration, 'twitter');
  };

  handleLinkedInAuthentication = () => {
    const manager = new OAuthManager('pba-test');
    const configuration = {
      linkedin: {
        client_id: '86a6a0objfvxcg',
        client_secret: 'MMfzum1GG6s7C6GE',
      },
    };

    manager.addProvider({
      linkedin: {
        auth_version: '2.0',
        authorize_url: 'https://www.linkedin.com/oauth/v2/authorization',
        access_token_url: 'https://www.linkedin.com/oauth/v2/accessToken',
        api_url: 'https://api.linkedin.com/',
        callback_url: ({ app_name }) => `${app_name}://oauth`,
      },
    });

    this.authenticateSocialMediaAccount(manager, configuration, 'linkedin');
  };

  handleFacebookAuthentication = () => {
    const manager = new OAuthManager('pba-test');
    const configuration = {
      facebook: {
        client_id: '882238591940046',
        client_secret: 'a22a0fc8ac0d3a18bc173a68339f610f',
      },
    };

    this.authenticateSocialMediaAccount(manager, configuration, 'facebook');
  };

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

            <AuthenticationButton
              color={getColor('linkedinBlue')}
              textColor={getColor('white')}
              onPress={this.handleLinkedInAuthentication}
              title="Continue with LinkedIn"
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
