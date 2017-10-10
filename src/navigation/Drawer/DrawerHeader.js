// @flow

import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { Button, Image, Text, View, TouchableOpacity } from '../../atoms';

const communityTitle = 'YWCA';
const communityImageURI =
  'https://seeklogo.com/images/Y/YWCA-logo-B79B872F99-seeklogo.com.gif';

type Props = {
  onDonateButtonPress: () => void,
  onOrganisationTilePress: () => void,
};

const DrawerHeader = ({
  onOrganisationTilePress,
  onDonateButtonPress,
}: Props) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onOrganisationTilePress}>
      <View style={styles.logoTile}>
        <Image source={{ uri: communityImageURI }} style={styles.image} />
        <Text color="white" size={15} style={styles.title} weight="600">
          {communityTitle}
        </Text>
      </View>
    </TouchableOpacity>
    <Button
      color="#FC612D"
      onPress={onDonateButtonPress}
      size="sm"
      textColor="white"
      title="Donate"
    />
  </View>
);

export default DrawerHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 42 : 22,
    paddingBottom: 22,
    paddingLeft: 16,
    paddingRight: 23,
    backgroundColor: 'rgba(25,42,51,1)',
  },
  logoTile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    borderRadius: 3,
    width: 45,
    height: 45,
  },
  title: {
    flexGrow: 1,
    paddingLeft: 16,
  },
});
