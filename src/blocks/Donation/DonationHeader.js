// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Image, ImageBackground, Text, View } from '../../atoms';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';

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
      <View style={css('paddingBottom', 15)}>
        <Text
          size={12}
          color={getColor('white')}
          style={[css('backgroundColor', 'transparent'), css('paddingTop', 10)]}
          numberOfLines={this.state.collapsed ? 2 : undefined}
        >
          YWCA Metropolitan Chicago supports more than 200,000 women and
          families in overcoming various challenges and finding personal and
          economic empowerment. You can be partner in our mission of eliminating
          racism and empowering women by making a contribution to power our
          critical work.
        </Text>
        <Text
          color={getColor('white')}
          onPress={() =>
            this.setState(state => ({ collapsed: !state.collapsed }))}
          style={[
            css('textDecorationLine', 'underline'),
            css('backgroundColor', 'transparent'),
          ]}
        >
          {this.state.collapsed ? 'Show more' : 'Show less'}
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
            Help us strengthen Chicago by empowering women and families
          </Text>
        </View>
      </View>
      <Description />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  coverContainer: {
    paddingTop: 50,
    width: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
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
    backgroundColor: 'transparent',
    flexDirection: 'column',
    height: 115,
  },
  title: {
    color: getColor('white'),
    fontSize: 20,
    lineHeight: 24,
  },
  titleWrapper: {
    paddingTop: 10,
    flex: 1,
  },
});
