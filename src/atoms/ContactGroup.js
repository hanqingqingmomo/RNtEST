// @flow

import React from 'react';
import { StyleSheet, ScrollView, Text, Dimensions } from 'react-native';

import { Avatar, TouchableItem, View } from './index';
import { type User, type Style } from '../Types';

const AVATAR_WIDTH = 42;
const DEVICE_WIDTH = Dimensions.get('window').width;

type Props = {
  onContactSelect: User => void,
  style?: Style,
  users: Array<User>,
};

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
          <TouchableItem onPress={() => onContactSelect(user)} key={i}>
            <View style={styles.itemStyle}>
              <View style={styles.avatarContainer}>
                <Avatar imageURI={user.profilePhoto} size={AVATAR_WIDTH} />
              </View>
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
    alignSelf: 'center',
    marginBottom: 5,
  },

  itemStyle: {
    marginLeft: 5,
    marginRight: 5,
    width: 70,
  },

  roleText: {
    fontWeight: '700',
  },

  scrollContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 110,
  },

  textStyle: {
    alignSelf: 'center',
    color: 'rgba(69, 90, 100, 1)',
    fontSize: 11,
    lineHeight: 13,
  },
});
