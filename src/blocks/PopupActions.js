// @flow
import React from 'react';

import { Icon, Popover, PopoverItem, View } from '../atoms';
import type { PopupAction } from '../Types';

type Props = {
  actions: Array<PopupAction>,
};

export default function PopupActions({ actions }: Props) {
  return (
    <Popover
      labels={actions.map((action: PopupAction) => ({
        key: action.key,
        label: () => (
          <PopoverItem
            contentView={action.label}
            imageView={
              <Icon name={action.iconName} color="#B0BEC5" size="md" />
            }
          />
        ),
        onPress: action.onPress,
      }))}
      button={
        <View style={{ paddingHorizontal: 6 }}>
          <Icon name="menu" color="#CFD8DC" size={20} />
        </View>
      }
    />
  );
}
