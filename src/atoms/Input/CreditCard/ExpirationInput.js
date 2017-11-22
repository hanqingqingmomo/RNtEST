// @flow

import React from 'react';
import { Animated } from 'react-native';
import valid from 'card-validator';

import { BaseInput } from './BaseInput';
import { Label } from './Label';

type ValidationState = {
  isPotentiallyValid: boolean,
  isValid: boolean,
  month: ?string,
  year: ?string,
};

type Props = {
  active: boolean,
  onBlur: Function,
  onChange: string => mixed,
  onFocus: Function,
  value: string,
};

function maskValue(value: string): string {
  return value.length === 3 ? `${value[0]}${value[1]}/${value[2]}` : value;
}

export class ExpirationInput extends React.Component<Props> {
  _animToggle = new Animated.Value(this.props.active ? 1 : 0);

  componentWillReceiveProps(nextProps: Props) {
    this.animateToggle(nextProps.active ? 1 : 0);
  }

  animateToggle(toValue: number) {
    Animated.timing(this._animToggle, { toValue }).start();
  }

  onChange = (value: string) => {
    const nextValue = value.endsWith('/') ? value.replace('/', '') : value;
    this.props.onChange(nextValue);
  };

  render(): React$Node {
    const { props } = this;
    const { isPotentiallyValid }: ValidationState = valid.expirationDate(
      this.props.value
    );
    const opacity = this._animToggle.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
    const width = this._animToggle.interpolate({
      inputRange: [0, 1],
      outputRange: ['10%', '100%'],
    });

    return (
      <Animated.View style={{ opacity, flexGrow: 1, marginLeft: 20 }}>
        <Label>Valid until</Label>
        <BaseInput
          passRef={props.passRef}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          value={maskValue(props.value)}
          onChange={this.onChange}
          isValid={isPotentiallyValid}
          style={{ width }}
        />
      </Animated.View>
    );
  }
}
