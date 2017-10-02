// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { TextField } from 'react-native-material-textfield';

import { getColor } from '../utils/color';

export default function TextInput(props: Props) {
  return (
    <TextField
      fontSize={18}
      labelFontSize={12}
      titleFontSize={12}
      baseColor={getColor('gray')}
      tintColor={getColor('gray')}
      textColor="#455A64"
      errorColor={getColor('red')}
      inputContainerStyle={styles.inputContainerStyle}
      labelTextStyle={styles.labelTextStyle}
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
  label: string,
  title?: string,
};

export type Props = ViewPropTypes & {
  /**
   * Can tell `TextInput` to automatically capitalize certain characters.
   *
   * - `characters`: all characters.
   * - `words`: first letter of each word.
   * - `sentences`: first letter of each sentence (*default*).
   * - `none`: don't auto capitalize anything.
   */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters',
  /**
   * If `false`, disables auto-correct. The default value is `true`.
   */
  autoCorrect?: boolean,
  /**
   * If `false`, disables spell-check style (i.e. red underlines).
   * The default value is inherited from `autoCorrect`.
   * @platform ios
   */
  spellCheck?: boolean,
  /**
   * If `true`, focuses the input on `componentDidMount`.
   * The default value is `false`.
   */
  autoFocus?: boolean,
  /**
   * If true, will increase the height of the textbox if need be. If false,
   * the textbox will become scrollable once the height is reached. The
   * default value is false.
   * @platform android
   */
  autoGrow?: boolean,
  /**
   * If `false`, text is not editable. The default value is `true`.
   */
  editable?: boolean,
  /**
   * Determines which keyboard to open, e.g.`numeric`.
   *
   * The following values work across platforms:
   *
   * - `default`
   * - `numeric`
   * - `email-address`
   * - `phone-pad`
   */
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
  /**
   * Determines the color of the keyboard.
   * @platform ios
   */
  keyboardAppearance?: 'default' | 'light' | 'dark',
  /**
   * Determines how the return key should look. On Android you can also use
   * `returnKeyLabel`.
   *
   * *Cross platform*
   *
   * The following values work across platforms:
   *
   * - `done`
   * - `go`
   * - `next`
   * - `search`
   * - `send`
   *
   * *Android Only*
   *
   * The following values work on Android only:
   *
   * - `none`
   * - `previous`
   *
   * *iOS Only*
   *
   * The following values work on iOS only:
   *
   * - `default`
   * - `emergency-call`
   * - `google`
   * - `join`
   * - `route`
   * - `yahoo`
   */
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
  /**
   * Sets the return key to the label. Use it instead of `returnKeyType`.
   * @platform android
   */
  returnKeyLabel?: string,
  /**
   * Limits the maximum number of characters that can be entered. Use this
   * instead of implementing the logic in JS to avoid flicker.
   */
  maxLength?: number,
  /**
   * If autogrow is `true`, limits the height that the TextInput box can grow
   * to. Once it reaches this height, the TextInput becomes scrollable.
   */
  maxHeight?: number,
  /**
   * Sets the number of lines for a `TextInput`. Use it with multiline set to
   * `true` to be able to fill the lines.
   * @platform android
   */
  numberOfLines?: number,
  /**
   * When `false`, if there is a small amount of space available around a text input
   * (e.g. landscape orientation on a phone), the OS may choose to have the user edit
   * the text inside of a full screen text input mode. When `true`, this feature is
   * disabled and users will always edit the text directly inside of the text input.
   * Defaults to `false`.
   * @platform android
   */
  disableFullscreenUI?: boolean,
  /**
   * If `true`, the keyboard disables the return key when there is no text and
   * automatically enables it when there is text. The default value is `false`.
   * @platform ios
   */
  enablesReturnKeyAutomatically?: boolean,
  /**
   * If `true`, the text input can be multiple lines.
   * The default value is `false`.
   */
  multiline?: boolean,
  /**
   * Set text break strategy on Android API Level 23+, possible values are `simple`, `highQuality`, `balanced`
   * The default value is `simple`.
   * @platform android
   */
  textBreakStrategy?: 'simple' | 'highQuality' | 'balanced',
  /**
   * Callback that is called when the text input is blurred.
   */
  onBlur?: Function,
  /**
   * Callback that is called when the text input is focused.
   */
  onFocus?: Function,
  /**
   * Callback that is called when the text input's text changes.
   */
  onChange?: Function,
  /**
   * Callback that is called when the text input's text changes.
   * Changed text is passed as an argument to the callback handler.
   */
  onChangeText?: string => void,
  /**
   * Callback that is called when the text input's content size changes.
   * This will be called with
   * `{ nativeEvent: { contentSize: { width, height } } }`.
   *
   * Only called for multiline text inputs.
   */
  onContentSizeChange?: ({
    nativeEvent: { contentSize: { width: number, height: number } },
  }) => void,
  /**
   * Callback that is called when text input ends.
   */
  onEndEditing?: Function,
  /**
   * Callback that is called when the text input selection is changed.
   * This will be called with
   * `{ nativeEvent: { selection: { start, end } } }`.
   */
  onSelectionChange?: ({
    nativeEvent: { selection: { start: number, end: number } },
  }) => void,
  /**
   * Callback that is called when the text input's submit button is pressed.
   * Invalid if `multiline={true}` is specified.
   */
  onSubmitEditing?: Function,
  /**
   * Callback that is called when a key is pressed.
   * This will be called with `{ nativeEvent: { key: keyValue } }`
   * where `keyValue` is `'Enter'` or `'Backspace'` for respective keys and
   * the typed-in character otherwise including `' '` for space.
   * Fires before `onChange` callbacks.
   * @platform ios
   */
  onKeyPress?: ({ nativeEvent: { key: string } }) => void,
  /**
   * Invoked on mount and layout changes with `{x, y, width, height}`.
   */
  onLayout?: ({ x: number, y: number, width: number, height: number }) => void,
  /**
   * Invoked on content scroll with `{ nativeEvent: { contentOffset: { x, y } } }`.
   * May also contain other properties from ScrollEvent but on Android contentSize
   * is not provided for performance reasons.
   */
  onScroll?: ({
    nativeEvent: { contentOffset: { x: number, y: number } },
  }) => void,
  /**
   * The string that will be rendered before text input has been entered.
   */
  // placeholder?: any,
  /**
   * The text color of the placeholder string.
   */
  placeholderTextColor?: string,
  /**
   * If `true`, the text input obscures the text entered so that sensitive text
   * like passwords stay secure. The default value is `false`.
   */
  secureTextEntry?: boolean,
  /**
   * The highlight and cursor color of the text input.
   */
  selectionColor?: string,
  /**
   * An instance of `DocumentSelectionState`, this is some state that is responsible for
   * maintaining selection information for a document.
   *
   * Some functionality that can be performed with this instance is:
   *
   * - `blur()`
   * - `focus()`
   * - `update()`
   *
   * > You can reference `DocumentSelectionState` in
   * > [`vendor/document/selection/DocumentSelectionState.js`](https://github.com/facebook/react-native/blob/master/Libraries/vendor/document/selection/DocumentSelectionState.js)
   *
   * @platform ios
   */
  selectionState?: any,
  /**
   * The start and end of the text input's selection. Set start and end to
   * the same value to position the cursor.
   */
  selection?: {
    start: number,
    end: ?number,
  },
  /**
   * The value to show for the text input. `TextInput` is a controlled
   * component, which means the native value will be forced to match this
   * value prop if provided. For most uses, this works great, but in some
   * cases this may cause flickering - one common cause is preventing edits
   * by keeping value the same. In addition to simply setting the same value,
   * either set `editable={false}`, or set/update `maxLength` to prevent
   * unwanted edits without flicker.
   */
  value?: string,
  /**
   * Provides an initial value that will change when the user starts typing.
   * Useful for simple use-cases where you do not want to deal with listening
   * to events and updating the value prop to keep the controlled state in sync.
   */
  defaultValue?: string,
  /**
   * When the clear button should appear on the right side of the text view.
   * @platform ios
   */
  clearButtonMode?: 'never' | 'while-editing' | 'unless-editing' | 'always',
  /**
   * If `true`, clears the text field automatically when editing begins.
   * @platform ios
   */
  clearTextOnFocus?: boolean,
  /**
   * If `true`, all text will automatically be selected on focus.
   */
  selectTextOnFocus?: boolean,
  /**
   * If `true`, the text field will blur when submitted.
   * The default value is true for single-line fields and false for
   * multiline fields. Note that for multiline fields, setting `blurOnSubmit`
   * to `true` means that pressing return will blur the field and trigger the
   * `onSubmitEditing` event instead of inserting a newline into the field.
   */
  blurOnSubmit?: boolean,
  /**
   * Note that not all Text styles are supported,
   * see [Issue#7070](https://github.com/facebook/react-native/issues/7070)
   * for more detail.
   *
   * [Styles](docs/style.html)
   */
  style?: any,
  /**
   * The color of the `TextInput` underline.
   * @platform android
   */
  underlineColorAndroid?: string,
  /**
   * If defined, the provided image resource will be rendered on the left.
   * The image resource must be inside `/android/app/src/main/res/drawable` and referenced
   * like
   * ```
   * <TextInput
   *  inlineImageLeft='search_icon'
   * />
   * ```
   * @platform android
   */
  inlineImageLeft?: string,
  /**
   * Padding between the inline image, if any, and the text input itself.
   * @platform android
   */
  inlineImagePadding?: number,
  /**
   * Determines the types of data converted to clickable URLs in the text input.
   * Only valid if `multiline={true}` and `editable={false}`.
   * By default no data types are detected.
   *
   * You can provide one type or an array of many types.
   *
   * Possible values for `dataDetectorTypes` are:
   *
   * - `'phoneNumber'`
   * - `'link'`
   * - `'address'`
   * - `'calendarEvent'`
   * - `'none'`
   * - `'all'`
   *
   * @platform ios
   */
  dataDetectorTypes?:
    | 'phoneNumber'
    | 'link'
    | 'address'
    | 'calendarEvent'
    | 'none'
    | 'all',
  /**
   * If `true`, caret is hidden. The default value is `false`.
   */
  caretHidden?: boolean,
};
