// @flow

import React, { Component } from 'react';
import { WhitePortal, BlackPortal } from 'react-native-portal';
import { type NavigationScreenConfigProps } from 'react-navigation';

import { Screen, NavigationTextButton } from '../../atoms';
import { getColor } from '../../utils/color';
import { RichTextEditor } from '../../blocks/PostEditor/RichTextEditor';

const SAVE_BUTTON_ID = 'CreateEvent:EditorSaveButton';
const FORMIK_FIELD = 'description';

export default class CreateDescriptionScreen extends Component<
  NavigationScreenConfigProps
> {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <WhitePortal name={SAVE_BUTTON_ID} />,
  });

  render() {
    const { formik } = this.props.navigation.state.params;

    return (
      <Screen fill>
        <BlackPortal name={SAVE_BUTTON_ID}>
          <NavigationTextButton
            title="Save"
            textColor={getColor('orange')}
            onPress={async () => {
              const content = await this.refs.editor.getContentHtml();

              formik.setFieldValue(FORMIK_FIELD, content);

              this.props.navigation.goBack();
            }}
          />
        </BlackPortal>

        <RichTextEditor
          ref="editor"
          hiddenTitle
          contentPlaceholder="What is your webinar about?"
          initialContentHTML={formik.values[FORMIK_FIELD]}
        />
      </Screen>
    );
  }
}
