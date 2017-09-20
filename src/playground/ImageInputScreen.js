// @flow
import React, { Component } from 'react';
import { CenterView, ImageInput } from '../atoms';

export default class ImageInputScreen extends Component<*, *, *> {
  state = {
    imageUri: null,
  };

  onChange = imageUri => {
    this.setState({ imageUri });
  };

  render() {
    // const { imageUri } = this.state;

    return (
      <CenterView>
        {/* <ImageInput
          color="red"
          size={70}
          title="Choose Profile Picture source"
          imageUri={imageUri}
          onChange={this.onChange}
        /> */}
      </CenterView>
    );
  }
}
