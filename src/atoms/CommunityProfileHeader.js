// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Image, ImageBackground, Text, View } from './index';
import { getColor } from '../utils/color';

type Props = {
  coverImageURI: string,
  profileImageURI: string,
  title: string,
};

export default function CommunityProfileHeader({
  coverImageURI,
  profileImageURI,
  title,
}: Props) {
  return (
    <ImageBackground
      source={{ uri: coverImageURI }}
      style={[styles.coverContainer]}
    >
      <View style={[styles.dimm, StyleSheet.absoluteFill]} />
      <View style={[styles.profileWrapper]}>
        <Image
          source={{ uri: profileImageURI }}
          style={[styles.profileImage]}
        />
        <View style={[styles.titleWrapper]}>
          <Text style={[styles.title]}>{title}</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  coverContainer: {
    width: '100%',
    height: 185,
    justifyContent: 'flex-end',
  },
  dimm: {
    backgroundColor: '#161D21',
    opacity: 0.35,
  },
  profileImage: {
    borderRadius: 3,
    width: 58,
    height: 58,
  },
  profileWrapper: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 92,
    paddingLeft: 15,
  },
  title: {
    color: getColor('white'),
    fontSize: 20,
    lineHeight: 24,
    width: '60%',
  },
  titleWrapper: {
    flexDirection: 'row',
    flexGrow: 1,
    paddingLeft: 12,
  },
});
