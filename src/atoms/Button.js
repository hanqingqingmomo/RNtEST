// @flow

import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { Text, TouchableItem, View } from './index';

const styles = StyleSheet.create({
  touchableWrapper: {
    padding: 6,
    alignSelf: 'center',
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 64,
    minHeight: 36,
    borderRadius: 2,
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    marginHorizontal: 8,
  },
});

const appearanceStyles = {
  default: {
    view: {
      backgroundColor: '#ccc',
    },
    title: {
      color: '#666',
    },
  },
  primary: {
    view: {
      backgroundColor: Platform.select({ ios: '#006FFF', android: '#2196F3' }),
    },
    title: {
      color: Platform.select({ ios: 'white', android: 'white' }),
    },
  },
};

type AppearanceStyleName = $Keys<typeof appearanceStyles>;

type P = {
  appearance: AppearanceStyleName,
  buttonLeft?: ?React$Element<*>,
  buttonRight?: ?React$Element<*>,
  onPress: Function,
  style?: any,
  title: string,
};

export default function Button(props: P) {
  const { appearance, buttonLeft, buttonRight, onPress, style, title } = props;
  const activeAppearanceStyle = appearanceStyles[appearance];
  return (
    <TouchableItem onPress={onPress} style={styles.touchableWrapper}>
      <View style={[activeAppearanceStyle.view, styles.view, style]}>
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
