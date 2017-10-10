// @flow

import React from 'react';
import {
  ActivityIndicator,
  InteractionManager,
  StyleSheet,
  FlatList,
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
  permission: 'undefined' | 'denied' | 'authorized',
};

export default class InviteFriendsScreen extends React.Component<{}, S> {
  state = {
    searchValue: '',
    contacts: [],
    permission: 'undefined',
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
          this.setState({ contacts });
        }
      });
    }
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
          <Screen>
            <View style={styles.searchBox}>
              <SearchBox
                placeholder="Search..."
                value={this.state.searchValue}
                onChangeText={(searchValue: string) =>
                  this.setState({ searchValue })}
              />
            </View>
            <TableView.Table>
              <TableView.Section>
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
