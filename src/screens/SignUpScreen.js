// @flow

import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import { View, Button, Text, AvatarPicker } from '../atoms';
import { getColor } from '../utils/color';
import { css } from '../utils/style';

const CONTAINER_WIDTH = 275;

const Reserved = ({ style }) => (
  <View
    style={[
      {
        backgroundColor: getColor('orange'),
        height: 45,
        width: CONTAINER_WIDTH,
      },
      style,
    ]}
  />
);

type Props = {
  onPolicyPress: Function,
  onSignupPress: Function,
  onTermsPress: Function,
};

export default function SignUpScreen({
  onPolicyPress,
  onSignupPress,
  onTermsPress,
}: Props) {
  return (
    <View style={styles.screenContainer}>
      <View style={css('width', CONTAINER_WIDTH)}>
        <Reserved style={styles.icon} />
        <Text style={styles.addText}>Add Photo</Text>
        <View style={styles.picker}>
          <AvatarPicker />
        </View>
        <Reserved style={styles.input} />
        <Reserved style={styles.input} />
        <Reserved style={styles.input} />
        <Button
          color={getColor('orange')}
          onPress={onSignupPress}
          outline
          size="lg"
          style={styles.button}
          textColor={getColor('white')}
          title="Sign Up"
        />
        <View style={styles.policyText}>
          <Text style={css('textAlign', 'center')}>
            <Text>By signing up, you agree to our </Text>
            <Text onPress={onTermsPress} style={styles.specialText}>
              Terms
            </Text>
            <Text>{' & '}</Text>
            <Text onPress={onPolicyPress} style={styles.specialText}>
              Privacy Policy
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addText: {
    fontSize: 17,
    lineHeight: 20,
    marginBottom: 15,
    marginTop: 25,
  },

  button: {
    backgroundColor: getColor('orange'),
    marginTop: 30,
  },

  icon: {
    marginTop: 45,
    width: 150,
  },

  input: {
    marginBottom: 5,
  },

  picker: {
    marginBottom: 30,
  },

  policyText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },

  screenContainer: {
    backgroundColor: getColor('white'),
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },

  specialText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
