// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Image, ImageBackground, Text, View } from '../../atoms';
import { getColor } from '../../utils/color';

const TITLE = 'The Future is Female';
const SUBTITLE =
  'Help us in creating a future where ALL women thrive. Make a donation today.';

class Description extends React.Component<
  {},
  {
    collapsed: boolean,
  }
> {
  state = {
    collapsed: true,
  };

  render() {
    return (
      <View>
        <Text
          size={12}
          color="#90A4AE"
          numberOfLines={this.state.collapsed ? 2 : undefined}
        >
          YWCA Metropolitan Chicago supports more than 200,000 women and
          families in overcoming various challenges and finding personal and
          economic empowerment. You can be partner in our mission of eliminating
          racism and empowering women by making a contribution to power our
          critical work.
        </Text>
        <Text
          onPress={() =>
            this.setState(state => ({ collapsed: !state.collapsed }))}
        >
          Show more
        </Text>
      </View>
    );
  }
}

const PROFILE_IMAGE =
  'https://logos-download.com/wp-content/uploads/2016/11/YWCA_logo_logotype.png';

const COVER_IMAGE =
  'https://www.ywcaknox.com/wp-content/uploads/photo3-407x222.jpg';

export default function DonationHeader() {
  return (
    <ImageBackground
      source={{ uri: COVER_IMAGE }}
      style={styles.coverContainer}
    >
      <View style={[styles.dimm, StyleSheet.absoluteFill]} />
      <View style={styles.profileWrapper}>
        <Image
          source={{ uri: PROFILE_IMAGE }}
          style={styles.profileImage}
          resizeMode="contain"
        />
        <View style={styles.titleWrapper}>
          <Text
            color={getColor('white')}
            lineHeight={24}
            size={20}
            weight="500"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {TITLE}
          </Text>
          <Text
            color={getColor('white')}
            ellipsizeMode="tail"
            lineHeight={18}
            numberOfLines={2}
            size={15}
          >
            {SUBTITLE}
          </Text>
        </View>
      </View>
      <Description />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  coverContainer: {
    width: '100%',
    height: 185,
    justifyContent: 'flex-end',
  },
  dimm: {
    backgroundColor: '#161D21',
    opacity: 0.35,
  },
  profileImage: {
    backgroundColor: 'white',
    borderRadius: 3,
    height: 58,
    width: 58,
  },
  profileWrapper: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 92,
    paddingLeft: 15,
  },
  title: {
    color: getColor('white'),
    fontSize: 20,
    lineHeight: 24,
    width: '60%',
  },
  titleWrapper: {
    flex: 1,
    paddingHorizontal: 12,
  },
});
