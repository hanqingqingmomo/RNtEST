// @flow

import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { Button, Image, Text, View } from '../../atoms';

type Props = {
  communityImageURI: string,
  communityTitle: string,
  onDonatePress: Function,
};

const DrawerHeader = ({
  communityImageURI,
  communityTitle,
  onDonatePress,
}: Props) => (
  <View style={styles.container}>
    <Image source={{ uri: communityImageURI }} style={styles.image} />
    <Text color="white" size={15} style={styles.title} weight="600">
      {communityTitle}
    </Text>
    <Button
      color="#FC612D"
      onPress={onDonatePress}
      size="sm"
      textColor="white"
      title="Donate"
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
