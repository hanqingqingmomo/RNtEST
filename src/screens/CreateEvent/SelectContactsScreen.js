// @flow

import React, { Component } from 'react';
import Contacts from 'react-native-contacts';
import { StyleSheet, InteractionManager, FlatList } from 'react-native';
import { type NavigationScreenConfigProps } from 'react-navigation';
import { connect } from 'react-redux';
import { Separator } from 'react-native-tableview-simple';
import { BlackPortal, WhitePortal } from 'react-native-portal';

import {
  Screen,
  TableView,
  Avatar,
  ActivityIndicator,
  CenterView,
  Icon,
  Text,
  SearchBox,
  NavigationTextButton,
  NavigationIconButton,
} from '../../atoms';
import { getColor } from '../../utils/color';
import { Checkmark } from './Checkmark';
type EmailDetail = {
  email: string,
  label: string,
};

type PhoneDetail = {
  label: string,
  number: string,
};

type Address = {
  city: string,
  country: string,
  label: string,
  postCode: string,
  region: string,
  state: string,
  street: string,
};

export type Contact = {
  company: string,
  emailAddresses: Array<EmailDetail>,
  phoneNumbers: Array<PhoneDetail>,
  familyName: string,
  givenName: string,
  hasThumbnail: boolean,
  jobTitle: string,
  middleName: string,
  recordID: string,
  thumbnailPath: string,
  postalAddresses: Array<Address>,
};

type State = {
  contacts: Array<Contact>,
  permission: 'undefined' | 'denied' | 'authorized',
  searchValue: string,
  selectedContacts: Array<Contact>,
};

class SelectContactsScreen extends Component<
  NavigationScreenConfigProps,
  State
> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <WhitePortal name="header-title" />,
    headerRight: <WhitePortal name="header-right" />,
    headerLeft: (
      <NavigationIconButton
        name="arrow-open-left-thin"
        color={getColor('orange')}
        onPress={() => navigation.goBack()}
      />
    ),
  });

  state = {
    contacts: [],
    permission: 'undefined',
    searchValue: '',
    selectedContacts: this.props.formik.values[this.props.contactsField] || [],
  };

  get filteredContacts(): Array<Contact> {
    return this.state.contacts;
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      Contacts.requestPermission((err, permission) => {
        this.setState({ permission });

        if (permission === 'authorized') {
          this.fetchContacts();
        }
      });
    });
  }

  fetchContacts = () => {
    Contacts.getAll((err, contacts) => {
      if (err !== 'denied') {
        const filteredContacts = contacts.filter(contact => {
          const { emailAddresses, phoneNumbers } = contact;

          return !!emailAddresses.length || !!phoneNumbers.length;
        });
        this.setState({ contacts: filteredContacts });
      }
    });
  };

  _onSave = () => {
    this.props.formik.setFieldValue(
      this.props.contactsField,
      this.state.selectedContacts
    );

    this.props.navigation.goBack();
  };

  _onSelectContact = (contact: Contact) => {
    const selectedContacts = [...this.state.selectedContacts];

    if (this.isSelected(contact)) {
      const index = selectedContacts.findIndex(
        (selectedContact: Contact): boolean =>
          selectedContact.recordID === contact.recordID
      );
      selectedContacts.splice(index, 1);
    } else {
      selectedContacts.push(contact);
    }

    this.setState({ selectedContacts });
  };

  renderFullName(contact: Contact): string {
    return `${contact.givenName}${contact.middleName
      ? ` ${contact.middleName}`
      : ''}${contact.familyName ? ` ${contact.familyName}` : ''}`;
  }

  isSelected = (contact: Contact) => {
    return this.state.selectedContacts.some(
      (selectedContact: Contact): boolean =>
        selectedContact.recordID === contact.recordID
    );
  };

  keyExtractor = (item: Contact) => item.recordID.toString();

  render() {
    switch (this.state.permission) {
      case 'undefined':
        return (
          <CenterView>
            <ActivityIndicator />
          </CenterView>
        );

      case 'denied':
        return (
          <CenterView>
            <Icon
              name="sad-face"
              color={getColor('gray')}
              size={100}
              style={{ paddingBottom: 25 }}
            />
            <Text color={getColor('gray')} size={16}>
              Allow permission via system settings
            </Text>
          </CenterView>
        );

      case 'authorized':
        return (
          <Screen tintColor="white" scrollEnabled fill>
            <BlackPortal name="header-title">
              <SearchBox
                placeholder="Search..."
                value={this.state.searchValue}
                onChangeText={(searchValue: string) =>
                  this.setState({ searchValue })}
              />
            </BlackPortal>

            <BlackPortal name="header-right">
              <NavigationTextButton
                textColor={getColor('orange')}
                title="Save"
                onPress={this._onSave}
              />
            </BlackPortal>

            <TableView.Section header="Contacts">
              <FlatList
                contentContainerStyle={{ height: '100%' }}
                data={this.filteredContacts}
                keyExtractor={this.keyExtractor}
                renderItem={({ item }: { item: Contact }) => (
                  <TableView.Cell
                    cellStyle="RightDetail"
                    key={item.recordID}
                    title={this.renderFullName(item)}
                    cellImageView={
                      <Avatar
                        imageURI={item.thumbnailPath}
                        imageSource={require('./avatar.png')}
                        size={28}
                        radius={14}
                        style={styles.avatar}
                      />
                    }
                    cellAccessoryView={
                      <Checkmark
                        selectedBackgroundColor={getColor('linkBlue')}
                        selected={this.isSelected(item)}
                        color="white"
                      />
                    }
                    onPress={() => {
                      this._onSelectContact(item);
                    }}
                  />
                )}
                ItemSeparatorComponent={Separator}
              />
            </TableView.Section>
          </Screen>
        );
      default:
        return null;
    }
  }
}

const mapState = (state, props) => ({
  ...props.navigation.state.params,
});

export default connect(mapState, {})(SelectContactsScreen);

const styles = StyleSheet.create({
  avatar: {
    marginRight: 7,
  },
});
