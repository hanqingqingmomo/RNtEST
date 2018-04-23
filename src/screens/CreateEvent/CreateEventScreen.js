// @flow

import React, { Component } from 'react';
import { WhitePortal, BlackPortal } from 'react-native-portal';
import { TextInput, FlatList, Alert, Platform } from 'react-native';
import { showImagePicker } from 'react-native-image-picker';
import { type NavigationScreenConfigProps } from 'react-navigation';
import { isIphoneX } from 'react-native-iphone-x-helper';

import {
  Screen,
  NavigationTextButton,
  Form,
  TableView,
  FormField,
  View,
  Text,
  Pill,
} from '../../atoms';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';
import { InviteButton, PhotoButton } from './Buttons';
import { UserPreview, CommunityPreview } from './Previews';
import {
  SettingsCell,
  PrivacyCell,
  SharingCell,
  SurveyCell,
  DatePickerCell,
  DateCell,
} from './Cells';
import type { Community } from '../../Types';
import type { Contact } from './SelectContactsScreen';

type Props = NavigationScreenConfigProps;

type State = {
  selectedField: string,
};

const SCHEDULE_BUTTON_ID = 'CreateEvent:ScheduleButton';

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
  cover_photo: '',
  post_in: [],
  start: new Date(),
  end: new Date(),
  atendees_communities: [],
  atendees_contacts: [],
  presenters_communities: [],
  presenters_contacts: [],
};

const IMAGE_PICKER_OPTIONS = {
  title: 'Choose Photo',
  takePhotoButtonTitle: 'Take Photo',
  chooseFromLibraryButtonTitle: 'Choose from Library',
  mediaType: 'photo',
  noData: true,
  storageOptions: {
    skipBackup: true,
  },
};

function _renderInput({ name, placeholder }) {
  return (
    <FormField
      name={name}
      render={({ field, form }) => {
        return (
          <TextInput
            value={field.value}
            placeholder={placeholder}
            placeholderTextColor={getColor('gray')}
            onChangeText={(text: string) => {
              form.setFieldValue(field.name, text);
            }}
            underlineColorAndroid="transparent"
            style={[css('flex', 1), css('padding', 0), css('paddingRight', 15)]}
          />
        );
      }}
    />
  );
}

function _renderPills(commuities: Array<Object>, max: number): React$Node {
  const comms = [...commuities];
  comms.splice(0 + max);

  const array = comms.map((community: Object, index: number): React$Node => (
    <View key={community.id} style={css('paddingHorizontal', 2)}>
      <Pill color="orange" title={community.name} truncate />
    </View>
  ));

  if (commuities.length > max) {
    array.push(
      <View key={commuities.length} style={css('paddingHorizontal', 2)}>
        <Pill color="orange" title={`+${commuities.length - max}`} />
      </View>
    );
  }

  return array;
}

