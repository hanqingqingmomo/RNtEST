// @flow

import React from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';

import { Avatar, TouchableItem, View, Text } from './index';
import { type User, type Style } from '../Types';
import { css } from '../utils/style';

const AVATAR_WIDTH = 42;
const DEVICE_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = DEVICE_WIDTH / 4.5;

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
            <View style={[styles.itemStyle, css('width', ITEM_WIDTH)]}>
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
    alignSelf: 'center',
    marginBottom: 5,
  },
  itemStyle: {
    paddingHorizontal: 5,
  },
  scrollContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 110,
  },
  textStyle: {
    alignSelf: 'center',
    color: '#455a64',
    fontSize: 11,
    lineHeight: 13,
  },
});
