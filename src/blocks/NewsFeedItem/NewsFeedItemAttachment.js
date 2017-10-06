// @flow

import React from 'react';
import { StyleSheet, Platform } from 'react-native';

import { Text, View, Icon, Image } from '../../atoms';
import { css } from '../../utils/style';

type P = {
  imageURI?: string,
  title: string,
  videoURI?: string,
};

export default class NewsFeedItemAttachment extends React.Component<P, void> {
  render() {
    const { imageURI, title, videoURI } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          {imageURI ? (
            <Image
              source={{ uri: imageURI }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : null}
        </View>
        <View style={styles.decription}>
          <View style={styles.icon}>
            <Icon name="link" size={24} color="#B0BEC5" />
          </View>
          <View style={styles.text}>
            <Text
              size={14}
              weight="600"
              lineHeight={18}
              numberOfLines={1}
              ellipsizeMode="tail"
              style={css('color', '#38505A')}
            >
              {title}
            </Text>
            <Text
              size={14}
              lineHeight={18}
              numberOfLines={1}
              ellipsizeMode="tail"
              style={css('color', '#00B0FF')}
            >
              {imageURI}
              {videoURI}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 11,
    marginRight: -26,
  },
  image: {
    width: '100%',
    height: 200,
  },
  decription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    alignItems: 'center',
    width: 30,
  },
  text: {
    flex: 1,
  },
});
