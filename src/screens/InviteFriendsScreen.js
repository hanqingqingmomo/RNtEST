// @flow

import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  InteractionManager,
  Linking,
  Platform,
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
import {
  makeInvitationRq,
  makeReadInvitationMessage,
} from '../utils/requestFactory';
import type { FetchProps } from '../Types';

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
  smsMessage: string,
};

type P = {};

export default class InviteFriendsScreen extends React.Component<P, S> {
  state = {
    contacts: [],
    invitedUser: [],
    permission: 'undefined',
    searchValue: '',
    smsMessage: '',
  };

  componentDidMount() {
    this.fetchInvitationMessage();
  }

  fetchInvitationMessage = async () => {
    const readPostReq = makeReadInvitationMessage();

    const readPostRes = await global.fetch(
      readPostReq.url,
      readPostReq.options
    );

    this.setState({ smsMessage: JSON.parse(readPostRes._bodyText).data });
  };

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      Contacts.requestPermission((err, permission) => {
        this.setState({ permission });
      });
    });
  }

  componentDidUpdate(prevProps: P, prevState: S) {
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

  cellContentView(user: ContactProps): React$Node {
    const { emailAddresses, familyName, givenName, middleName } = user;
    const { invitedUser } = this.state;
    return (
      <View style={styles.row}>
        <View style={styles.textWrapper}>
          <Text size={15} lineHeight={18} color="#455A64">
            {`${givenName}${middleName ? ` ${middleName}` : ''}${familyName
              ? ` ${familyName}`
              : ''}`}
          </Text>
          {emailAddresses.length ? (
            <Text
              size={15}
              lineHeight={18}
              color={getColor('gray')}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {emailAddresses[0].email}
            </Text>
          ) : null}
        </View>
        <View style={styles.buttons}>
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
      </View>
    );
  }

  cellImageView(user: ContactProps): React$Node {
    if (user.hasThumbnail) {
      return <Avatar size={28} imageURI={user.thumbnailPath} />;
    }
    return <Icon name="user" size="md" color={getColor('gray')} />;
  }

  hasUserEmail(user: ContactProps): boolean {
    return !!user.emailAddresses.length;
  }

  hasUserPhone(user: ContactProps): boolean {
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
    const body = this.state.smsMessage || '';
    const url = Platform.select({
      ios: `sms:${phone}&body=${body}`,
      android: `sms:${phone}?body=${body}`,
    });

    Linking.canOpenURL(url)
      .then(supported => {
        if (__DEV__ && !supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => alert('Could not sent SMS'));
  };

  onInvite(user: ContactProps): Function {
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
          <Fetch manual>
            {(invitation: FetchProps<*>) => (
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
                      keyExtractor={(item: ContactProps) =>
                        item.recordID.toString()}
                      renderItem={({ item }: { item: ContactProps }) => (
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
    alignItems: 'center',
    flex: 1,
  },
  buttons: {
    flex: 1,
  },
  textWrapper: {
    flex: 3,
    paddingHorizontal: 7,
  },
});
