// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Icon, View, Text, TouchableHighlight } from '../../atoms';
import DrawerHeader from './DrawerHeader';

export type NavigationItem = {
  name: string,
  icon: string,
  routeName: string,
};

type Props = {
  navigationItems: Array<NavigationItem>,
  handleNavigationItemPress: (navigationItem: NavigationItem) => void,
  handleDonationButtonPress: () => void,
  handleOrganisationTilePress: () => void,
};

type NavigationItemProps = {
  item: NavigationItem,
  onPress: () => void,
};

function DrawerItem(props: NavigationItemProps) {
  return (
    <TouchableHighlight onPress={props.onPress} key={props.item.name}>
      <View style={styles.item}>
        <View style={styles.icon}>
          <Icon name={props.item.icon} color="#455A64" size="md" />
        </View>
        <View style={styles.text}>
          <Text size={16} color="white" lineHeight={20}>
            {props.item.name}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const Drawer = (props: Props) => (
  <View style={styles.container}>
    <DrawerHeader
      onDonateButtonPress={props.handleDonationButtonPress}
      onOrganisationTilePress={props.handleOrganisationTilePress}
    />
    {props.navigationItems.map((item: NavigationItem) => (
      <DrawerItem
        key={item.icon}
        item={item}
        onPress={() => props.handleNavigationItemPress(item)}
      />
    ))}
  </View>
);

export default Drawer;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1F333D',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    paddingVertical: 25,
    borderBottomWidth: 1,
    flexGrow: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
});
