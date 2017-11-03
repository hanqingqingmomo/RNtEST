// @flow

import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { showImagePicker } from 'react-native-image-picker';

import { Avatar, Icon, View, TouchableItem, ShadowView } from '../atoms';
import { css } from '../utils/style';

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
  storageOptions: {
    skipBackup: true,
  },
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
      <TouchableItem onPress={this.onPress}>
        <View
          style={[css('width', s), css('height', s + 20), styles.centerContent]}
        >
          <ShadowView
            radius={s / 2}
            style={[
              css('width', s),
              css('height', s),
              css('backgroundColor', 'white'),
              styles.centerContent,
            ]}
          >
            <View>
              {!imageURI && <Icon name="plus" size={18} color="orange" />}
              {imageURI && <Avatar imageURI={imageURI} size={s - o * 2} />}
            </View>
          </ShadowView>
          {imageURI && (
            <ShadowView
              radius={16}
              style={[styles.editIconCircle, styles.centerContent]}
            >
              <Icon name="pen" size={16} color="#B0BEC5" />
            </ShadowView>
          )}
        </View>
      </TouchableItem>
    );
  }
}

const styles = StyleSheet.create({
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIconCircle: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 32,
    height: 32,
    backgroundColor: 'white',
  },
});
