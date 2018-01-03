// @flow

import React from 'react';
import {
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
  Icon,
  Screen,
  SearchBox,
  TableView,
  Text,
  View,
  ActivityIndicator,
} from '../atoms';
import { getColor } from '../utils/color';
import {
  RQinviteFriend,
  RQGetInvitationSmsContent,
} from '../utils/requestFactory';

type EmailDetail = {
  email: string,
  label: string,
};

type PhoneDetail = {
  label: string,
  number: string,
};

type Contact = {
  emailAddresses: Array<EmailDetail>,
  phoneNumbers: Array<PhoneDetail>,
  familyName: string,
  givenName: string,
  hasThumbnail: boolean,
  jobTitle: string,
  middleName: string,
  recordID: string,
  thumbnailPath: string,
};

type S = {
  contacts: Array<Contact>,
  sentInvitations: Array<string>,
  pendingInvitations: Object,
  permission: 'undefined' | 'denied' | 'authorized',
  searchValue: string,
  smsMessage: string,
};

type P = {};

export default class InviteFriendsScreen extends React.Component<P, S> {
  static navigationOptions = {
    title: 'Invite friends',
  };

  state = {
    contacts: [],
    sentInvitations: [],
    pendingInvitations: {},
    permission: 'undefined',
    searchValue: '',
    smsMessage: '',
  };

  componentDidMount() {
    this.fetchInvitationMessage();
  }

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

  fetchInvitationMessage = async () => {
    const response = await RQGetInvitationSmsContent();
    if (response.ok) {
      this.setState({ smsMessage: response.data.data });
    }
  };

  keyExtractor = (item: Contact) => item.recordID.toString();

  /**
   * Returns Text node with first email or phone number of the user
   */
  contactTextElement = (user: Contact) => {
    const email = user.emailAddresses.find(row => row.email);
    const phone = user.phoneNumbers.find(row => row.number);
    const text = email ? email.email : phone ? phone.number : null;
    return email || phone ? (
      <Text size={15} lineHeight={18} color="gray">
        {text}
      </Text>
    ) : null;
  };

  cellContentView(user: Contact): React$Node {
    const { familyName, givenName, middleName } = user;
    const { sentInvitations, pendingInvitations } = this.state;

    return (
      <View style={styles.row}>
        <View style={styles.textWrapper}>
          <Text size={15} lineHeight={18} color="#455A64">
            {`${givenName}${middleName ? ` ${middleName}` : ''}${familyName
              ? ` ${familyName}`
              : ''}`}
          </Text>
          {this.contactTextElement(user)}
        </View>
        {pendingInvitations[user.recordID] ? (
          <ActivityIndicator />
        ) : sentInvitations.includes(user.recordID) ? (
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

  cellImageView(user: Contact): React$Node {
    if (user.hasThumbnail) {
      return <Avatar size={28} imageURI={user.thumbnailPath} />;
    }
    return <Icon name="user" size="md" color={getColor('gray')} />;
  }

  hasUserEmail(user: Contact): boolean {
    return !!user.emailAddresses.length;
  }

  hasUserPhone(user: Contact): boolean {
    return !!user.phoneNumbers.length;
  }

  sendInvitationEmail = async (user: Contact) => {
    try {
      this.setState(state => ({
        pendingInvitations: {
          ...state.pendingInvitations,
          [user.recordID]: true,
        },
      }));

      const email = user.emailAddresses[0].email;
      await RQinviteFriend(email);

      this.setState(state => ({
        sentInvitations: state.sentInvitations.concat(user.recordID),
        pendingInvitations: {
          ...state.pendingInvitations,
          [user.recordID]: false,
        },
      }));
    } catch (err) {}
  };

  openMessagesApp = (user: Contact) => {
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

  onInvite(user: Contact): Function {
    return () => {
      if (this.hasUserEmail(user)) {
        this.sendInvitationEmail(user);
      } else if (this.hasUserPhone(user)) {
        this.openMessagesApp(user);
      }
    };
  }

  get users(): Array<Contact> {
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

  renderContactRow = ({ item }: { item: Contact }) => (
    <TableView.Cell
      cellContentView={this.cellContentView(item)}
      image={this.cellImageView(item)}
      contentContainerStyle={styles.cell}
    />
  );

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
          <Screen tintColor="white" scrollEnabled={false}>
            <View style={styles.searchBox}>
              <SearchBox
                placeholder="Search..."
                value={this.state.searchValue}
                onChangeText={(searchValue: string) =>
                  this.setState({ searchValue })}
              />
            </View>

            <FlatList
              contentContainerStyle={{ height: '100%' }}
              data={this.users}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderContactRow}
              ItemSeparatorComponent={Separator}
            />
          </Screen>
        );
      default:
        return null;
    }
  }
}

const styles = StyleSheet.create({
  searchBox: {
    padding: 7,
    borderBottomColor: '#E3E3E5',
    borderBottomWidth: 1,
  },
  cell: {
    paddingVertical: 9,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  textWrapper: {
    flex: 1,
    paddingHorizontal: 7,
  },
});
