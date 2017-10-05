// @flow

import React from 'react';
import PopoverTooltip from 'react-native-popover-tooltip';
import { Dimensions } from 'react-native';

import { Icon } from './index';
import { getColor } from '../utils/color';

type Props = {
  labels: Array<Object>,
  button: Object,
};

export default function Popover({ labels, button }: Props) {
  return (
    <PopoverTooltip
      animationType="spring"
      buttonComponent={button}
      items={labels}
      labelContainerStyle={{
        backgroundColor: getColor('white'),
        width: Dimensions.get('window').width,
      }}
      tooltipContainerStyle={{ borderRadius: 0 }}
    />
  );
}
