// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Button, View, SearchBox, TableView, Text, Avatar } from '../atoms';
import { getColor } from '../utils/color';
import { css } from '../utils/style';

type UserProps = {
  id: number,
  username: string,
  email: string,
  imageURI: string,
};

type S = {
  searchValue: string,
};

const USERS = [
  {
    id: 1,
    username: 'Marvin Baker',
    email: 'baker@example.com',
    imageURI:
      'https://t4.ftcdn.net/jpg/01/05/72/55/240_F_105725565_vVl8Hc6kIRQsgquqdQYrz7fWFrfQAGCw.jpg',
  },
  {
    id: 2,
    username: 'James Beck',
    email: 'beckJames@example.com',
    imageURI:
      'https://t4.ftcdn.net/jpg/01/05/72/55/240_F_105725565_vVl8Hc6kIRQsgquqdQYrz7fWFrfQAGCw.jpg',
  },
  {
    id: 3,
    username: 'Jessie Carpenter',
    email: 'carpenter@example.com',
    imageURI:
      'https://t4.ftcdn.net/jpg/01/05/72/55/240_F_105725565_vVl8Hc6kIRQsgquqdQYrz7fWFrfQAGCw.jpg',
  },
];

export default class LandingScreen extends React.Component<void, void, S> {
  static navigationOptions = {
    title: 'Invite Friends',
  };

  state = {
    searchValue: '',
  };

  cellContentView(user: UserProps): React$Element<*> {
    return (
      <View style={styles.row}>
        <View style={styles.textWrapper}>
          <Text size={15} lineHeight={18} style={css('color', '#455A64')}>
            {user.username}
          </Text>
          <Text
            size={15}
            lineHeight={18}
            style={css('color', getColor('gray'))}
          >
            {user.email}
          </Text>
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

  cellImageView(user: UserProps): React$Element<*> {
    return <Avatar size={28} imageURI={user.imageURI} />;
  }

  onInvite(user: UserProps) {
    return () => {
      console.log('invite', user);
    };
  }

  get users(): Array<UserProps> {
    const { searchValue } = this.state;

    const filtered = USERS.filter(
      user =>
        `${user.username} ${user.email}`
          .toLowerCase()
          .indexOf(searchValue.toLowerCase()) !== -1
    );

    return filtered || USERS;
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
                key={user.id}
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
