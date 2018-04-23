// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { TouchableOpacity, View, Image, Text } from '../../atoms';
import { type Community } from '../../Types';
import { css } from '../../utils/style';

type Props = {
  fullName: string,
  profilePhoto: string,
  onPress: Function,
};

export function UserPreview({
  fullName,
  profilePhoto,
  onPress,
}: Props): React$Node {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={[styles.imageWrapper, css('borderRadius', 21)]}>
          <Image
            source={
              profilePhoto ? { uri: profilePhoto } : require('./avatar.png')
            }
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <Text
          size={12}
          lineHeight={12}
          color="#455A64"
          style={styles.text}
          numberOfLines={1}
        >
          {fullName}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export function CommunityPreview({
  name,
  cover_photo,
  onPress,
}: Community & { onPress: Function }): React$Node {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={[styles.imageWrapper, css('borderRadius', 3)]}>
          <Image
            source={{ uri: cover_photo }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <Text
          size={12}
          lineHeight={12}
          color="#455A64"
          style={styles.text}
          numberOfLines={1}
        >
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 72,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  imageWrapper: {
    width: 42,
    height: 42,
    overflow: 'hidden',
    marginBottom: 7,
  },
  image: {
    width: 42,
    height: 42,
  },
  text: {
    textAlign: 'center',
  },
});
