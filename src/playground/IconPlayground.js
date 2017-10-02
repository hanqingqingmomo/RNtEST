// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import fontelloConfig from '../atoms/Icon/fontello/config';
import { Icon, Text, View, SearchBox, ScrollView } from '../atoms';

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
  searchBox: {
    padding: 10,
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
  searchTerm: string,
};

export default class IconPlayground extends React.Component<*, *, S> {
  static navigationOptions = {
    headerTitle: 'Icons',
  };

  state = {
    searchTerm: '',
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.searchBox}>
          <SearchBox
            value={this.state.searchTerm}
            onChangeText={searchTerm => this.setState({ searchTerm })}
            placeholder="Search icons"
          />
        </View>
        <View style={styles.container}>
          {names
            .filter(
              name =>
                this.state.searchTerm === '' ||
                name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            )
            .sort(function(a, b) {
              if (a < b) return -1;
              if (a > b) return 1;
              return 0;
            })
            .map(name => (
              <View key={name} style={styles.iconWrapper}>
                <Icon key={name} name={name} color="#444" size={24} />
                <Text size={12} style={{ color: '#ccc' }}>
                  {name}
                </Text>
              </View>
            ))}
        </View>
      </ScrollView>
    );
  }
}
