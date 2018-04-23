// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { TouchableOpacity, View, Image, Text } from '../../atoms';
import { type User, type Community } from '../../Types';

export function UserPreview({
  first_name,
  last_name,
  profile_photo,
}: User): React$Node {
  return (
    <TouchableOpacity disabled>
      <View style={styles.container}>
        <View style={[styles.imageWrapper, { borderRadius: 21 }]}>
          <Image
            source={
              profile_photo ? { uri: profile_photo } : require('./avatar.png')
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
          {first_name} {last_name}
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
        <View style={[styles.imageWrapper, { borderRadius: 3 }]}>
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
