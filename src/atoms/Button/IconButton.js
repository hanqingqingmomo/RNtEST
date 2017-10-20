// @flow

import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import {
  Icon,
  Text,
  TouchableItem,
  TouchableNativeFeedback,
  View,
} from '../index';
import { type ColorName, type IconName, type IconSize } from '../../Types';
import { css } from '../../utils/style';

const HIT_SLOP = {
  top: 6,
  right: 6,
  bottom: 6,
  left: 6,
};

type P = {
  block?: boolean,
  color: ColorName | string,
  disabled: boolean,
  iconColor: ColorName | string,
  iconName: IconName,
  onPress: () => void,
  outline: boolean,
  size: IconSize | number,
  style?: any,
  textColor?: ColorName | string,
  title?: string,
};

export default class IconButton extends React.Component<P> {
  static defaultProps = {
    disabled: false,
    outline: false,
  };

  id = `icon-button-${Math.random()}`;

  render() {
    const {
      block,
      color,
      disabled,
      iconColor,
      iconName,
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
      activeSizeStyle.size.title,
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
          block ? css('width', '100%') : undefined,
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
            block ? css('width', '100%') : undefined,
          ]}
        >
          {iconName ? (
            <Icon
              color={iconColor}
              name={iconName}
              size={activeSizeStyle.iconSize}
              style={styles.icon}
            />
          ) : null}
          {title ? <Text style={textStyle}>{title}</Text> : null}
        </View>
      </TouchableItem>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    flexDirection: 'row',
  },
  icon: {
    backgroundColor: 'transparent',
    marginHorizontal: 7,
  },
  title: {
    marginHorizontal: 7,
    fontWeight: '500',
    transform: [{ translateY: -1 }],
  },
  touchableWrapper: {
    borderRadius: 100,
    overflow: 'hidden',
  },
});

const sizeStyles = {
  xs: {
    iconSize: 10,
    size: StyleSheet.create({
      title: {
        fontSize: 12,
      },
      view: {
        height: 20,
        minWidth: 20,
      },
    }),
  },
  sm: {
    iconSize: 12,
    size: StyleSheet.create({
      title: {
        fontSize: 12,
      },
      view: {
        height: 24,
        minWidth: 24,
      },
    }),
  },
  md: {
    iconSize: 18,
    size: StyleSheet.create({
      title: {
        fontSize: 15,
      },
      view: {
        height: 34,
        minWidth: 34,
      },
    }),
  },
  lg: {
    iconSize: 30,
    size: StyleSheet.create({
      title: {
        fontSize: 17,
      },
      view: {
        height: 48,
        minWidth: 48,
      },
    }),
  },
};
