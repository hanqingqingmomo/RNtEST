// @flow

import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import {
  Button,
  Text,
  View,
  Icon,
  CenterView,
  TouchableOpacity,
} from '../../atoms';
import { getColor } from '../../utils/color';

const communityTitle = 'YWCA';

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
        <CenterView
          style={{
            width: 40,
            height: 40,
            backgroundColor: 'white',
            borderRadius: 4,
          }}
        >
          <Icon name="ywca" color="orange" size={32} />
        </CenterView>
        <Text color="white" size={15} style={styles.title} weight="600">
          {communityTitle}
        </Text>
      </View>
    </TouchableOpacity>
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
    borderRadius: 3,
    width: 45,
    height: 45,
  },
  title: {
    flexGrow: 1,
    paddingLeft: 16,
  },
});
