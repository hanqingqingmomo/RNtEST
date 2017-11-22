// @flow
import React from 'react';

import {
  Icon,
  Popover,
  PopoverItem,
  View,
  CenterView,
  ActivityIndicator,
} from '../atoms';
import { type PopupSetting } from '../Types';

type P = {
  settings: Array<PopupSetting>,
  busy?: boolean,
};

export default function SettingsPopup({ settings, busy }: P) {
  return (
    <Popover
      labels={settings.map((setting: PopupSetting) => ({
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
          {busy ? (
            <CenterView>
              <ActivityIndicator />
            </CenterView>
          ) : (
            <Icon name="menu" color="#CFD8DC" size={20} />
          )}
        </View>
      }
    />
  );
}
