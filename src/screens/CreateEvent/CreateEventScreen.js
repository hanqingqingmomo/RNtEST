// @flow

import React, { Component } from 'react';
import { WhitePortal, BlackPortal } from 'react-native-portal';
import { Switch } from 'react-native';

import { Screen, NavigationTextButton, Form, TableView } from '../../atoms';
import { getColor } from '../../utils/color';

type Props = {};

const SCHEDULE_BUTTON_ID = 'CreateEvent:ScheduleButton';
const LIGHT_GRAY = '#455A64';

const INITIAL_VALUES = {
  privacy: 'public',
  'atendees_settings.allow_guest': true,
  'atendees_settings.see_poll_results': true,
  enable_survey: true,
  sharing_webcams: 'presenters',
  'settings.record_event': true,
  'settings.show_chat_in_recording': false,
  'settings.add_event_to_calnedar': true,
  'settings.send_invitations_via_email': true,
  'settings.send_reminders_via_email': true,
};

function _renderPrivacyCell(
  formik: Object,
  value: 'public' | 'private'
): React$Node {
  return (
    <TableView.Cell
      title={value === 'public' ? 'Public' : 'Private'}
      accessory={formik.values.privacy === value ? 'Checkmark' : undefined}
      titleTextColor={
        formik.values.privacy === value ? LIGHT_GRAY : getColor('gray')
      }
      onPress={
        formik.values.privacy === value
          ? false
          : () => formik.setFieldValue('privacy', value)
      }
    />
  );
}

function _renderSurveyCell(formik: Object, value: boolean): React$Node {
  return (
    <TableView.Cell
      title={value ? 'On' : 'Off'}
      accessory={
        formik.values.enable_survey === value ? 'Checkmark' : undefined
      }
      titleTextColor={
        formik.values.enable_survey === value ? LIGHT_GRAY : getColor('gray')
      }
      onPress={
        formik.values.enable_survey === value
          ? false
          : () => formik.setFieldValue('enable_survey', value)
      }
    />
  );
}

function _renderSharingCell(
  formik: Object,
  value: 'presenters' | 'everyone'
): React$Node {
  return (
    <TableView.Cell
      title={value === 'presenters' ? 'Only presenters' : 'Everyone'}
      accessory={
        formik.values.sharing_webcams === value ? 'Checkmark' : undefined
      }
      titleTextColor={
        formik.values.sharing_webcams === value ? LIGHT_GRAY : getColor('gray')
      }
      onPress={
        formik.values.sharing_webcams === value
          ? false
          : () => formik.setFieldValue('sharing_webcams', value)
      }
    />
  );
}

function _renderSwitch(formik: Object, key: string): React$Node {
  return (
    <Switch
      value={formik.values[key]}
      onValueChange={(value: boolean) => {
        return formik.setFieldValue(key, value);
      }}
    />
  );
}

function _renderSettingsCell({ formik, title, key }): React$Node {
  return (
    <TableView.Cell
      title={title}
      cellAccessoryView={_renderSwitch(formik, key)}
    />
  );
}

export default class CreateEventScreen extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <WhitePortal name={SCHEDULE_BUTTON_ID} />,
  });

  _onCreteEvent = () => {
    console.log('create event');
  };

  _onSubmit = () => {
    console.log('submit');
  };

  _onCellPress = (
    field: 'description' | 'location' | 'post_in' | 'start' | 'end' | 'photo',
    data: any
  ) => {
    this.setState({ selectedField: field });

    switch (field) {
      case 'description':
        this.props.navigation.navigate('CreateDescriptionScreen', {
          formik: data,
        });
        break;
      default:
    }
  };

  render() {
    const { selectedField } = this.state;

    return (
      <Form
        initialValues={INITIAL_VALUES}
        validateOnChange
        onSubmit={this._onSubmit}
        render={formik => {
          return (
            <Screen>
              <BlackPortal name={SCHEDULE_BUTTON_ID}>
                <NavigationTextButton
                  title="Schedule"
                  textColor={getColor('orange')}
                  onPress={formik.handleSubmit}
                />
              </BlackPortal>

              <TableView.Table>
                <TableView.Section sectionPaddingTop={0}>
                  <TableView.Cell title="Title" />
                  <TableView.Cell
                    title={formik.values.description || 'Description'}
                    titleTextColor={
                      formik.values.description ? '#455A64' : getColor('gray')
                    }
                    onPress={() => this._onCellPress('description', formik)}
                  />
                </TableView.Section>

                <TableView.Section header="event details">
                  <TableView.Cell title="Location" />
                  <TableView.Cell title="Post in" />
                </TableView.Section>

                <TableView.Section header="duration">
                  <TableView.Cell />
                </TableView.Section>

                <TableView.Section header="presenters">
                  <TableView.Cell />
                </TableView.Section>

                <TableView.Section
                  header="privacy"
                  footer="Webinar will be listed publicly"
                >
                  {_renderPrivacyCell(formik, 'public')}
                  {_renderPrivacyCell(formik, 'private')}
                </TableView.Section>

                <TableView.Section footer="Attendees will have the option to enter without logging in">
                  {_renderSettingsCell({
                    formik,
                    title: 'Allow atendee enter as a guest',
                    key: 'atendees_settings.allow_guest',
                  })}
                </TableView.Section>

                <TableView.Section>
                  {_renderSettingsCell({
                    formik,
                    title: 'Atendees can see poll results',
                    key: 'atendees_settings.see_poll_results',
                  })}
                </TableView.Section>

                <TableView.Section
                  header="questions &amp; answers"
                  footer="Atendees will be allowed to submit questions"
                >
                  {_renderSurveyCell(formik, true)}
                  {_renderSurveyCell(formik, false)}
                </TableView.Section>

                <TableView.Section header="sharing webcams &amp; mics">
                  {_renderSharingCell(formik, 'presenters')}
                  {_renderSharingCell(formik, 'everyone')}
                </TableView.Section>

                <TableView.Section header="advanced settings">
                  {_renderSettingsCell({
                    formik,
                    title: 'Record event',
                    key: 'settings.record_event',
                  })}
                  {_renderSettingsCell({
                    formik,
                    title: 'Show chat in the recording',
                    key: 'settings.show_chat_in_recording',
                  })}
                  {_renderSettingsCell({
                    formik,
                    title: 'Add event to Calendar',
                    key: 'settings.add_event_to_calnedar',
                  })}
                  {_renderSettingsCell({
                    formik,
                    title: 'Send invitations via email',
                    key: 'settings.send_invitations_via_email',
                  })}
                  {_renderSettingsCell({
                    formik,
                    title: 'Send reminders via email',
                    key: 'settings.send_reminders_via_email',
                  })}
                </TableView.Section>
              </TableView.Table>

              <TableView.Section>
                <TableView.Cell
                  title="Delete event"
                  titleTextColor={getColor('red')}
                />
              </TableView.Section>
            </Screen>
          );
        }}
      />
    );
  }
}
