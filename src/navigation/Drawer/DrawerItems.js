/* @flow */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { TouchableItem } from '../../atoms';
import { getColor } from '../../utils/color';

import type {
  NavigationScreenProp,
  NavigationState,
  NavigationAction,
  NavigationRoute,
  ViewStyleProp,
  TextStyleProp,
} from 'react-navigation/lib-rn/TypeDefinition.js.flow';
import type {
  DrawerScene,
  DrawerItem,
} from 'react-navigation/lib-rn/views/Drawer/DrawerView.js.flow';

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationAction>,
  items: Array<NavigationRoute>,
  activeItemKey?: string,
  activeTintColor?: string,
  activeBackgroundColor?: string,
  inactiveTintColor?: string,
  inactiveBackgroundColor?: string,
  getLabel: (scene: DrawerScene) => ?(React.Element<*> | string),
  renderIcon: (scene: DrawerScene) => ?React.Element<*>,
  onItemPress: (info: DrawerItem) => void,
  style?: ViewStyleProp,
  labelStyle?: TextStyleProp,
};

/**
 * Component that renders the navigation list in the drawer.
 */
const DrawerNavigatorItems = ({
  navigation: { state, navigate },
  items,
  activeItemKey,
  activeTintColor,
  activeBackgroundColor,
  inactiveTintColor,
  inactiveBackgroundColor,
  getLabel,
  renderIcon,
  onItemPress,
  style,
  labelStyle,
}: Props) => (
  <View style={[styles.container, style]}>
    <ScrollView alwaysBounceVertical={false} overScrollMode="auto">
      {items.map((route: NavigationRoute, index: number) => {
        const focused = activeItemKey === route.key;
        const color = focused ? activeTintColor : inactiveTintColor;
        const backgroundColor = focused
          ? activeBackgroundColor
          : inactiveBackgroundColor;
        const scene = { route, index, focused, tintColor: color };
        const icon = renderIcon(scene);
        const label = getLabel(scene);
        return (
          <TouchableItem
            key={route.key}
            onPress={() => {
              onItemPress({ route, focused });
            }}
            delayPressIn={0}
          >
            <View style={[styles.item, { backgroundColor }]}>
              {icon ? (
                <View
                  style={[styles.icon, focused ? null : styles.inactiveIcon]}
                >
                  {icon}
                </View>
              ) : null}
              <View style={styles.itemBorder}>
                {typeof label === 'string' ? (
                  <Text style={[styles.label, { color }, labelStyle]}>
                    {label}
                  </Text>
                ) : (
                  label
                )}
              </View>
            </View>
          </TouchableItem>
        );
      })}
    </ScrollView>
  </View>
);

/* Material design specs - https://material.io/guidelines/patterns/navigation-drawer.html#navigation-drawer-specs */
DrawerNavigatorItems.defaultProps = {
  activeTintColor: getColor('orange'),
  activeBackgroundColor: 'transparent',
  inactiveTintColor: getColor('white'),
  inactiveBackgroundColor: 'transparent',
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  inactiveIcon: {
    opacity: 1,
  },
  itemBorder: {
    flexGrow: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  label: {
    margin: 24,
    marginLeft: 0,
    fontSize: 16,
    fontWeight: 'normal',
  },
});

export default DrawerNavigatorItems;
