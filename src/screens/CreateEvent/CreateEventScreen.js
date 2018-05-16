// @flow

import React, { Component } from 'react';
import { WhitePortal, BlackPortal } from 'react-native-portal';
import {
  TextInput,
  FlatList,
  Alert,
  Platform,
  DeviceEventEmitter,
} from 'react-native';
import { showImagePicker } from 'react-native-image-picker';
import {
  type NavigationScreenConfigProps,
  NavigationActions,
} from 'react-navigation';
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
  CenterView,
  ActivityIndicator,
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
import type { Community, User } from '../../Types';
import type { Contact } from './SelectContactsScreen';
import {
  createEvent,
  getEvent,
  deleteEvent,
  updateEvent,
} from '../../utils/requestFactory';

type Props = NavigationScreenConfigProps;

type State = {
  selectedField: string,
  busy: boolean,
  initialValues: Object,
};

type PayloadCommunity = {
  id: string,
  everyone: boolean,
  members: ?Array<string>,
};

type PayloadContact = {
  email: ?string,
  first_name: string,
  last_name: string,
  phone: ?string,
  profile_photo: string,
};

type CreateEventPayload = {
  name: string,
  description: string,
  cover_photo: string,
  location: string,
  post_in: Array<string>,
  start: Date,
  end: Date,
  presenters_communities: Array<PayloadCommunity>,
  presenters_contacts: Array<PayloadContact>,
  attendees_communities: Array<PayloadCommunity>,
  attendees_contacts: Array<PayloadContact>,
  privacy: 'public' | 'private',
  webinar: boolean,
  enable_survey: boolean,
  sharing_webcams: 'presenters' | 'everyone',
  record_event: boolean,
  show_chat_in_recording: boolean,
  add_event_to_calendar: boolean,
  send_invitations_via_email: boolean,
  send_reminders_via_email: boolean,
  allow_guest: boolean,
  see_poll_results: boolean,
};

const SCHEDULE_BUTTON_ID = 'CreateEvent:ScheduleButton';

const INITIAL_VALUES = {
  community_id: '81bad81ca2be',
  privacy: 'public',
  allow_guest: true,
  see_poll_results: true,
  enable_survey: true,
  sharing_webcams: 'presenters',
  record_event: true,
  show_chat_in_recording: false,
  add_event_to_calendar: true,
  send_invitations_via_email: true,
  send_reminders_via_email: true,
  cover_photo: '',
  post_in: [],
  start: new Date(),
  end: new Date(),
  attendees_communities: [],
  attendees_contacts: [],
  presenters_communities: [],
  presenters_contacts: [],
  webinar: false,
};

