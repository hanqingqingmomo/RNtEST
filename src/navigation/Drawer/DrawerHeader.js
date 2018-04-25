// @flow

import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { Button, TouchableOpacity, Text, View, Avatar } from '../../atoms';
import { getColor } from '../../utils/color';

type Props = {
  onDonateButtonPress: () => void,
  onOrganisationTilePress: () => void,
  data?: {
    name: string,
    profile_photo: string,
  },
};

const DrawerHeader = ({
  onOrganisationTilePress,
  onDonateButtonPress,
  data,
}: Props) => (
  <View style={styles.container}>
    {data && (
      <TouchableOpacity onPress={onOrganisationTilePress}>
        <View style={styles.logoTile}>
          <Avatar
            imageURI={data.profile_photo}
            radius={3}
            size={40}
            resizeMode="contain"
            style={styles.image}
          />
          <Text color="white" size={15} style={styles.title} weight="600">
            {data.name}
          </Text>
        </View>
      </TouchableOpacity>
    )}
    <Button
      color={getColor('orange')}
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
    backgroundColor: 'white',
  },
  title: {
    flexGrow: 1,
    paddingLeft: 16,
  },
});
