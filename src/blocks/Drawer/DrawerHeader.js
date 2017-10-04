// @flow

import React from 'react';
import { StyleSheet, Platform } from 'react-native';

import { Button, Image, Text, View } from '../../atoms';

type Props = {
  onDonatePress: Function,
  communityImageURI: string,
  communityTitle: string,
};

const DrawerHeader = ({
  communityImageURI,
  communityTitle,
  onDonatePress,
}: Props) => (
  <View style={styles.container}>
    <Image source={{ uri: communityImageURI }} style={styles.image} />
    <Text size={15} color="white" weight="600" style={styles.title}>
      {communityTitle}
    </Text>
    <Button
      title="Donate"
      size="sm"
      color="#FC612D"
      textColor="white"
      onPress={onDonatePress}
    />
  </View>
);

export default DrawerHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 42 : 22,
    paddingBottom: 22,
    paddingLeft: 16,
    paddingRight: 23,
    backgroundColor: 'rgba(25,42,51,1)',
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
