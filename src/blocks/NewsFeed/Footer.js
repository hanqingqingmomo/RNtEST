// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';

import { ActivityIndicator, Button, CenterView, View } from '../../atoms';

import { getColor } from '../../utils/color';

type Props = {
  loading: boolean,
  disabled: boolean,
  onRequestMoreData: () => mixed,
};

export default class Footer extends React.Component<Props> {
  render() {
    return (
      <Collapsible collapsed={this.props.disabled}>
        <View style={styles.wrapper}>
          {this.props.loading ? (
            <CenterView>
              <ActivityIndicator />
            </CenterView>
          ) : (
            <Button
              title="Load more"
              size="xs"
              color={getColor('orange')}
              textColor="white"
              onPress={this.props.onRequestMoreData}
            />
          )}
        </View>
      </Collapsible>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});
