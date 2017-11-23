// @flow

import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import valid from 'card-validator';

import { BaseInput } from './BaseInput';
import { Label } from './Label';
import { CardLogo, type CardType } from './CardLogo';

type ValidationState = {
  card: ?{
    code: {
      name: string,
      size: number,
    },
    gaps: Array<number>,
    lengths: Array<number>,
    type: CardType,
    niceType: ?string,
  },
  isValid: boolean,
  isPotentiallyValid: boolean,
};

type Props = {
  onBlur: Function,
  onChange: string => mixed,
  onFocus: Function,
  value: string,
};

function last4(string: string): string {
  return string.substr(string.length - 4, 4);
}

export class NumberInput extends React.Component<Props> {
  _animToggle = new Animated.Value(this.props.active ? 1 : 0);

  componentWillReceiveProps(nextProps: Props) {
    this.animateToggle(nextProps.active ? 1 : 0);
  }

  animateToggle(toValue: number) {
    Animated.timing(this._animToggle, { toValue, duration: 350 }).start();
  }

  render(): React$Node {
    const { card, isPotentiallyValid, isValid }: ValidationState = valid.number(
      this.props.value
    );

    const width = this._animToggle.interpolate({
      inputRange: [0, 1],
      outputRange: ['33%', '100%'],
    });

    return (
      <Animated.View style={{ width }}>
        <Label>Card number</Label>
        <View style={styles.row}>
          <View style={styles.logo}>
            <CardLogo type={card === null ? null : card.type} />
          </View>
          <View style={{ flex: 1 }}>
            <BaseInput
              passRef={this.props.passRef}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
              value={
                this.props.active === false
                  ? last4(this.props.value)
                  : this.props.value
              }
              onChange={this.props.onChange}
              isValid={isPotentiallyValid}
              style={{ paddingLeft: 40 }}
            />
          </View>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  logo: {
    position: 'absolute',
    left: 0,
    bottom: 5,
    zIndex: 1,
  },
});
