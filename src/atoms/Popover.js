// @flow

import React from 'react';
import PopoverTooltip from 'react-native-popover-tooltip';
import { Dimensions } from 'react-native';

import { Icon } from './index';
import { getColor } from '../utils/color';

type Props = {
  labels: Array<Object>,
};

export default function Popover({ labels }: Props) {
  return (
    <PopoverTooltip
      buttonComponent={<Icon name="menu" color="orange" size={25} />}
      items={labels}
      animationType="spring"
      labelContainerStyle={{
        backgroundColor: getColor('white'),
        width: Dimensions.get('window').width,
      }}
      tooltipContainerStyle={{ borderRadius: 0 }}
    />
  );
}
