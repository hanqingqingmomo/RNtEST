// @flow

import React from 'react';
import { Animated, TextInput, Platform } from 'react-native';

type Props = {
  value: string,
  onChange: string => mixed,
  isValid: boolean,
  style: any,
};

export function BaseInput(props: Props): React$Node {
  const { passRef, style, onChange, isValid, ...propsBag } = props;
  return (
    <Animated.View style={style}>
      <TextInput
        {...propsBag}
        color="#455A64"
        keyboardType={Platform.select({
          ios: 'number-pad',
          android: 'numeric',
        })}
        onChangeText={onChange}
        ref={props.passRef}
        style={[styles.component, styles[isValid ? 'valid' : 'invalid']]}
      />
    </Animated.View>
  );
}

const styles = {
  component: {
    height: 30,
    borderBottomWidth: 1,
  },
  valid: {
    borderBottomColor: '#C9D1D6',
  },
  invalid: {
    borderBottomColor: 'red',
  },
};