const RULES = {
  community_id: 'required',
  title: 'required',
  description: 'required',
  location: 'required',
  post_in: 'required|array',
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

function _renderInput({ name, placeholder, error }): React$Node {
  return (
    <FormField
      name={name}
      render={({ field, form }): React$Node => {
        return (
          <TextInput
            value={field.value}
            placeholder={placeholder}
            placeholderTextColor={error ? getColor('red') : getColor('gray')}
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

function _renderPills(
  commuities: Array<Object>,
  max: number
): Array<React$Node> {
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

function prepareCommunities(
  commuities: Array<Community & PayloadCommunity & { members: Array<User> }>
): Array<PayloadCommunity> {
  return commuities.map(
    (
      commuity: Community & PayloadCommunity & { members: Array<User> }
    ): PayloadCommunity => ({
      id: commuity.id,
      everyone: commuity.everyone,
      members: commuity.everyone
        ? null
        : commuity.members.map((member: User) => member.id),
    })
  );
}

function prepareContacts(contacts: Array<Contact>): Array<PayloadContact> {
  return contacts.map((contact: Contact): PayloadContact => {
    const emails = contact.emailAddresses;
    const phones = contact.phoneNumbers;

    return {
      email: emails.length ? emails[0].email || null : null,
      first_name: contact.givenName,
      last_name: contact.familyName,
      phone: phones.length ? phones[0].label || null : null,
      profile_photo: contact.thumbnailPath,
    };
  });
}

function preparePostIn(commuities: Array<Community>): Array<string> {
  return commuities.map((commuity: Community) => commuity.id);
}

function prepareSubmitData(values: Object): CreateEventPayload {
  values.presenters_communities = prepareCommunities(
    values.presenters_communities
  );
  values.attendees_communities = prepareCommunities(
    values.attendees_communities
  );
  values.presenters_contacts = prepareContacts(values.presenters_contacts);
  values.attendees_contacts = prepareContacts(values.attendees_contacts);
  values.post_in = preparePostIn(values.post_in);
  values.community_id = values.post_in[0];

  return values;
}

export default class CreateEventScreen extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      headerTitle: params && params.event_id ? 'Update Event' : 'Create Event',
      headerRight: <WhitePortal name={SCHEDULE_BUTTON_ID} />,
    };
  };

  state = {
    selectedField: '',
    busy: false,
    initialValues: INITIAL_VALUES,
  };

  componentWillMount() {
    this.fetch();
  }

  fetch = async () => {
    const { params } = this.props.navigation.state;

    if (params && !params.event_id) {
      return;
    }

    this.setState({ busy: true });

    try {
      const { data } = await getEvent(params.event_id);

      if (data.error) {
        throw new Error(data.error);
      }

      if (__DEV__) {
        console.log('[Create Event] fetch', data);
      }

      this.setState({ initialValues: data });
    } catch (err) {
      if (__DEV__) {
        console.log('[Create Event] fetch error', err.message);
      }
    } finally {
      this.setState({ busy: false });
    }
  };

  _onSubmit = async (values: Object) => {
    const { params } = this.props.navigation.state;

    this.setState({ busy: true });

    const data: CreateEventPayload = prepareSubmitData({ ...values });

    if (__DEV__) {
      console.log('[Create Event] submit', data);
    }

    try {
      if (params && params.event_id) {
        await updateEvent(params.event_id, data);

        DeviceEventEmitter.emit('update event', values);
      } else {
        await createEvent(data);

        DeviceEventEmitter.emit('create event', values);
      }

      this.props.screenProps.dismissModalRoute();
    } catch (err) {
      this.setState({ busy: false });

      if (__DEV__) {
        console.log('[Create Event] submit error', err.message);
      }
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
      | 'attendees'
      | 'presenters',
    formik: Object,
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
      case 'attendees':
        this.props.navigation.navigate('SelectCommunitiesScreen', {
          formik,
          title: field === 'attendees' ? 'Add Attendees' : 'Add Presenters',
          contactsField: `${field}_contacts`,
          communitiesField: `${field}_communities`,
        });
        break;
      default:
    }
  };

  _onDeleteEvent = async () => {
    const { navigation } = this.props;
    const { event_id } = navigation.state.params;

    this.setState({ busy: true });

    await deleteEvent(event_id);

    DeviceEventEmitter.emit('delete event', event_id);

    if (__DEV__) {
      console.log('[Delete Event]');
    }

    navigation.dispatch(NavigationActions.back({}));
    navigation.dispatch(NavigationActions.back({}));
  };

  _keyExtractor(item: Community & Contact): string {
    return item.id || item.recordID;
  }

  _renderInviteItem(formik, key: 'presenters' | 'contacts') {
    return ({ item }: { item: Community & Contact }) =>
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
    const { selectedField, busy, initialValues } = this.state;
    const { params } = this.props.navigation.state;

    return busy ? (
      <CenterView>
        <ActivityIndicator />
      </CenterView>
    ) : (
      <Form
        initialValues={initialValues}
        enableReinitialize
        rules={RULES}
        validateOnChange
        onSubmit={this._onSubmit}
        render={formik => {
          return (
            <Screen containerStyle={css('paddingBottom', isIphoneX() ? 30 : 0)}>
              <BlackPortal name={SCHEDULE_BUTTON_ID}>
                <NavigationTextButton
                  title={params && params.event_id ? 'Update' : 'Schedule'}
                  textColor={getColor('orange')}
                  onPress={formik.handleSubmit}
                />
              </BlackPortal>

              <TableView.Table>
                <TableView.Section sectionPaddingTop={0}>
                  <TableView.Cell
                    cellContentView={_renderInput({
                      name: 'title',
                      placeholder: 'Title',
                      error: formik.errors.title,
                    })}
                    // cellAccessoryView={
                    //   <PhotoButton
                    //     name="cover_photo"
                    //     onPress={() => this._onCellPress('photo', formik)}
                    //   />
                    // }
                  />
                  <TableView.Cell
                    title={(formik.values.description || 'Description').replace(
                      /<\/?[^>]+(>|$)/g,
                      ''
                    )}
                    titleTextColor={
                      formik.errors.description
                        ? getColor('red')
                        : formik.values.description
                          ? '#455A64'
                          : getColor('gray')
                    }
                    onPress={() => this._onCellPress('description', formik)}
                  />
                </TableView.Section>

                <TableView.Section header="event details">
                  <TableView.Cell
                    cellStyle="RightDetail"
                    title="Location"
                    detail={formik.values.location}
                    titleTextColor={
                      formik.errors.location
                        ? getColor('red')
                        : getColor('gray')
                    }
                    rightDetailColor="#455A64"
                    onPress={() => this._onCellPress('location', formik)}
                  />
                  <TableView.Cell
                    cellContentView={
                      <View
                        style={[css('flex', 1), css('flexDirection', 'row')]}
                      >
                        <Text
                          color={
                            formik.errors.post_in
                              ? getColor('red')
                              : getColor('gray')
                          }
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
                  header="attendees"
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
                            ...formik.values.attendees_contacts,
                            ...formik.values.attendees_communities,
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
                                  'attendees',
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

                <TableView.Section footer="Attendees will have the option to enter without logging in">
                  <SettingsCell
                    title="Allow atendee enter as a guest"
                    name="allow_guest"
                  />
                </TableView.Section>

                <TableView.Section>
                  <SettingsCell
                    title="Attendees can see poll results"
                    name="see_poll_results"
                  />
                </TableView.Section>

                <TableView.Section
                  header="questions &amp; answers"
                  footer="Attendees will be allowed to submit questions"
                >
                  <SurveyCell value={true} />
                  <SurveyCell value={false} />
                </TableView.Section>

                <TableView.Section header="sharing webcams &amp; mics">
                  <SharingCell value="presenters" />
                  <SharingCell value="everyone" />
                </TableView.Section>

                <TableView.Section header="advanced settings">
                  <SettingsCell title="Record event" name="record_event" />
                  <SettingsCell
                    title="Show chat in the recording"
                    name="show_chat_in_recording"
                  />
                  <SettingsCell
                    title="Add event to Calendar"
                    name="add_event_to_calendar"
                  />
                  <SettingsCell
                    title="Send invitations via email"
                    name="send_invitations_via_email"
                  />
                  <SettingsCell
                    title="Send reminders via email"
                    name="send_reminders_via_email"
                  />
                </TableView.Section>
              </TableView.Table>

              {params && params.event_id ? (
                <TableView.Section>
                  <TableView.Cell
                    title="Delete event"
                    titleTextColor={getColor('red')}
                    onPress={this._onDeleteEvent}
                  />
                </TableView.Section>
              ) : null}
            </Screen>
          );
        }}
      />
    );
  }
}
