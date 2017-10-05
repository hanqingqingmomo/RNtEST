// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Icon, View, Button, Screen, Text } from '../atoms';
import { getColor } from '../utils/color';

type Route =
  | 'FacebookAuthenticationScreen'
  | 'LinkedinAuthenticationScreen'
  | 'TwitterAuthenticationScreen'
  | 'EmailAuthenticationScreen'
  | 'EmailRegistrationScreen';

function AuthenticationButton(props) {
  return <Button block {...props} size="lg" style={styles.button} />;
}

export default class AuthenticationRootScreen extends React.Component {
  navigate = (route: Route) => () => {
    switch (route) {
      case 'EmailAuthenticationScreen':
      case 'EmailRegistrationScreen':
        return this.props.navigation.navigate(route);
      default:
        alert(route);
    }
  };

  render() {
    return (
      <Screen>
        <View style={styles.container}>
          <Icon name="ywca" color="orange" size={100} />

          <View>
            <AuthenticationButton
              color={getColor('facebookBlue')}
              textColor={getColor('white')}
              onPress={this.navigate('FacebookAuthenticationScreen')}
              title="Continue with Facebook"
            />
            <AuthenticationButton
              color={getColor('twitterBlue')}
              textColor={getColor('white')}
              onPress={this.navigate('TwitterAuthenticationScreen')}
              title="Continue with Twitter"
            />
            <AuthenticationButton
              color={getColor('linkedinBlue')}
              textColor={getColor('white')}
              onPress={this.navigate('LinkedinAuthenticationScreen')}
              title="Continue with LinkedIn"
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
  container: {
    width: 275,
    flexGrow: 1,
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  button: {
    marginTop: 15,
  },
  footerText: {
    alignSelf: 'center',
    marginTop: 30,
  },
});
