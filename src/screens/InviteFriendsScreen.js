// @flow

import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  InteractionManager,
  Linking,
  StyleSheet,
} from 'react-native';
import Contacts from 'react-native-contacts';
import { Separator } from 'react-native-tableview-simple';

import {
  Avatar,
  Button,
  CenterView,
  Fetch,
  Icon,
  Screen,
  SearchBox,
  TableView,
  Text,
  View,
} from '../atoms';
import { getColor } from '../utils/color';
import { css } from '../utils/style';
import { makeInvitationRq } from '../utils/requestFactory';

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
  recordID: number,
  thumbnailPath: string,
};

type S = {
  contacts: Array<ContactProps>,
  invitedUser: Array<number>,
  permission: 'undefined' | 'denied' | 'authorized',
  searchValue: string,
};

export default class InviteFriendsScreen extends React.Component<{}, S> {
  state = {
    contacts: [],
    invitedUser: [],
    permission: 'undefined',
    searchValue: '',
  };

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      Contacts.requestPermission((err, permission) => {
        this.setState({ permission });
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.permission !== this.state.permission &&
      this.state.permission === 'authorized'
    ) {
      Contacts.getAll((err, contacts) => {
        if (err !== 'denied') {
          const filteredContacts = contacts.filter(contact => {
            const { emailAddresses, phoneNumbers } = contact;

            return !!emailAddresses.length || !!phoneNumbers.length;
          });
          this.setState({ contacts: filteredContacts });
        }
      });
    }
  }

  cellContentView(user: ContactProps): React$Element<*> {
    const { emailAddresses, familyName, givenName, middleName } = user;
    const { invitedUser } = this.state;
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
        {invitedUser.includes(user.recordID) ? (
          <Button.Icon
            iconName="check"
            size="sm"
            color={getColor('green')}
            iconColor={getColor('white')}
            disabled
            style={{ alignSelf: 'center' }}
          />
        ) : (
          <Button
            title="Send"
            size="sm"
            color={getColor('orange')}
            textColor="white"
            onPress={this.onInvite(user)}
          />
        )}
      </View>
    );
  }

  cellImageView(user: ContactProps): React$Element<*> {
    if (user.hasThumbnail) {
      return <Avatar size={28} imageURI={user.imageURI} />;
    }
    return <Icon name="user" size="md" color={getColor('gray')} />;
  }

  hasUserEmail(user: ContactProps) {
    return !!user.emailAddresses.length;
  }

  hasUserPhone(user: ContactProps) {
    return !!user.phoneNumbers.length;
  }

  sendInvitationEmail = async (user: ContactProps) => {
    const { invitedUser } = this.state;

    try {
      const email = user.emailAddresses[0].email;
      const request = makeInvitationRq(email);
      await global.fetch(request.url, request.options);

      invitedUser.push(user.recordID);

      this.setState({ invitedUser });
    } catch (err) {}
  };

  sendInvitationMessage = (user: ContactProps) => {
    const phone = user.phoneNumbers[0].number;
    const url = `sms:${phone}&body=You are invited to join the YWCA’s MPWR community! Click here to join us! https://poweredbyaction.org/invite`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  onInvite(user: ContactProps) {
    return () => {
      if (this.hasUserEmail(user)) {
        this.sendInvitationEmail(user);
      } else if (this.hasUserPhone(user)) {
        this.sendInvitationMessage(user);
      }
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
              color="#90A4AE"
              size={100}
              style={{ paddingBottom: 25 }}
            />
            <Text color="#90A4AE" size={16}>
              Allow permission via system settings
            </Text>
          </CenterView>
        );
      case 'authorized':
        return (
          <Fetch manual>
            {invitation => (
              <Screen tintColor="white">
                <View style={styles.searchBox}>
                  <SearchBox
                    placeholder="Search..."
                    value={this.state.searchValue}
                    onChangeText={(searchValue: string) =>
                      this.setState({ searchValue })}
                  />
                </View>
                <TableView.Table>
                  <TableView.Section sectionTintColor="white">
                    <FlatList
                      data={this.users}
                      keyExtractor={item => item.recordID}
                      renderItem={({ item }) => (
                        <TableView.Cell
                          cellContentView={this.cellContentView(item)}
                          image={this.cellImageView(item)}
                          contentContainerStyle={styles.cell}
                        />
                      )}
                      ItemSeparatorComponent={({ highlighted }) => (
                        <Separator isHidden={highlighted} />
                      )}
                    />
                  </TableView.Section>
                </TableView.Table>
              </Screen>
            )}
          </Fetch>
        );
      default:
        return null;
    }
  }
}

const styles = StyleSheet.create({
  searchBox: {
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: 'white',
  },
  cell: {
    paddingVertical: 9,
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
