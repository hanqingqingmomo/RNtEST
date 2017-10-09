// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Icon, View, Text, TouchableHighlight } from '../../atoms';
import DrawerHeader from './DrawerHeader';

const communityImageURI =
  'https://seeklogo.com/images/Y/YWCA-logo-B79B872F99-seeklogo.com.gif';
const communityTitle = 'YWCA';
const onDonatePress = () => {};

type TDrawerItem = {
  name: string,
  icon: string,
};

const ITEMS: Array<TDrawerItem> = [
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

function DrawerItem(props: { item: TDrawerItem }) {
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

const Drawer = ({ ...props }: any) => (
  <View style={styles.container}>
    <DrawerHeader
      communityImageURI={communityImageURI}
      communityTitle={communityTitle}
      onDonatePress={onDonatePress}
    />
    {ITEMS.map((item: TDrawerItem) => (
      <DrawerItem
        key={item.icon}
        item={item}
        onPress={() => props.onPress(item)}
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
