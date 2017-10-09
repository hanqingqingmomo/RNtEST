// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import Contacts from 'react-native-contacts';

import {
  Avatar,
  Button,
  Icon,
  SearchBox,
  TableView,
  Text,
  View,
} from '../atoms';
import { getColor } from '../utils/color';
import { css } from '../utils/style';

type EmailAddressProps = {
  email: string,
  label: string,
};

type PhoneProps = {
  label: string,
  number: string,
};

type PostalAddressProps = {
  city: string,
  country: string,
  label: string,
  postCode: string,
  region: string,
  state: string,
  street: string,
};

type ContactProps = {
  emailAddresses: Array<EmailAddressProps>,
  familyName: string,
  givenName: string,
  hasThumbnail: boolean,
  jobTitle: string,
  middleName: string,
  phoneNumbers: Array<PhoneProps>,
  postalAddresses: Array<PostalAddressProps>,
  recordID: string,
  thumbnailPath: string,
};

type S = {
  searchValue: string,
  contacts: Array<ContactProps>,
};

export default class InviteFriendsScreen extends React.Component<{}, S> {
  state = {
    searchValue: '',
    contacts: [],
  };

  componentDidMount() {
    Contacts.checkPermission((err, permission) => {
      if (permission === 'undefined') {
        Contacts.requestPermission((err, permission) => {
          if (permission === 'authorized') {
            this.readContacts();
          }
        });
      } else if (permission === 'authorized') {
        this.readContacts();
      }
    });
  }

  readContacts() {
    Contacts.getAll((err, contacts) => {
      if (err !== 'denied') {
        this.setState({ contacts });
      }
    });
  }

  cellContentView(user: ContactProps): React$Element<*> {
    const { emailAddresses, familyName, givenName, middleName } = user;
    return (
      <View style={styles.row}>
        <View style={styles.textWrapper}>
          <Text size={15} lineHeight={18} style={css('color', '#455A64')}>
            {`${givenName}${middleName ? ` ${middleName}` : ''}${familyName
              ? ` ${familyName}`
              : ''}`}
          </Text>
          {emailAddresses.length ? (
            <Text
              size={15}
              lineHeight={18}
              style={css('color', getColor('gray'))}
            >
              {emailAddresses[0].email}
            </Text>
          ) : null}
        </View>
        <Button
          title="Send"
          size="sm"
          color={getColor('orange')}
          textColor="white"
          onPress={this.onInvite(user)}
        />
      </View>
    );
  }

  cellImageView(user: ContactProps): React$Element<*> {
    if (user.hasThumbnail) {
      return <Avatar size={28} imageURI={user.imageURI} />;
    }
    return <Icon name="user" size="md" color={getColor('gray')} />;
  }

  onInvite(user: ContactProps) {
    return () => {
      console.log('invite', user);
    };
  }

  get users(): Array<ContactProps> {
    const { searchValue, contacts } = this.state;

    const filtered = contacts.filter(
      user =>
        `${user.givenName} ${user.givenName} ${user.emailAddresses.length
          ? user.emailAddresses[0].email
          : ''}`
          .toLowerCase()
          .indexOf(searchValue.toLowerCase()) !== -1
    );

    return filtered || contacts;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <SearchBox
            placeholder="Search..."
            value={this.state.searchValue}
            onChangeText={(searchValue: string) =>
              this.setState({ searchValue })}
          />
        </View>
        <TableView.Table style={styles.table}>
          {this.users.map(user => {
            return (
              <TableView.Cell
                key={user.recordID}
                cellContentView={this.cellContentView(user)}
                cellImageView={this.cellImageView(user)}
                contentContainerStyle={styles.cell}
              />
            );
          })}
        </TableView.Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  searchBox: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  table: {
    backgroundColor: 'white',
  },
  cell: {
    paddingVertical: 9,
    paddingLeft: 0,
    paddingRight: 15,
    marginLeft: 15,
    borderBottomWidth: 1,
    borderColor: '#ECEFF1',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  textWrapper: {
    flexGrow: 1,
    paddingHorizontal: 7,
  },
});
