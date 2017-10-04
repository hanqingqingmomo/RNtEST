// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, TouchableItem, Icon } from '../../atoms';
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
  icon?: string,
  isActive?: boolean,
  onPress: () => void,
  size: 'lg' | 'md' | 'sm',
  style: Style,
  title: string,
  disabled?: boolean,
};

export default class DonationButton extends React.Component<*, P, *> {
  render() {
    const { size, title, isActive, icon, disabled } = this.props;

    return (
      <TouchableItem
        hitSlop={HIT_SLOP}
        disabled={disabled}
        onPress={this.props.onPress}
      >
        <Text
          style={[
            css('color', '#455A64'),
            styles[size],
            styles.container,
            isActive ? styles.active : undefined,
            disabled ? css('opacity', 0.45) : undefined,
            this.props.style,
          ]}
          weight="500"
        >
          {title}

          {icon ? `  ` : null}
          {icon ? (
            <Icon
              name="attachment"
              size={24}
              color="white"
              style={{ backgroundColor: 'red' }}
            />
          ) : null}
        </Text>
      </TouchableItem>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#B0BEC5',
    borderRadius: 3,
    overflow: 'hidden',
    textAlign: 'center',
  },
  active: {
    color: 'white',
    backgroundColor: getColor('orange'),
    borderColor: getColor('orange'),
  },
  sm: {
    paddingVertical: 10,
    fontSize: 14,
  },
  md: {
    paddingVertical: 10,
    fontSize: 19,
  },
  lg: {
    paddingVertical: 15,
    fontSize: 18,
  },
});
