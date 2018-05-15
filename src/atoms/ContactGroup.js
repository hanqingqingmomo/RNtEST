// @flow

import React from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';

import { Avatar, TouchableItem, View, Text } from './index';
import { type User, type Style } from '../Types';
import { css } from '../utils/style';

const AVATAR_WIDTH = 42;
const DEVICE_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = DEVICE_WIDTH / 4.5;

type Contact = User & { disabled?: boolean, role?: string };

type Props = {
  onContactSelect: User => void,
  style?: Style,
  users: Array<Contact>,
};

// Zmenit imageURI na source pre Avatar

export default function ContactGroup({ onContactSelect, style, users }: Props) {
  return (
    <View style={[style, styles.scrollContainer]}>
      <ScrollView
        decelerationRate="normal"
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={DEVICE_WIDTH}
        snapToAlignment={'center'}
      >
        {users.map((user, i) => (
          <TouchableItem
            onPress={() => onContactSelect(user)}
            key={i}
            disabled={user.disabled}
          >
            <View style={[styles.itemStyle, css('width', ITEM_WIDTH)]}>
              <Avatar
                source={{ uri: user.profile_photo }}
                size={AVATAR_WIDTH}
                style={styles.avatarContainer}
              />
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.textStyle}
              >
                {user.first_name}
              </Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.textStyle}
                weight="700"
              >
                {user.role}
              </Text>
            </View>
          </TouchableItem>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    marginBottom: 5,
  },
  itemStyle: {
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  scrollContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 110,
    flexGrow: 1,
  },
  textStyle: {
    color: '#455a64',
    fontSize: 11,
    lineHeight: 13,
  },
});
