// @flow

import React from 'react';
import { Dimensions } from 'react-native';

import PopoverTooltip from './react-native-popover-tooltip';
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
      labelContainerStyle={styles.labelContainerStyle}
      tooltipContainerStyle={styles.tooltipContainerStyle}
      overlayStyle={styles.overlayStyle}
      setBelow
      delayLongPress={25}
    />
  );
}

const styles = {
  tooltipContainerStyle: {
    borderRadius: 0,
    padding: 0,
    margin: 0,
  },
  labelContainerStyle: {
    padding: 0,
    margin: 0,
    backgroundColor: getColor('white'),
    width: Dimensions.get('window').width,
  },
  overlayStyle: {
    backgroundColor: 'rgba(8, 16, 20, 0.4)',
  },
};
