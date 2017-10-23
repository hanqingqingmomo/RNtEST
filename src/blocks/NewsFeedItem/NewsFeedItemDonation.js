// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
  AvatarGroup,
  Button,
  Image,
  ShadowView,
  Text,
  View,
} from '../../atoms';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';

type DonorProps = {
  imageURI: string,
};

type P = {
  donors: Array<DonorProps>,
  imageURI: string,
  onDonatePress: () => void,
  title: string,
};

export default class NewsFeedItemDonation extends Component<P> {
  get imageURIs(): Array<string> {
    return this.props.donors.map(donor => donor.imageURI);
  }

  computeAvatarGroupTitle(diff: number) {
    return diff > 1 ? `+${diff} donors` : `+${diff} donor`;
  }

  render() {
    const { imageURI, title } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <ShadowView style={styles.dateBox} radius={3}>
            <Image
              source={{ uri: imageURI }}
              style={styles.image}
              resizeMode="cover"
            />
          </ShadowView>
          <View style={styles.text}>
            <Text
              size={14}
              lineHeight={18}
              weight="600"
              numberOfLines={2}
              ellipsizeMode="tail"
              style={[styles.title, css('color', '#455A64')]}
            >
              {title}
            </Text>
            <AvatarGroup
              imageURIs={this.imageURIs}
              title={this.computeAvatarGroupTitle}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Donate"
              size="sm"
              color={getColor('orange')}
              textColor="white"
              onPress={this.props.onDonatePress}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 13,
  },
  imageWrapper: {
    height: 200,
    marginBottom: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -26,
    marginLeft: -26,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 3,
    overflow: 'hidden',
  },
  title: {
    marginBottom: 4,
  },
  text: {
    flex: 1,
  },
  dateContainer: {
    flexDirection: 'row',
    marginBottom: 13,
  },
  dateBox: {
    borderWidth: 1,
    borderColor: '#CFD8DC',
    borderStyle: 'solid',
    width: 50,
    height: 50,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
    marginTop: 3,
  },
  button: {
    justifyContent: 'flex-end',
  },
});
