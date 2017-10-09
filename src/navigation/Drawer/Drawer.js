// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Icon, View, Text, TouchableHighlight } from '../../atoms';
import DrawerHeader from './DrawerHeader';
import DrawerItems from './DrawerItems';

const communityImageURI =
  'https://seeklogo.com/images/Y/YWCA-logo-B79B872F99-seeklogo.com.gif';
const communityTitle = 'YWCA';
const onDonatePress = () => {};

type DrawerItem = {
  name: string,
  icon: string,
};

const ITEMS: Array<DrawerItem> = [
  {
    name: 'Your Profile',
    icon: 'user',
  },
  {
    name: 'Notifications',
    icon: 'notification',
  },
  {
    name: 'Settings',
    icon: 'settings',
  },
  {
    name: 'Help',
    icon: 'chat-start',
  },
  {
    name: 'Invite Friends',
    icon: 'invite-sidebar',
  },
];

function DrawerItem(props: { item: DrawerItem }) {
  return (
    <TouchableHighlight onPress={props.onPress} key={props.item.name}>
      <View style={{ flexDirection: 'row' }}>
        <Icon name={props.item.icon} color="red" />
        <Text>{props.item.name}</Text>
      </View>
    </TouchableHighlight>
  );
}

const Drawer = ({ ...props }: any) => (
  <View style={styles.container}>
    <DrawerHeader
      communityImageURI={communityImageURI}
      communityTitle={communityTitle}
      onDonatePress={onDonatePress}
    />
    {ITEMS.map((item: DrawerItem) => (
      <DrawerItem item={item} onPress={() => props.onPress(item)} />
    ))}
  </View>
);

export default Drawer;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(31,51,61,1)',
  },
});