export default class CreateEventScreen extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <WhitePortal name={SCHEDULE_BUTTON_ID} />,
  });

  state = {
    selectedField: '',
  };

  _onSubmit = values => {
    if (__DEV__) {
      console.log('[Create Event] submit', values);
    }
  };

  openFilePicker = (formik: Object) => {
    showImagePicker(IMAGE_PICKER_OPTIONS, response => {
      const { error, didCancel, uri } = response;

      if (error) {
        Alert.alert('Error', error);
      } else if (!didCancel) {
        formik.setFieldValue('cover_photo', uri);
      }
    });
  };

  _onCellPress = (
    field:
      | 'description'
      | 'location'
      | 'post_in'
      | 'start'
      | 'end'
      | 'photo'
      | 'atendees'
      | 'presenters',
    formik: mixed,
    data: mixed
  ) => {
    this.setState({ selectedField: field });

    switch (field) {
      case 'photo':
        this.openFilePicker(formik);
        break;
      case 'description':
        this.props.navigation.navigate('CreateDescriptionScreen', { formik });
        break;
      case 'location':
        this.props.navigation.navigate('SelectLocationScreen', { formik });
        break;
      case 'post_in':
        this.props.navigation.navigate('PostInScreen', { formik });
        break;
      case 'presenters':
      case 'atendees':
        this.props.navigation.navigate('SelectCommunitiesScreen', {
          formik,
          title: field === 'atendees' ? 'Add Atendees' : 'Add Presenters',
          contactsField: `${field}_contacts`,
          communitiesField: `${field}_communities`,
        });
        break;
      default:
    }
  };

  _keyExtractor(item: Community | Contact): string {
    return item.id || item.recordID;
  }

  _renderInviteItem(formik, key: 'presenters' | 'contacts') {
    return ({ item }: { item: Community | Contact }) =>
      item.id ? (
        <CommunityPreview
          {...item}
          onPress={() => {
            this.props.navigation.navigate('SelectMembersScreen', {
              formik,
              contactsField: `${key}_contacts`,
              communitiesField: `${key}_communities`,
              community: item,
            });
          }}
        />
      ) : (
        <UserPreview
          fullName={`${item.givenName}${item.middleName
            ? ` ${item.middleName}`
            : ''}${item.familyName ? ` ${item.familyName}` : ''}`}
          profilePhoto={item.thumbnailPath}
          onPress={() => {
            this.props.navigation.navigate('SelectContactsScreen', {
              formik,
              contactsField: `${key}_contacts`,
            });
          }}
        />
      );
  }

  render() {
    const { selectedField } = this.state;

    return (
      <Form
        initialValues={INITIAL_VALUES}
        validateOnChange
        onSubmit={this._onSubmit}
        render={formik => {
          return (
            <Screen containerStyle={css('paddingBottom', isIphoneX() ? 30 : 0)}>
              <BlackPortal name={SCHEDULE_BUTTON_ID}>
                <NavigationTextButton
                  title="Schedule"
                  textColor={getColor('orange')}
                  onPress={formik.handleSubmit}
                />
              </BlackPortal>

              <TableView.Table>
                <TableView.Section sectionPaddingTop={0}>
                  <TableView.Cell
                    cellContentView={_renderInput({
                      name: 'name',
                      placeholder: 'Title',
                    })}
                    cellAccessoryView={
                      <PhotoButton
                        name="cover_photo"
                        onPress={() => this._onCellPress('photo', formik)}
                      />
                    }
                  />
                  <TableView.Cell
                    title={formik.values.description || 'Description'}
                    titleTextColor={
                      formik.values.description ? '#455A64' : getColor('gray')
                    }
                    onPress={() => this._onCellPress('description', formik)}
                  />
                </TableView.Section>

                <TableView.Section header="event details">
                  <TableView.Cell
                    cellStyle="RightDetail"
                    title="Location"
                    detail={formik.values.location}
                    titleTextColor={getColor('gray')}
                    rightDetailColor="#455A64"
                    onPress={() => this._onCellPress('location', formik)}
                  />
                  <TableView.Cell
                    cellContentView={
                      <View
                        style={[css('flex', 1), css('flexDirection', 'row')]}
                      >
                        <Text
                          color={getColor('gray')}
                          style={[css('flex', 1), css('paddingRight', 1)]}
                        >
                          Post in
                        </Text>
                        {_renderPills(formik.values.post_in, 2)}
                      </View>
                    }
                    onPress={() => this._onCellPress('post_in', formik)}
                    accessory="DisclosureIndicator"
                  />
                </TableView.Section>

                <TableView.Section header="duration">
                  <DateCell
                    title="Starts"
                    onPress={() => this._onCellPress('start')}
                    value={formik.values.start}
                  />
                  <DatePickerCell
                    open={selectedField === 'start'}
                    date={formik.values.start}
                    onDateChange={(date: Date) => {
                      if (Platform.OS === 'android') {
                        this.setState({ selectedField: '' });
                      }
                      formik.setFieldValue('start', date);
                    }}
                  />

                  <DateCell
                    title="Ends"
                    onPress={() => this._onCellPress('end')}
                    value={formik.values.end}
                  />
                  <DatePickerCell
                    open={selectedField === 'end'}
                    date={formik.values.end}
                    onDateChange={(date: Date) => {
                      if (Platform.OS === 'android') {
                        this.setState({ selectedField: '' });
                      }
                      formik.setFieldValue('end', date);
                    }}
                  />
                </TableView.Section>

                <TableView.Section header="presenters">
                  <TableView.Cell
                    contentContainerStyle={[
                      css('paddingLeft', 0),
                      css('paddingRight', 0),
                    ]}
                    cellContentView={
                      <View style={css('flexDirection', 'row')}>
                        <FlatList
                          data={[
                            ...formik.values.presenters_contacts,
                            ...formik.values.presenters_communities,
                          ]}
                          renderItem={this._renderInviteItem(
                            formik,
                            'presenters'
                          )}
                          keyExtractor={this._keyExtractor}
                          ItemSeparatorComponent={() => (
                            <View style={css('width', 15)} />
                          )}
                          ListHeaderComponent={
                            <InviteButton
                              title="Add"
                              onPress={() => {
                                this._onCellPress('presenters', formik);
                              }}
                            />
                          }
                          ListFooterComponent={
                            <View style={css('width', 15)} />
                          }
                          horizontal
                        />
                      </View>
                    }
                  />
                </TableView.Section>

                <TableView.Section
                  header="privacy"
                  footer="Webinar will be listed publicly"
                >
                  <PrivacyCell value="public" />
                  <PrivacyCell value="private" />
                </TableView.Section>

                <TableView.Section
                  header="atendees"
                  footer="Invite individually or entire community"
                >
                  <TableView.Cell
                    contentContainerStyle={[
                      css('paddingLeft', 0),
                      css('paddingRight', 0),
                    ]}
                    cellContentView={
                      <View style={css('flexDirection', 'row')}>
                        <FlatList
                          data={[
                            ...formik.values.atendees_contacts,
                            ...formik.values.atendees_communities,
                          ]}
                          renderItem={this._renderInviteItem(
                            formik,
                            'contacts'
                          )}
                          keyExtractor={this._keyExtractor}
                          ItemSeparatorComponent={() => (
                            <View style={css('width', 15)} />
                          )}
                          ListHeaderComponent={
                            <InviteButton
                              title="Invite"
                              onPress={() => {
                                this._onCellPress(
                                  'atendees',
                                  formik,
                                  () => formik.values
                                );
                              }}
                            />
                          }
                          ListFooterComponent={
                            <View style={css('width', 15)} />
                          }
                          horizontal
                        />
                      </View>
                    }
                  />
                </TableView.Section>

                <TableView.Section footer="Atendees will have the option to enter without logging in">
                  <SettingsCell
                    title="Allow atendee enter as a guest"
                    name="atendees_settings.allow_guest"
                  />
                </TableView.Section>

                <TableView.Section>
                  <SettingsCell
                    title="Atendees can see poll results"
                    name="atendees_settings.see_poll_results"
                  />
                </TableView.Section>

                <TableView.Section
                  header="questions &amp; answers"
                  footer="Atendees will be allowed to submit questions"
                >
                  <SurveyCell value={true} />
                  <SurveyCell value={false} />
                </TableView.Section>

                <TableView.Section header="sharing webcams &amp; mics">
                  <SharingCell value="presenters" />
                  <SharingCell value="everyone" />
                </TableView.Section>

                <TableView.Section header="advanced settings">
                  <SettingsCell
                    title="Record event"
                    name="settings.record_event"
                  />
                  <SettingsCell
                    title="Show chat in the recording"
                    name="settings.show_chat_in_recording"
                  />
                  <SettingsCell
                    title="Add event to Calendar"
                    name="settings.add_event_to_calnedar"
                  />
                  <SettingsCell
                    title="Send invitations via email"
                    name="settings.send_invitations_via_email"
                  />
                  <SettingsCell
                    title="Send reminders via email"
                    name="settings.send_reminders_via_email"
                  />
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
