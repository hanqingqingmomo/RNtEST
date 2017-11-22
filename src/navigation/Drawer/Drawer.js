// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Icon, Link, View, Text, TouchableHighlight } from '../../atoms';
import { getColor } from '../../utils/color';
import DrawerHeader from './DrawerHeader';

export type NavigationItem = {
  icon: string,
  name?: string,
  routeName: string,
};

type Props = {
  navigationItems: Array<NavigationItem>,
  handleNavigationItemPress: (navigationItem: NavigationItem) => void,
  handleDonationButtonPress: () => void,
  handleOrganisationTilePress: () => void,
  data?: {
    name: string,
    profile_photo: string,
  },
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
      data={props.data}
    />
    {props.navigationItems.map((item: NavigationItem) => (
      <DrawerItem
        key={item.icon}
        item={item}
        onPress={() => props.handleNavigationItemPress(item)}
      />
    ))}
    <View style={styles.pbaLogo}>
      <Text style={styles.pbaText}>Brought to you by</Text>
      <Link type="https" value="poweredbyaction.org">
        <Icon name="pba-logo" size={28} color={getColor('white')} />
      </Link>
    </View>
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
  pbaLogo: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  pbaText: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '300',
    color: getColor('white'),
  },
});
