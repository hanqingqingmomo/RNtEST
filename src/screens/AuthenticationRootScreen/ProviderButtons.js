// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import Config from 'react-native-config';
import OAuthManager from 'react-native-oauth';
import LinkedInModal from 'react-native-linkedin';
import { Button } from '../../atoms';
import { getColor } from '../../utils/color';

type Provider = 'twitter' | 'facebook';

export type AuthPayload =
  | {
      provider: 'twitter',
      credentials: {
        access_token: string,
        access_token_secret: string,
      },
    }
  | {
      provider: 'facebook',
      credentials: {
        access_token: string,
      },
    }
  | {
      provider: 'linkedin',
      credentials: {
        access_token: string,
      },
    };

type OAuthRawPayload =
  | {
      // Facebook
      status: string,
      response: {
        authorized: boolean,
        identifier: string,
        uuid: string,
        credentials: {
          accessToken: string,
          authorizationHeader: string,
          clientId: string,
          clientSecret: string,
        },
      },
    }
  | {
      // Twitter
      status: string,
      response: {
        authorized: boolean,
        identifier: string,
        uuid: string,
        credentials: {
          access_token: string,
          access_token_secret: string,
        },
      },
    };

type ButtonProps = {
  onAuthStatusChange: (?AuthPayload) => mixed,
};

function makeManager() {
  const manager = new OAuthManager('pba-app');
  manager.configure({
    facebook: {
      client_id: Config.FACEBOOK_ID,
      client_secret: Config.FACEBOOK_SECRET,
    },
    twitter: {
      consumer_key: Config.TWITTER_ID,
      consumer_secret: Config.TWITTER_SECRET,
    },
  });
  return manager;
}

function transformResponse(
  provider: Provider,
  providerResponse: OAuthRawPayload
): AuthPayload {
  const { response } = providerResponse;
  return provider === 'twitter'
    ? {
        provider: 'twitter',
        credentials: {
          // $FlowExpectedError
          access_token: response.credentials.access_token,
          // $FlowExpectedError
          access_token_secret: response.credentials.access_token_secret,
        },
      }
    : {
        provider: 'facebook',
        credentials: {
          // $FlowExpectedError
          access_token: response.credentials.accessToken,
        },
      };
}

async function authenticateOAuth(
  provider: Provider,
  scope?: Array<string>,
  style: any
): Promise<?AuthPayload> {
  const manager = makeManager();
  try {
    const providerResp = await manager.authorize(provider, { scope });
    await manager.deauthorize(provider);
    return transformResponse(provider, providerResp);
  } catch (err) {
    return null;
  }
}

function AuthenticationButton(props): React$Node {
  return <Button block {...props} size="lg" style={styles.button} />;
}

export function Facebook(props: ButtonProps) {
  return (
    <AuthenticationButton
      color={getColor('facebookBlue')}
      textColor={getColor('white')}
      onPress={async () => {
        const scope = ['email', 'public_profile'];
        props.onAuthStatusChange(await authenticateOAuth('facebook', scope));
      }}
      title="Continue with Facebook"
    />
  );
}

export function Twitter(props: ButtonProps) {
  return (
    <AuthenticationButton
      color={getColor('twitterBlue')}
      textColor={getColor('white')}
      onPress={async () => {
        props.onAuthStatusChange(await authenticateOAuth('twitter'));
      }}
      title="Continue with Twitter"
    />
  );
}

export function LinkedIn(props: ButtonProps) {
  return (
    <LinkedInModal
      clientID={Config.LINKEDIN_ID}
      clientSecret={Config.LINKEDIN_SECRET}
      redirectUri={Config.LINKEDIN_REDICER_URL}
      onSuccess={(params: { access_token: string }) => {
        props.onAuthStatusChange({
          provider: 'linkedin',
          credentials: {
            access_token: params.access_token,
          },
        });
      }}
      renderButton={() => (
        <AuthenticationButton
          color={getColor('linkedinBlue')}
          textColor={getColor('white')}
          title="Continue with LinkedIn"
          disabled
          style={{ opacity: 1 }}
        />
      )}
    />
  );
}

export function EmailRegistration(props: { onPress: Function }) {
  return (
    <AuthenticationButton
      outline
      color={getColor('orange')}
      textColor={getColor('orange')}
      onPress={props.onPress}
      title="Sign Up"
    />
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    opacity: 1,
  },
});
