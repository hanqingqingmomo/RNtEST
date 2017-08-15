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
  touchableWrapper: {
    margin: 6,
    alignSelf: 'center',
    borderRadius: 2,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 64,
    minHeight: 36,
    paddingHorizontal: 8,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    marginHorizontal: 8,
    transform: [{ translateY: -1 }],
  },
});

const appearanceStyles = {
  default: StyleSheet.create({
    view: {
      backgroundColor: 'transparent',
    },
    title: {
      color: Platform.select({ ios: '#006FFF', android: '#2196F3' }),
    },
  }),
  primary: StyleSheet.create({
    view: {
      backgroundColor: Platform.select({ ios: '#006FFF', android: '#2196F3' }),
    },
    title: {
      color: Platform.select({ ios: 'white', android: 'white' }),
    },
  }),
};

type AppearanceStyleName = $Keys<typeof appearanceStyles>;

type P = {
  appearance: AppearanceStyleName,
  buttonLeft?: ?React$Element<*>,
  buttonRight?: ?React$Element<*>,
  disabled?: boolean,
  onPress: Function,
  style?: any,
  title: string,
};

export default class Button extends React.Component<*, P, *> {
  id = `button-${Math.random()}`;

  render() {
    const {
      appearance,
      buttonLeft,
      buttonRight,
      disabled,
      onPress,
      style,
      title,
    } = this.props;
    const activeAppearanceStyle = appearanceStyles[appearance];
    return (
      <TouchableItem
        key={`${this.id}-${disabled ? 'disabled' : 'enabled'}`}
        disabled={disabled}
        pressColor="white"
        useForeground={Platform.select({
          ios: () => false,
          android: TouchableNativeFeedback.canUseNativeForeground,
        })()}
        hitSlop={HIT_SLOP}
        onPress={onPress}
        style={[
          { opacity: disabled ? 0.5 : 1 },
          activeAppearanceStyle.view,
          styles.touchableWrapper,
          style,
        ]}
      >
        <View style={[styles.view]}>
          {buttonLeft || null}

          {title !== ''
            ? <Text style={[activeAppearanceStyle.title, styles.title]}>
                {title}
              </Text>
            : null}

          {buttonRight || null}
        </View>
      </TouchableItem>
    );
  }
}
