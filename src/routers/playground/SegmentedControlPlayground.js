// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { View, SegmentedControl } from '../../atoms';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

type S = {
  labelA: string,
  labelB: string,
};

export default class SegmentedControlPlayground extends React.Component<
  *,
  *,
  S
> {
  static navigationOptions = { headerTitle: 'Segmented Control' };

  state = { labelA: 'A', labelB: 'A' };

  render() {
    return (
      <View>
        <View style={styles.container}>
          <SegmentedControl
            labels={['A', 'B', 'C']}
            onChange={labelA => this.setState({ labelA })}
            selectedLabel={this.state.labelA}
          />
        </View>
        <View style={styles.container}>
          <SegmentedControl
            labels={['A', 'B']}
            onChange={labelB => this.setState({ labelB })}
            selectedLabel={this.state.labelB}
          />
        </View>
      </View>
    );
  }
}
