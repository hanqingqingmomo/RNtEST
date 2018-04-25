// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { TouchableOpacity, View, Text, Avatar } from '../../atoms';
import { type Community } from '../../Types';

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
        <Avatar
          source={
            profilePhoto ? { uri: profilePhoto } : require('./avatar.png')
          }
          size={42}
          resizeMode="cover"
          style={styles.imageWrapper}
        />
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
        <Avatar
          radius={3}
          resizeMode="cover"
          size={42}
          source={{ uri: cover_photo }}
          style={styles.imageWrapper}
        />
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
    marginBottom: 7,
  },
  text: {
    textAlign: 'center',
  },
});
