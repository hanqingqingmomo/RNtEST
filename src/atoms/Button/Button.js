// @flow

import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { Text, TouchableItem, TouchableNativeFeedback, View } from '../index';
import { type ColorName } from '../../Types';
import { css } from '../../utils/style';

const HIT_SLOP = {
  top: 6,
  right: 6,
  bottom: 6,
  left: 6,
};

type SizeStyleName = $Keys<typeof sizeStyles>;

type DP = {
  disabled: boolean,
  outline: boolean,
};

type P = {
  color: ColorName | string,
  disabled?: boolean,
  onPress: Function,
  outline?: boolean,
  size: SizeStyleName,
  style?: any,
  textColor: ColorName | string,
  title:
    | string
    | (({ textColor: string, textStyle: Array<any> }) => React$Element<*>),
};

export default class Button extends React.Component<DP, DP & P, *> {
  static defaultProps = {
    disabled: false,
    outline: false,
  };

  id = `button-${Math.random()}`;

  render() {
    const {
      color,
      disabled,
      onPress,
      outline,
      size,
      style,
      textColor,
      title,
    } = this.props;

    const activeSizeStyle = sizeStyles[size];

    const textStyle = [
      styles.title,
      css('color', textColor),
      activeSizeStyle.title,
    ];

    return (
      <TouchableItem
        disabled={disabled}
        hitSlop={HIT_SLOP}
        key={`${this.id}-${disabled ? 'disabled' : 'enabled'}`}
        onPress={onPress}
        pressColor="white"
        style={[
          css('opacity', disabled ? 0.5 : 1),
          styles.touchableWrapper,
          style,
        ]}
        useForeground={Platform.select({
          android: TouchableNativeFeedback.canUseNativeForeground,
          ios: () => false,
        })()}
      >
        <View
          style={[
            styles.button,
            outline
              ? [css('borderColor', color), css('borderWidth', 1)]
              : css('backgroundColor', color),
            activeSizeStyle.view,
          ]}
        >
          {typeof title === 'string' ? (
            <Text style={textStyle}>{title}</Text>
          ) : (
            title({ textColor, textStyle })
          )}
        </View>
      </TouchableItem>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 100,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '500',
    transform: [{ translateY: -1 }],
  },
  touchableWrapper: {
    alignSelf: 'center',
    borderRadius: 100,
  },
});

const sizeStyles = {
  xs: StyleSheet.create({
    title: {
      fontSize: 12,
    },
    view: {
      height: 20,
      paddingHorizontal: 11,
    },
  }),
  sm: StyleSheet.create({
    title: {
      fontSize: 12,
    },
    view: {
      height: 24,
      paddingHorizontal: 15,
    },
  }),
  md: StyleSheet.create({
    title: {
      fontSize: 15,
    },
    view: {
      height: 34,
      width: 80,
    },
  }),
  lg: StyleSheet.create({
    title: {
      fontSize: 17,
    },
    view: {
      height: 48,
      width: 275,
    },
  }),
};
