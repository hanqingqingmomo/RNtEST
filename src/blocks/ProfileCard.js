// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Lightbox from 'react-native-lightbox';

import {
  View,
  Text,
  Avatar,
  Link,
  ShadowView,
  ImagePreview,
  Icon,
  TouchableOpacity,
} from '../atoms';
import { type User } from '../Types';
import { getColor } from '../utils/color';

type P = {
  user: User,
  actionsView?: React$Node,
};

export default class ProfileCard extends Component<P> {
  render() {
    const { user, actionsView } = this.props;
    const { email, first_name, last_name, profile_photo, role } = user;

    return (
      <ShadowView radius={0}>
        <View style={styles.container}>
          {actionsView ? (
            <View style={styles.settings}>{actionsView}</View>
          ) : null}
          <Lightbox
            underlayColor="white"
            renderContent={() => (
              <ImagePreview
                resizeMode="contain"
                source={{ uri: profile_photo }}
              />
            )}
          >
            <View>
              <Avatar source={{ uri: profile_photo }} size={100} />
            </View>
          </Lightbox>
          <Text
            size={19}
            color="#455A64"
            weight="500"
            lineHeight={20}
            style={styles.title}
          >
            {`${first_name} ${last_name}`}
          </Text>
          {role ? (
            <Text
              size={14}
              color="#4e5f67"
              weight="500"
              lineHeight={16}
              style={styles.subtitle}
            >
              {role}
            </Text>
          ) : null}
          {email ? (
            <Link type="mail" value={email}>
              <Text
                size={14}
                color="orange"
                weight="500"
                lineHeight={16}
                style={styles.email}
              >
                {email}
              </Text>
            </Link>
          ) : null}
          <View style={styles.links}>
            {/* {email ? (
              <View style={styles.link}>
                <Link type="mail" value={email}>
                  <View style={styles.linkWrapper}>
                    <Icon
                      name="conversation"
                      size="md"
                      style={styles.icon}
                      color="orange"
                    />
                    <Text
                      size={14}
                      color={getColor('orange')}
                      weight="500"
                      lineHeight={16}
                    >
                      Message
                    </Text>
                  </View>
                </Link>
              </View>
            ) : null} */}

            <View style={styles.link}>
              <TouchableOpacity>
                <View style={styles.linkWrapper}>
                  <Icon
                    name="call-1"
                    size="md"
                    style={styles.icon}
                    color="orange"
                  />
                  <Text
                    size={14}
                    color={getColor('orange')}
                    weight="500"
                    lineHeight={16}
                  >
                    Call
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
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
  settings: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  links: {
    flexDirection: 'row',
    maxWidth: 312,
    marginTop: 30,
  },
  link: {
    width: '50%',
    paddingHorizontal: 6,
  },
  linkWrapper: {
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: getColor('orange'),
    flexDirection: 'row',
    borderRadius: 34 / 2,
    backgroundColor: 'transparent',
  },
  icon: {
    marginRight: 8,
  },
  subtitle: {
    marginTop: 3,
  },
  title: {
    marginTop: 15,
  },
  email: {
    marginTop: 10,
  },
});
