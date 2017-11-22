// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { TextField } from 'react-native-material-textfield';

import { getColor } from '../utils/color';

// eslint-disable-next-line no-use-before-define
export default function TextInput(props: Props) {
  return (
    <TextField
      fontSize={18}
      labelFontSize={12}
      titleFontSize={12}
      baseColor={getColor('gray')}
      tintColor={getColor('gray')}
      textColor="#455A64"
      errorColor="#FF0000"
      {...styles}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    marginBottom: -4,
    paddingTop: 28,
  },
  labelTextStyle: {
    transform: [{ translateY: -5 }],
  },
});

type ViewPropTypes = {
  label?: string,
  title?: string,
};

export type Props = ViewPropTypes & {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters',
  autoCorrect?: boolean,
  spellCheck?: boolean,
  autoFocus?: boolean,
  autoGrow?: boolean,
  editable?: boolean,
  keyboardType?:  // Cross-platform
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    // iOS-only
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search',

  keyboardAppearance?: 'default' | 'light' | 'dark',
  returnKeyType?:  // Cross-platform
    | 'done'
    | 'go'
    | 'next'
    | 'search'
    | 'send'
    // Android-only
    | 'none'
    | 'previous'
    // iOS-only
    | 'default'
    | 'emergency-call'
    | 'google'
    | 'join'
    | 'route'
    | 'yahoo',
  returnKeyLabel?: string,
  maxLength?: number,
  maxHeight?: number,
  numberOfLines?: number,
  disableFullscreenUI?: boolean,
  enablesReturnKeyAutomatically?: boolean,
  multiline?: boolean,
  textBreakStrategy?: 'simple' | 'highQuality' | 'balanced',
  onBlur?: Function,
  onFocus?: Function,
  onChange?: Function,
  onChangeText?: string => void,
  onContentSizeChange?: ({
    nativeEvent: { contentSize: { width: number, height: number } },
  }) => void,
  onEndEditing?: Function,
  onSelectionChange?: ({
    nativeEvent: { selection: { start: number, end: number } },
  }) => void,
  onSubmitEditing?: Function,
  onKeyPress?: ({ nativeEvent: { key: string } }) => void,
  onLayout?: ({ x: number, y: number, width: number, height: number }) => void,
  onScroll?: ({
    nativeEvent: { contentOffset: { x: number, y: number } },
  }) => void,
  placeholderTextColor?: string,
  secureTextEntry?: boolean,
  selectionColor?: string,
  selectionState?: any,
  selection?: {
    start: number,
    end: ?number,
  },
  value?: string,
  defaultValue?: string,
  clearButtonMode?: 'never' | 'while-editing' | 'unless-editing' | 'always',
  clearTextOnFocus?: boolean,
  selectTextOnFocus?: boolean,
  blurOnSubmit?: boolean,
  style?: any,
  underlineColorAndroid?: string,
  inlineImageLeft?: string,
  inlineImagePadding?: number,
  dataDetectorTypes?:
    | 'phoneNumber'
    | 'link'
    | 'address'
    | 'calendarEvent'
    | 'none'
    | 'all',
  caretHidden?: boolean,
};
