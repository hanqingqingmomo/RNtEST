// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import fontelloConfig from '../atoms/Icon/fontello/config';
import { Icon, Text, View } from '../atoms';

const names = fontelloConfig.glyphs.reduce(
  (acc, glyph) => acc.concat(glyph.css),
  []
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  iconWrapper: {
    padding: 10,
    alignItems: 'center',
    width: '25%',
    height: 75,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
});

type S = {
  imageUri: ?string,
};

export default class AvatarPlayground extends React.Component<*, *, S> {
  static navigationOptions = {
    headerTitle: 'Avatar, Avatar Group &amp; Avatar picker',
  };

  state = {
    imageUri: null,
  };

  onChange = (imageUri: string) => {
    this.setState({ imageUri });
  };

  render() {
    return (
      <View style={styles.container}>
        {names.map(name => (
          <View key={name} style={styles.iconWrapper}>
            <Icon key={name} name={name} color="#444" size={24} />
            <Text size={12} style={{ color: '#ccc' }}>
              {name}
            </Text>
          </View>
        ))}
      </View>
    );
  }
}
