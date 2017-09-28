// @flow

import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { Icon, TouchableItem, TouchableNativeFeedback, View } from '../index';

const HIT_SLOP = {
  top: 6,
  right: 6,
  bottom: 6,
  left: 6,
};

const ICON_SIZES = {
  xs: 13,
  sm: 18,
  md: 24,
  lg: 27,
};

type SizeStyleName = $Keys<typeof sizeStyles>;

type DP = {
  disabled: boolean,
  outline: boolean,
};

type P = {
  color: string,
  disabled?: boolean,
  iconColor: string,
  iconName: string,
  onPress: Function,
  outline?: boolean,
  size: SizeStyleName,
  style?: any,
};

export default class IconButton extends React.Component<DP, DP & P, *> {
  static defaultProps = {
    disabled: false,
    outline: false,
  };

  id = `icon-button-${Math.random()}`;

  render() {
    const {
      color,
      disabled,
      iconColor,
      iconName,
      onPress,
      outline,
      size,
      style,
    } = this.props;

    const activeSizeStyle = sizeStyles[size];

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
          <Icon
            color={iconColor}
            name={iconName}
            size={ICON_SIZES[size]}
            style={styles.icon}
          />
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
  icon: {
    backgroundColor: 'transparent',
  },
  touchableWrapper: {
    alignSelf: 'center',
    borderRadius: 100,
  },
});

const sizeStyles = {
  xs: StyleSheet.create({
    view: {
      height: 27,
      width: 27,
    },
  }),
  sm: StyleSheet.create({
    view: {
      height: 34,
      width: 34,
    },
  }),
  md: StyleSheet.create({
    view: {
      height: 60,
      width: 60,
    },
  }),
  lg: StyleSheet.create({
    view: {
      height: 70,
      width: 70,
    },
  }),
};
