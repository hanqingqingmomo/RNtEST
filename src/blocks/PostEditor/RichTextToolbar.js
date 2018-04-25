// @flow

import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  StyleSheet,
} from 'react-native';
import {
  RichTextToolbar as RNRichTextToolbar,
  actions,
} from 'react-native-zss-rich-text-editor';

import Icon from '../../atoms/Icon/Icon';

const TOOLBAR_ACTIONS = [
  actions.setBold,
  actions.setItalic,
  actions.heading1,
  actions.heading2,
  actions.setParagraph,
  actions.insertOrderedList,
  actions.insertBulletsList,
];

const ICONS = {
  [actions.setBold]: 'text-editor-2',
  [actions.setItalic]: 'text-editor-3',
  [actions.heading1]: 'text-editor-4',
  [actions.heading2]: 'text-editor-5',
  [actions.setParagraph]: 'text-editor-6',
  [actions.insertOrderedList]: 'text-editor-7',
  [actions.insertBulletsList]: 'text-editor-8',
};

const ICON_WIDTH = Dimensions.get('window').width / TOOLBAR_ACTIONS.length;

export type RichTextToolbarProps = {
  getEditor: Function,
  actions?: $Values<actions>,
  onPressAddLink?: Function,
  onPressAddImage?: Function,
  selectedButtonStyle?: Object | number,
  iconTint?: any,
  selectedIconTint?: any,
  unselectedButtonStyle?: Object,
  renderAction?: Function,
  iconMap?: { [key: $Values<actions>]: any },
  style?: Object | number,
};

export class RichTextToolbar extends Component<RichTextToolbarProps> {
  _onPress = (action: $Values<actions>) => {
    switch (action) {
      case actions.setBold:
      case actions.setItalic:
      case actions.insertBulletsList:
      case actions.insertOrderedList:
      case actions.setUnderline:
      case actions.heading1:
      case actions.heading2:
      case actions.heading3:
      case actions.heading4:
      case actions.heading5:
      case actions.heading6:
      case actions.setParagraph:
      case actions.removeFormat:
      case actions.alignLeft:
      case actions.alignCenter:
      case actions.alignRight:
      case actions.alignFull:
      case actions.setSubscript:
      case actions.setSuperscript:
      case actions.setStrikethrough:
      case actions.setHR:
      case actions.setIndent:
      case actions.setOutdent:
        this.refs.toolbarRef.state.editor._sendAction(action);
        break;
      default:
    }
  };

  _renderAction = (action: $Values<actions>, selected: boolean) => {
    return (
      <TouchableOpacity onPress={() => this._onPress(action)}>
        <View style={styles.button}>
          <Icon
            name={ICONS[action]}
            color={selected ? '#FD612D' : '#B0BEC5'}
            size={24}
          />
        </View>
      </TouchableOpacity>
    );
  };

  render(): React$Node {
    return (
      <RNRichTextToolbar
        ref="toolbarRef"
        actions={TOOLBAR_ACTIONS}
        renderAction={this._renderAction}
        style={styles.toolbar}
        {...this.props}
      />
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(117,121,128)',
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 10 },
      },
      android: {
        borderRadius: 0,
        borderTopWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(117,121,128,0.2)',
      },
    }),
  },
  button: {
    height: 50,
    width: ICON_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
