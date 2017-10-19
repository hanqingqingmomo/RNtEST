// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, Icon, Image } from '../../atoms';
import { css } from '../../utils/style';

type P = {
  image_url?: string,
  title?: string,
  type: 'link',
  url?: string,
};

export default class NewsFeedItemAttachment extends Component<P> {
  render() {
    const { image_url, title, url } = this.props;

    return image_url ? (
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: image_url }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.decription}>
          <View style={styles.icon}>
            <Icon name="link" size={24} color="#B0BEC5" />
          </View>
          <View style={styles.text}>
            {title ? (
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
            ) : null}
            <Text
              size={14}
              lineHeight={18}
              numberOfLines={1}
              ellipsizeMode="tail"
              style={css('color', '#00B0FF')}
            >
              {url}
            </Text>
          </View>
        </View>
      </View>
    ) : null;
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
