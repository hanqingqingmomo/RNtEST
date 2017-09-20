// @flow
import React, { Component } from 'react';
import { CenterView } from '../atoms';

type S = {
  imageUri: ?string,
};

export default class ImageInputScreen extends Component<*, *, S> {
  state = {
    imageUri: null,
  };

  onChange = (imageUri: string) => {
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
