// @flow

import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { showImagePicker } from 'react-native-image-picker';

import { Avatar, Icon, View, TouchableItem } from '../atoms';

const SIZE = 68;
const OUTLINE_WIDTH = 2;

type P = {
  imageURI?: ?string,
  size?: number,
  outlineWidth?: number,
  onChange: (imageURI: string) => void,
};

const DEFAULT_OPTIONS = {
  title: 'Choose Profile Picture',
  takePhotoButtonTitle: 'Take Photo',
  chooseFromLibraryButtonTitle: 'Choose from Library',
  mediaType: 'photo',
  noData: true,
  allowsEditing: true,
};

export default class AvatarPicker extends Component<P> {
  onPress = () => {
    const { onChange } = this.props;

    showImagePicker(DEFAULT_OPTIONS, response => {
      const { error, didCancel, uri } = response;
      if (error) {
        Alert.alert('Error', error);
      } else if (!didCancel) {
        onChange(uri);
      }
    });
  };

  render() {
    const { imageURI, size, outlineWidth } = this.props;

    const s = typeof size !== 'undefined' ? size : SIZE;
    const o =
      typeof outlineWidth !== 'undefined' ? outlineWidth : OUTLINE_WIDTH;

    return (
      <TouchableItem
        onPress={this.onPress}
        style={{
          width: s,
          height: s,
          borderRadius: s / 2,
        }}
      >
        <View
          style={[
            styles.circle,
            styles.shadow,
            styles.centerContent,
            { borderRadius: s / 2 },
          ]}
        >
          {!imageURI && <Icon name="plus" size={18} color="#B0BEC5" />}
          {imageURI && <Avatar imageURI={imageURI} size={s - o * 2} />}
          {imageURI && (
            <View
              style={[
                styles.editIconCircle,
                styles.centerContent,
                styles.shadow,
              ]}
            >
              <Icon name="pen" size={16} color="#B0BEC5" />
            </View>
          )}
        </View>
      </TouchableItem>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    borderColor: 'white',
    borderWidth: 2,
    width: '100%',
    height: '100%',
  },
  shadow: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIconCircle: {
    position: 'absolute',
    top: 0,
    right: -16,
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});
