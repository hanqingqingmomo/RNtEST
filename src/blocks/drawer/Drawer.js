// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../../atoms';
import DrawerHeader from './DrawerHeader';
import DrawerItems from './DrawerItems';

const onDonatePress = () => {};
const communityImageURI =
  'https://seeklogo.com/images/Y/YWCA-logo-B79B872F99-seeklogo.com.gif';
const communityTitle = 'YWCA';

const Drawer = ({ ...rest }: any) => (
  <View style={styles.container}>
    <DrawerHeader
      onDonatePress={onDonatePress}
      communityImageURI={communityImageURI}
      communityTitle={communityTitle}
    />
    <DrawerItems {...rest} />
  </View>
);

export default Drawer;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(31,51,61,1)',
  },
});
