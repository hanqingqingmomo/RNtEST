// @flow

import React from 'react';
import { Animated } from 'react-native';
import valid from 'card-validator';

import { BaseInput } from './BaseInput';
import { Label } from './Label';

type ValidationState = {
  isPotentiallyValid: boolean,
  isValid: boolean,
};

type Props = {
  active: boolean,
  onChange: string => mixed,
  value: string,
};

export class CVCInput extends React.Component<Props> {
  _animToggle = new Animated.Value(this.props.active ? 1 : 0);

  componentWillReceiveProps(nextProps: Props) {
    this.animateToggle(nextProps.active ? 1 : 0);
  }

  animateToggle(toValue: number) {
    Animated.timing(this._animToggle, { toValue }).start();
  }

  render(): React$Node {
    const { isPotentiallyValid }: ValidationState = valid.cvv(this.props.value);
    const opacity = this._animToggle.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    const width = this._animToggle.interpolate({
      inputRange: [0, 1],
      outputRange: ['10%', '100%'],
    });
    return (
      <Animated.View style={{ flexGrow: 1, opacity, marginLeft: 20 }}>
        <Label>CVC code</Label>
        <BaseInput
          passRef={this.props.passRef}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          value={this.props.value}
          onChange={this.props.onChange}
          isValid={isPotentiallyValid}
          style={{ width }}
        />
      </Animated.View>
    );
  }
}
