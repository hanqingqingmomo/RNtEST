// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { View, Icon } from '../../atoms';
import { css } from '../../utils/style';

type Props = {
  selected: boolean,
  selectedBackgroundColor: string,
  color?: string,
  selectedColor?: string,
};

export const Checkmark = ({
  selected,
  selectedBackgroundColor,
  color = '#B0BEC5',
  selectedColor = 'white',
}: Props) => {
  return (
    <View
      style={[
        styles.checkmarkWrapper,
        css('borderColor', selected ? selectedBackgroundColor : '#CFD8DC'),
        css(
          'backgroundColor',
          selected ? selectedBackgroundColor : 'transparent'
        ),
      ]}
    >
      <Icon name="check" size={18} color={selected ? selectedColor : color} />
    </View>
  );
};

const styles = StyleSheet.create({
  checkmarkWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
