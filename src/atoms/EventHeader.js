// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Button, Image, ImageBackground, Pill, Text, View } from './index';
import { getColor } from '../utils/color';

type Props = {
  coverImageURI: string,
  isClosed: boolean,
  subtitle?: string,
  title: string,
  pillTitle: string,
  onPress: Function,
};

export default function EventHeader({
  coverImageURI,
  isClosed,
  onPress,
  pillTitle,
  subtitle,
  title,
}: Props) {
  return (
    <ImageBackground
      source={{ uri: coverImageURI }}
      style={styles.coverContainer}
    >
      <View style={[styles.dimm, StyleSheet.absoluteFill]} />
      <View style={styles.headerContainer}>
        <View style={styles.profileWrapper}>
          <View style={styles.titleWrapper}>
            <Text color={getColor('white')} lineHeight={24} size={20}>
              {title}
            </Text>
            {subtitle ? (
              <Text
                color={getColor('white')}
                ellipsizeMode="tail"
                lineHeight={16}
                size={14}
              >
                {subtitle}
              </Text>
            ) : null}
          </View>
          <View style={styles.pillWrapper}>
            <Pill color={getColor('white')} title={pillTitle} />
          </View>
        </View>
        {isClosed === true ? null : (
          <View style={styles.buttonWrapper}>
            <Button.Icon
              color={getColor('white')}
              iconColor={getColor('orange')}
              iconName="video-arrow"
              onPress={onPress}
              size="lg"
              style={styles.shadow}
            />
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 95,
    flex: 1,
  },
  coverContainer: {
    width: '100%',
    height: 185,
    justifyContent: 'flex-end',
  },
  dimm: {
    backgroundColor: '#161D21',
    opacity: 0.35,
  },
  headerContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
  },
  pillWrapper: {
    paddingTop: 10,
    marginBottom: 15,
  },
  profileWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 95,
    paddingLeft: 15,
    flex: 3,
  },
  title: {
    color: getColor('white'),
    fontSize: 20,
    lineHeight: 24,
  },
  titleWrapper: {
    flex: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});
