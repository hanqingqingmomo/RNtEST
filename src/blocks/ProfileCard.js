// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { View, Text, Avatar, Icon, Link, ShadowView } from '../atoms';

// TODO use type after merge
type P = {
  user: {
    imageURI: string,
    username: string,
    position: string,
    email: string,
    phone: string,
  },
};

export default class ProfileCard extends Component<P, void> {
  render() {
    const { username, position, imageURI, email, phone } = this.props.user;

    return (
      <ShadowView style={styles.container}>
        <Avatar imageURI={imageURI} size={100} />
        <Text
          size={19}
          color="#455A64"
          weight="500"
          lineHeight={20}
          style={styles.title}
        >
          {username}
        </Text>
        <Text
          size={14}
          color="#4e5f67"
          weight="500"
          lineHeight={16}
          style={styles.subtitle}
        >
          {position}
        </Text>
        <Link type="mail" value={email}>
          <Text size={14} color="orange" weight="500" lineHeight={16}>
            {email}
          </Text>
        </Link>
        <View style={styles.links}>
          <View style={styles.link}>
            <Link type="mail" value={email}>
              <View style={styles.linkWrapper}>
                <Icon
                  name="conversation"
                  size={32}
                  style={styles.icon}
                  color="orange"
                />
                <Text size={14} color="#4e5f67" weight="500" lineHeight={16}>
                  Message
                </Text>
              </View>
            </Link>
          </View>
          <View style={styles.link}>
            <Link type="phone" value={phone}>
              <View style={styles.linkWrapper}>
                <Icon
                  name="call-1"
                  size={32}
                  style={styles.icon}
                  color="orange"
                />
                <Text size={14} color="#4e5f67" weight="500" lineHeight={16}>
                  Call
                </Text>
              </View>
            </Link>
          </View>
        </View>
      </ShadowView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 26,
    paddingBottom: 30,
    backgroundColor: 'white',
  },
  links: {
    flexDirection: 'row',
    maxWidth: 230,
    marginTop: 30,
  },
  link: {
    flexGrow: 1,
    width: '50%',
  },
  linkWrapper: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: 13,
  },
  subtitle: {
    marginTop: 3,
    marginBottom: 10,
  },
  title: {
    marginTop: 15,
  },
});
