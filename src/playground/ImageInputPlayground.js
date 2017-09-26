// @flow
import React, { Component } from 'react';

import { CenterView, ImageInput } from '../atoms';

type S = {
  imageUri: ?string,
};

export default class ImageInputPlayground extends Component<*, *, S> {
  static navigationOptions = { title: 'Image input' };

  state = { imageUri: null };

  onChange = (imageUri: string) => {
    this.setState({ imageUri });
  };

  render() {
    const { imageUri } = this.state;
    return (
      <CenterView>
        <ImageInput
          color="red"
          size={70}
          title="Choose Profile Picture source"
          imageUri={imageUri}
          onChange={this.onChange}
        />
      </CenterView>
    );
  }
}
