// @flow
import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { View, Text, TouchableItem, Image } from '../atoms';

type P = {
  color: string,
  size: number,
  title: string,
  onChange: Function,
  imageUri?: string,
};

export default class ImageInput extends Component<*, P, *> {
  onPress = () => {
    const { title, onChange } = this.props;

    const options = {
      title,
      takePhotoButtonTitle: 'Take Photo',
      chooseFromLibraryButtonTitle: 'Choose from Library',
      mediaType: 'photo',
    };

    ImagePicker.showImagePicker(options, response => {
      const { error, didCancel, uri } = response;

      if (error) {
        Alert.alert('Error', error);
      } else if (!didCancel) {
        onChange(uri);
      }
    });
  };

  render() {
    const { color, size, imageUri } = this.props;

    const viewSizeStyle = getViewDimensions(size);
    const editSizeStyle = getEditDimensions(size);

    return (
      <TouchableItem
        onPress={this.onPress}
        style={[styles.shadowCircle, viewSizeStyle]}
      >
        {!imageUri && <Text style={[styles.plus, { color }]}>+</Text>}
        {imageUri && <Image source={{ uri: imageUri }} style={viewSizeStyle} />}
        {imageUri && (
          <View style={[styles.shadowCircle, styles.edit, editSizeStyle]}>
            <Text>E</Text>
          </View>
        )}
      </TouchableItem>
    );
  }
}

function getViewDimensions(size) {
  return {
    width: size,
    height: size,
    borderRadius: size / 2,
  };
}

function getEditDimensions(size) {
  return {
    width: size / 3,
    height: size / 3,
    borderRadius: size / 3 / 2,
    right: -size / 3 / 3,
  };
}

const styles = StyleSheet.create({
  shadowCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  plus: {
    fontSize: 26,
    lineHeight: 26,
    fontWeight: '500',
  },
  edit: {
    position: 'absolute',
    top: 0,
  },
});
