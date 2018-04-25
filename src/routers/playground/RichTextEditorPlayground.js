import React, { Component } from 'react';

import { RichTextEditor } from '../../blocks/PostEditor/RichTextEditor';

type P = {};

export default class RichTextEditorPlayground extends Component<P> {
  static navigationOptions = { title: 'Rich Text Editor' };
  render() {
    return (
      <RichTextEditor
        initialTitleHTML="Title"
        initialContentHTML="Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>"
      />
    );
  }
}
