// @flow

import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { showImagePicker } from 'react-native-image-picker';

import { Text, View, TouchableOpacity, Icon } from '../../atoms';

type Props = {
  image: ?string,
  onImageSelected: (uri: string) => mixed,
};

const IMAGE_PICKER_OPTIONS = {
  title: 'Choose Photo',
  takePhotoButtonTitle: 'Take Photo',
  chooseFromLibraryButtonTitle: 'Choose from Library',
  mediaType: 'photo',
  noData: true,
  storageOptions: {
    skipBackup: true,
  },
};

export default class EditorToolbar extends React.Component<Props> {
  openFilePicker = () => {
    showImagePicker(IMAGE_PICKER_OPTIONS, response => {
      const { error, didCancel, uri } = response;
      if (error) {
        Alert.alert('Error', error);
      } else if (!didCancel) {
        this.props.onImageSelected(uri);
      }
    });
  };

  render() {
    return (
      <Collapsible collapsed={this.props.image !== null}>
        <TouchableOpacity onPress={this.openFilePicker}>
          <View style={styles.container}>
            <Icon name="plus" color="#999" size={20} style={styles.icon} />
            <Text color="#333" size={14} style={styles.text}>
              Add media
            </Text>
          </View>
        </TouchableOpacity>
      </Collapsible>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    marginLeft: 15,
    borderColor: '#ECEFF1',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  icon: {
    marginLeft: -10,
  },
  text: {
    marginLeft: 15,
  },
});
