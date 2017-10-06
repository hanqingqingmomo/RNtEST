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

type P = {
  color: ColorName | string,
  disabled: boolean,
  iconColor: ColorName | string,
  iconName: IconName,
  onPress: Function,
  outline: boolean,
  size: IconSize | number,
  style?: any,
};

export default class IconButton extends React.Component<P, void> {
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
            activeSizeStyle.view,
          ]}
        >
          <Icon
            color={iconColor}
            name={iconName}
            size={size}
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
