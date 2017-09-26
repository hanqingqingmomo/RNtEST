// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { ImageBackground, View, Text, TouchableItem } from './';
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
      <TouchableItem style={style.shadow} onPress={this.onPress}>
        {isNew && (
          <Text
            style={style.badgeGreen}
            size={13}
            color="white"
            weight="bold"
            lineHeight={20}
          >
            New
          </Text>
        )}
        <View
          style={[style.container, isNew ? style.containerGreen : undefined]}
        >
          <ImageBackground style={style.image} source={{ uri: imageURI }}>
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
          </ImageBackground>
        </View>
      </TouchableItem>
    );
  }
}

const style = StyleSheet.create({
  container: {
    borderRadius: 3,
    overflow: 'hidden',
  },
  containerGreen: {
    borderColor: 'rgba(0,230,118,0.7)',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.14,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 4 },
    position: 'relative',
    paddingTop: 4,
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
  },
  textContainer: {
    backgroundColor: getColor('white'),
    marginTop: 84,
    minHeight: 88,
    paddingHorizontal: 9,
    paddingVertical: 10,
  },
});
