// @flow

import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import { Image, ImageBackground, Text, View } from './index';
import { getColor } from '../utils/color';

type Props = {
  coverImageURI: string,
  profileImageURI: string,
  title: string,
  subtitle?: string,
};

const RATIO = 0.66;

export default function OrganizationHeader({
  coverImageURI,
  profileImageURI,
  title,
  subtitle,
}: Props) {
  return (
    <ImageBackground
      source={{ uri: coverImageURI }}
      style={styles.coverContainer}
    >
      <View style={[styles.dimm, StyleSheet.absoluteFill]} />
      <View style={styles.profileWrapper}>
        <Image
          source={{ uri: profileImageURI }}
          style={styles.profileImage}
          resizeMode="contain"
        />

        <View style={styles.titleWrapper}>
          <Text
            color={getColor('white')}
            lineHeight={24}
            size={20}
            weight="500"
          >
            {title}
          </Text>
          {subtitle ? (
            <Text
              color={getColor('white')}
              ellipsizeMode="tail"
              lineHeight={18}
              numberOfLines={2}
              size={15}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  coverContainer: {
    width: '100%',
    height: Dimensions.get('window').width * RATIO,
    justifyContent: 'flex-end',
  },
  dimm: {
    backgroundColor: '#161D21',
    opacity: 0.35,
  },
  profileImage: {
    backgroundColor: 'white',
    borderRadius: 3,
    height: 58,
    width: 58,
  },
  profileWrapper: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 92,
    paddingLeft: 15,
  },
  titleWrapper: {
    flex: 1,
    paddingHorizontal: 12,
  },
});
