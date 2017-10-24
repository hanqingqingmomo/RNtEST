// @flow

import React, { Component } from 'react';
import { StyleSheet, Linking } from 'react-native';

import { Text, View, Icon, Image } from '../../atoms';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';
import { type LinkAttachment } from '../../Types';

type Props = LinkAttachment;

export default class NewsFeedItemAttachment extends Component<Props> {
  render() {
    const { title, description, thumbnail_url, url } = this.props;

    return (
      <View style={styles.container}>
        {thumbnail_url ? (
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: thumbnail_url }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        ) : null}
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
                {description}
              </Text>
            ) : null}
            {url ? (
              <Text
                size={14}
                lineHeight={18}
                numberOfLines={1}
                ellipsizeMode="tail"
                color={getColor('linkBlue')}
                onPress={() => Linking.openURL(url)}
              >
                {url}
              </Text>
            ) : null}
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
