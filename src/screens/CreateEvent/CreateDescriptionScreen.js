// @flow

import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { WhitePortal, BlackPortal } from 'react-native-portal';
import { type NavigationScreenConfigProps } from 'react-navigation';

import { Screen, NavigationTextButton } from '../../atoms';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';

const SAVE_BUTTON_ID = 'CreateEvent:SaveButton';

type State = {
  text: string,
};

// TODO treba pridat Rich Editor

export default class CreateDescriptionScreen extends Component<
  NavigationScreenConfigProps,
  State
> {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <WhitePortal name={SAVE_BUTTON_ID} />,
  });

  state = {
    text: '',
  };

  render() {
    const { formik } = this.props.navigation.state.params;

    return (
      <Screen style={css('padding', 15)}>
        <BlackPortal name={SAVE_BUTTON_ID}>
          <NavigationTextButton
            disabled={!this.state.text}
            title="Save"
            textColor={getColor('orange')}
            onPress={() => {
              formik.setFieldValue('description', this.state.text);

              this.props.navigation.goBack();
            }}
          />
        </BlackPortal>

        <TextInput
          placeholder="What is your webinar about?"
          placeholderTextColor="#B0BEC5"
          multiline
          underlineColorAndroid="transparent"
          onChangeText={(text: string) => {
            this.setState({ text });
          }}
        />
      </Screen>
    );
  }
}
