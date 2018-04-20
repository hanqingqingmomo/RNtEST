// @flow

import React, { Component } from 'react';
import { WhitePortal, BlackPortal } from 'react-native-portal';
import { TextInput, FlatList, Alert, Platform } from 'react-native';
import { showImagePicker } from 'react-native-image-picker';
import { type NavigationScreenConfigProps } from 'react-navigation';

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
};

const USERS = [
  {
    id: '0',
    button: true,
  },
  {
    id: 'b520ce3ed232',
    first_name: 'Roberto',
    last_name: 'Planto',
    email: 'robertop@email.com',
    profile_photo:
      'https://d2qn6shxhjvtsw.cloudfront.net/member_photos/150555/thumb/image.jpg?1508590682',
  },
  {
    id: 'b520ce3ed233',
    first_name: 'Roberto',
    last_name: 'Planto',
    email: 'robertop@email.com',
    profile_photo:
      'https://d2qn6shxhjvtsw.cloudfront.net/member_photos/150555/thumb/image.jpg?1508590682',
  },
  {
    id: 'b520ce3ed234',
    first_name: 'Roberto',
    last_name: 'Planto',
    email: 'robertop@email.com',
    profile_photo:
      'https://d2qn6shxhjvtsw.cloudfront.net/member_photos/150555/thumb/image.jpg?1508590682',
  },
  {
    id: 'b520ce3ed235',
    first_name: 'Roberto',
    last_name: 'Planto',
    email: 'robertop@email.com',
    profile_photo:
      'https://d2qn6shxhjvtsw.cloudfront.net/member_photos/150555/thumb/image.jpg?1508590682',
  },
  {
    id: 'b520ce3ed236',
    first_name: 'Roberto',
    last_name: 'Planto',
    email: 'robertop@email.com',
    profile_photo:
      'https://d2qn6shxhjvtsw.cloudfront.net/member_photos/150555/thumb/image.jpg?1508590682',
  },
  {
    id: 'b520ce3ed237',
    first_name: 'Roberto',
    last_name: 'Planto',
    email: 'robertop@email.com',
    profile_photo:
      'https://d2qn6shxhjvtsw.cloudfront.net/member_photos/150555/thumb/image.jpg?1508590682',
  },
  {
    id: 'b520ce3ed238',
    first_name: 'Roberto',
    last_name: 'Planto',
    email: 'robertop@email.com',
    profile_photo:
      'https://d2qn6shxhjvtsw.cloudfront.net/member_photos/150555/thumb/image.jpg?1508590682',
  },
];

const COMUNITIES = [
  {
    id: '0',
    button: true,
  },
  {
    id: '5c4b12e77d0b',
    name: 'Test communitasdasdy',
    cover_photo:
      'https://api-testing.poweredbyaction.org/assets/cover_photos/boytelescope.jpg',
  },
  {
    id: '5c4b12e77d0C',
    name: 'Test communitasdasdy',
    cover_photo:
      'https://api-testing.poweredbyaction.org/assets/cover_photos/boytelescope.jpg',
  },
  {
    id: '5c4b12e77d0d',
    name: 'Test communitasdasdy',
    cover_photo:
      'https://api-testing.poweredbyaction.org/assets/cover_photos/boytelescope.jpg',
  },
  {
    id: '5c4b12e77d0e',
    name: 'Test communitasdasdy',
    cover_photo:
      'https://api-testing.poweredbyaction.org/assets/cover_photos/boytelescope.jpg',
  },
  {
    id: '5c4b12e77d0f',
    name: 'Test communitasdasdy',
    cover_photo:
      'https://api-testing.poweredbyaction.org/assets/cover_photos/boytelescope.jpg',
  },
  {
    id: '5c4b12e77d1b',
    name: 'Test communitasdasdy',
    cover_photo:
      'https://api-testing.poweredbyaction.org/assets/cover_photos/boytelescope.jpg',
  },
  {
    id: '5c4b12e77d2b',
    name: 'Test communitasdasdy',
    cover_photo:
      'https://api-testing.poweredbyaction.org/assets/cover_photos/boytelescope.jpg',
  },
  {
    id: '5c4b12e77d3b',
    name: 'Test communitasdasdy',
    cover_photo:
      'https://api-testing.poweredbyaction.org/assets/cover_photos/boytelescope.jpg',
  },
  {
    id: '5c4b12e77d4b',
    name: 'Test communitasdasdy',
    cover_photo:
      'https://api-testing.poweredbyaction.org/assets/cover_photos/boytelescope.jpg',
  },
  {
    id: '5c4b12e77d5b',
    name: 'Test communitasdasdy',
    cover_photo:
      'https://api-testing.poweredbyaction.org/assets/cover_photos/boytelescope.jpg',
  },
];

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
            style={{ flex: 1, padding: 0, paddingRight: 15 }}
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
    <View key={community.id} style={{ paddingHorizontal: 2 }}>
      <Pill color="orange" title={community.name} truncate />
    </View>
  ));

  if (commuities.length > max) {
    array.push(
      <View key={commuities.length} style={{ paddingHorizontal: 2 }}>
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

  _onCreteEvent = () => {
    console.log('create event');
  };

  _onSubmit = () => {
    console.log('submit');
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
    formik: any
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
      case 'atendees':
        this.props.navigation.navigate('AtendeesCommunitiesScreen', { formik });
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
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text
                          color={getColor('gray')}
                          style={{ flex: 1, paddingRight: 2 }}
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
                    contentContainerStyle={{
                      paddingLeft: 15,
                      paddingRight: 15,
                    }}
                    cellContentView={
                      <View style={{ flexDirection: 'row' }}>
                        <FlatList
                          data={USERS}
                          renderItem={({ item }) =>
                            item.button ? (
                              <InviteButton
                                title="Add"
                                onPress={() => {
                                  this._onCellPress('presenters', formik);
                                }}
                              />
                            ) : (
                              <UserPreview {...item} />
                            )}
                          keyExtractor={(item, index) => item.id}
                          ItemSeparatorComponent={() => (
                            <View style={{ width: 15 }} />
                          )}
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
                    contentContainerStyle={{
                      paddingLeft: 15,
                      paddingRight: 15,
                    }}
                    cellContentView={
                      <View style={{ flexDirection: 'row' }}>
                        <FlatList
                          data={COMUNITIES}
                          renderItem={({ item }) =>
                            item.button ? (
                              <InviteButton
                                title="Add"
                                onPress={() => {
                                  this._onCellPress('atendees', formik);
                                }}
                              />
                            ) : (
                              <CommunityPreview {...item} />
                            )}
                          keyExtractor={(item, index) => item.id}
                          ItemSeparatorComponent={() => (
                            <View style={{ width: 15 }} />
                          )}
                          horizontal
                        />
                      </View>
                    }
                  />
                </TableView.Section>

                <TableView.Section footer="Attendees will have the option to enter without logging in">
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
