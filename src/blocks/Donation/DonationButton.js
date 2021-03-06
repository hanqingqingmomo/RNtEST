// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Text, TouchableItem, Icon, View } from '../../atoms';
import { css } from '../../utils/style';
import { getColor } from '../../utils/color';
import { type Style } from '../../Types';

const HIT_SLOP = {
  top: 6,
  right: 6,
  bottom: 6,
  left: 6,
};

type P = {
  disabled?: boolean,
  icon?: string,
  isActive?: boolean,
  onPress: () => mixed,
  size: 'lg' | 'md' | 'sm',
  style?: Style,
  textColor?: {
    color: string,
  },
  title: string,
};

const HEIGHT = {
  sm: 35,
  md: 43,
  lg: 54,
};

export default class DonationButton extends Component<P> {
  render() {
    const {
      disabled,
      icon,
      isActive,
      size,
      style,
      textColor,
      title,
    } = this.props;

    return (
      <TouchableItem
        hitSlop={HIT_SLOP}
        disabled={disabled}
        onPress={this.props.onPress}
      >
        <View
          style={[
            styles.container,
            css('height', HEIGHT[size]),
            isActive ? styles.active : undefined,
            disabled ? css('opacity', 0.45) : undefined,
            style,
          ]}
        >
          <Text
            style={[
              css('color', isActive ? 'white' : '#455A64'),
              textColor,
              styles[size],
            ]}
            weight="500"
          >
            {title}
          </Text>
          {icon ? (
            <Icon name={icon} size="lg" color="white" style={styles.icon} />
          ) : null}
        </View>
      </TouchableItem>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#B0BEC5',
    borderRadius: 3,
    overflow: 'hidden',
    flexGrow: 1,
  },
  active: {
    backgroundColor: getColor('orange'),
    borderColor: getColor('orange'),
  },
  icon: {
    marginLeft: 10,
    marginTop: -3,
    overflow: 'hidden',
  },
  sm: {
    fontSize: 14,
  },
  md: {
    fontSize: 19,
  },
  lg: {
    fontSize: 18,
  },
});
