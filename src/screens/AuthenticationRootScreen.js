// @flow

import React, { Component } from 'react';
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

export default class AuthenticationRootScreen extends Component<{}> {
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
      <Screen fill>
        <View style={styles.container}>
          <Icon color="orange" name="mpwr-logo" size={64} style={styles.icon} />

          <View>
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
