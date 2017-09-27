// @flow

import React from 'react';
import { StyleSheet, Platform } from 'react-native';

import { View, Text, TouchableItem, Image } from './index';
import { getColor } from '../utils/color';
import { css } from '../utils/style';

type P = {
  imageURI: string,
  isNew: boolean,
  onPress: Function,
  subtitle: string,
  title: string,
};

export default class CommunityCard extends React.Component<*, P, *> {
  onPress = (): void => {
    this.props.onPress(this.props);
  };

  render() {
    const { title, imageURI, subtitle, isNew } = this.props;

    return (
      <TouchableItem onPress={this.onPress}>
        <View style={style.container}>
          {isNew ? (
            <Text
              style={style.badgeGreen}
              size={13}
              color="white"
              weight="bold"
              lineHeight={Platform.OS === 'android' ? 19 : 20}
            >
              New
            </Text>
          ) : null}
          <View style={style.wrapper}>
            <View
              style={[
                style.border,
                Platform.OS === 'android' ? style.borderStyle : undefined,
                isNew ? style.borderGreen : undefined,
              ]}
            >
              <Image
                style={style.image}
                source={{ uri: imageURI }}
                resizeMode="cover"
              />
              <View style={style.textContainer}>
                <Text
                  style={css('color', '#FC612D')}
                  size={15}
                  weight="500"
                  lineHeight={18}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {title}
                </Text>
                <Text
                  style={css('color', '#90A4AE')}
                  size={13}
                  weight="600"
                  lineHeight={22}
                >
                  {subtitle}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableItem>
    );
  }
}

const style = StyleSheet.create({
  container: {
    paddingTop: 4,
    backgroundColor: 'transparent',
  },
  wrapper: {
    borderRadius: 3,
    backgroundColor: 'transparent',
    shadowColor: 'black',
    shadowOpacity: 0.14,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 4 },
  },
  borderStyle: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.14)',
  },
  border: {
    borderRadius: 3,
    borderStyle: 'solid',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  borderGreen: {
    borderColor: 'rgba(0,230,118,0.7)',
    borderWidth: 1,
  },
  badgeGreen: {
    backgroundColor: getColor('green'),
    width: 46,
    height: 20,
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 10,
  },
  image: {
    width: '100%',
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    height: 84,
  },
  textContainer: {
    backgroundColor: getColor('white'),
    minHeight: 88,
    paddingHorizontal: 9,
    paddingVertical: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
});
