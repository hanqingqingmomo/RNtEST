// @flow

import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import Color from 'color';

import { View, Text, Image, ShadowView } from './index';
import { getColor } from '../utils/color';
import { css } from '../utils/style';

type P = {
  imageURI: string,
  isNew: boolean,
  subtitle: string,
  title: string,
};

export default class CommunityCard extends Component<P> {
  render() {
    const { title, imageURI, subtitle, isNew } = this.props;

    return (
      <View style={styles.container}>
        {isNew ? (
          <Text
            style={styles.badgeGreen}
            size={13}
            color="white"
            weight="bold"
            lineHeight={Platform.select({ android: 19, ios: 20 })}
          >
            New
          </Text>
        ) : null}
        <ShadowView radius={3}>
          <View style={[styles.border, isNew ? styles.borderGreen : undefined]}>
            <Image
              style={styles.image}
              source={{ uri: imageURI }}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <Text
                style={css('color', getColor('orange'))}
                size={15}
                weight="500"
                lineHeight={18}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {title}
              </Text>
              <Text color="gray" size={13} weight="600" lineHeight={22}>
                {subtitle}
              </Text>
            </View>
          </View>
        </ShadowView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
  },
  border: {
    overflow: 'hidden',
    borderRadius: 3,
    backgroundColor: 'transparent',
  },
  borderGreen: {
    borderColor: Color(getColor('green')).alpha(0.7),
    borderWidth: 1,
  },
  badgeGreen: {
    backgroundColor: getColor('green'),
    width: 46,
    height: 20,
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 10,
  },
  image: {
    width: '100%',
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    height: 84,
  },
  textContainer: {
    backgroundColor: getColor('white'),
    minHeight: 88,
    paddingHorizontal: 9,
    paddingVertical: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
});
