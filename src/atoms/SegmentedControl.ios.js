// @flow

import React from 'react';
import { SegmentedControlIOS } from 'react-native';

import { getColor } from '../utils/color';

type Props = {
  labels: Array<string>,
  onChange: string => void,
  selectedLabel: string,
};

export default function SegmentedControl({
  labels,
  onChange,
  selectedLabel,
}: Props) {
  return (
    <SegmentedControlIOS
      values={labels}
      onChange={onChange}
      selectedIndex={labels.indexOf(selectedLabel)}
      tintColor={getColor('orange')}
    />
  );
}
