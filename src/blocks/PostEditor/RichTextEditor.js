// @flow

import React, { Component } from 'react';
import { Platform, Animated } from 'react-native';
import { RichTextEditor as RNRichTextEditor } from 'react-native-zss-rich-text-editor';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { RichTextToolbar } from './RichTextToolbar';

export type RichTextEditorProps = {
  initialTitleHTML?: string,
  initialContentHTML?: string,
  titlePlaceholder?: string,
  contentPlaceholder?: string,
  editorInitializedCallback?: Function,
  customCSS?: string,
  hiddenTitle?: boolean,
  enableOnChange?: boolean,
  footerHeight?: number,
  contentInset?: Object,
};

type State = {
  opacityAnim: any,
};

const CUSTOM_CSS = `
  * {
    box-sizing: border-box;
  }

  body {
    padding: 15px;
    font-size: 14px;
  }

  #zss_editor_content,
  #zss_editor_title,
  #separatorContainer {
    padding: 0;
  }

  div.zss_editor_title {
    font-size: 2Opx;
  }

  div.zss_editor_title,
  div.zss_editor_title * {
    line-height: 1.5;
    margin: 0;
    padding: 0;
  }

  p {
    font-size: 14px;
  }

  h1 {
    font-size: 20px;
    font-weight: bold;
  }

  h2 {
    font-size: 18px;
  }
`;

export class RichTextEditor extends Component<RichTextEditorProps, State> {
  state = {
    opacityAnim: new Animated.Value(0),
  };

  get spacing(): number {
    if (Platform.OS === 'ios') {
      return 0;
    }

    return -100000;
  }

  endLoading = () => {
    Animated.timing(this.state.opacityAnim, {
      toValue: 1,
      duration: 10,
    }).start();
  };

  render() {
    let { opacityAnim } = this.state;

    return (
      <Animated.View
        style={{ flex: 1, opacity: opacityAnim, backgroundColor: 'white' }}
      >
        <RNRichTextEditor
          ref="richtext"
          editorInitializedCallback={() => {
            this.refs.richtext.setEditorHeight(-1);

            this.endLoading();
          }}
          style={{}}
          customCSS={CUSTOM_CSS}
          {...this.props}
        />

        <RichTextToolbar getEditor={() => this.refs.richtext} />

        <KeyboardSpacer topSpacing={this.spacing} />
      </Animated.View>
    );
  }
}
