// @flow

import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { Icon, TouchableItem, TouchableNativeFeedback, View } from '../index';
import { type ColorName, type IconName, type IconSize } from '../../Types';
import { css } from '../../utils/style';

const HIT_SLOP = {
  top: 6,
  right: 6,
  bottom: 6,
  left: 6,
};

type DP = {
  disabled: boolean,
  outline: boolean,
};

type P = {
  color: ColorName | string,
  disabled?: boolean,
  iconColor: ColorName | string,
  iconName: IconName,
  onPress: () => void,
  outline?: boolean,
  size: IconSize | number,
  style?: any,
};

export default class IconButton extends React.Component<DP, P, void> {
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
            activeSizeStyle.size.view,
          ]}
        >
          <Icon
            color={iconColor}
            name={iconName}
            size={activeSizeStyle.iconSize}
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
  xs: {
    iconSize: 10,
    size: StyleSheet.create({
      view: {
        height: 20,
        width: 20,
      },
    }),
  },
  sm: {
    iconSize: 12,
    size: StyleSheet.create({
      view: {
        height: 24,
        width: 24,
      },
    }),
  },
  md: {
    iconSize: 18,
    size: StyleSheet.create({
      view: {
        height: 34,
        width: 34,
      },
    }),
  },
  lg: {
    iconSize: 30,
    size: StyleSheet.create({
      view: {
        height: 48,
        width: 48,
      },
    }),
  },
};
