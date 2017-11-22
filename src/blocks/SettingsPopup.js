// @flow
import React from 'react';

import { Icon, Popover, PopoverItem, View } from '../atoms';
import { type PopupSetting } from '../Types';

type P = {
  settings: Array<PopupSetting>,
};

export default function SettingsPopup({ settings }: P) {
  return (
    <Popover
      labels={settings.map((setting: PopupSetting) => ({
        key: setting.key,
        label: () => (
          <PopoverItem
            contentView={setting.label}
            imageView={
              <Icon name={setting.iconName} color="#B0BEC5" size="md" />
            }
          />
        ),
        onPress: setting.onPress,
      }))}
      button={
        <View style={{ paddingHorizontal: 6 }}>
          <Icon name="menu" color="#CFD8DC" size={20} />
        </View>
      }
    />
  );
}
