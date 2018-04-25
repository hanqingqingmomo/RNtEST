// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Text, CenterView, Icon, Button } from '../atoms';
import { getColor } from '../utils/color';
import type { IconName } from '../atoms/Icon/Utils';

type Props = {
  iconName: IconName,
  subtitle?: string,
  title: string,
  refresh?: Function,
};

export default class NoContent extends Component<Props> {
  render() {
    const { title, subtitle, iconName } = this.props;

    return (
      <CenterView style={styles.container}>
        {iconName ? <Icon name={iconName} size={110} color="#B0BEC5" /> : null}

        {title ? (
          <Text
            size={20}
            color="#455A64"
            weight="600"
            lineHeight={24}
            style={styles.title}
          >
            {title}
          </Text>
        ) : null}

        {subtitle ? (
          <Text
            size={14}
            color={getColor('gray')}
            lineHeight={22}
            style={styles.subtitle}
          >
            {subtitle}
          </Text>
        ) : null}
        {this.props.refresh ? (
          <Button title="Refresh" onPress={this.props.refresh} />
        ) : null}
      </CenterView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80,
  },
  title: {
    marginTop: 40,
    marginBottom: 14,
  },
  subtitle: {
    textAlign: 'center',
  },
});
