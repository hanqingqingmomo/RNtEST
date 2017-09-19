// @flow

import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { Text, TouchableItem, TouchableNativeFeedback } from './index';

const HIT_SLOP = {
  top: 6,
  right: 6,
  bottom: 6,
  left: 6,
};

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
    margin: 6,
  },
});

const sizeStyles = {
  base: StyleSheet.create({
    title: {
      fontSize: 15,
    },
    view: {
      height: 34,
      width: 80,
    },
  }),
  large: StyleSheet.create({
    title: {
      fontSize: 17,
    },
    view: {
      height: 48,
      width: 275,
    },
  }),
};

type SizeStyleName = $Keys<typeof sizeStyles>;

type P = {
  color: string,
  disabled?: boolean,
  onPress: Function,
  outline?: boolean,
  size: SizeStyleName,
  style?: any,
  textColor: string,
  title:
    | string
    | (({ textColor: string, textStyle: Array<any> }) => React$Element<*>),
};

export default class Button extends React.Component<*, P, *> {
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
      outline ? { color } : undefined,
      { color: textColor },
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
          { opacity: disabled ? 0.5 : 1 },
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
              ? { borderColor: color, borderWidth: 1 }
              : { backgroundColor: color },
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
