// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationIconButton } from '../atoms';

import {
  ContactGroup,
  Icon,
  OrganizationHeader,
  Screen,
  TableView,
  Text,
  View,
} from '../atoms';
import { css } from '../utils/style';
import { type User } from '../Types';

const { Table, Section, Cell } = TableView;

function DismissModalButton({ onPress }) {
  return <NavigationIconButton name="close" color="white" onPress={onPress} />;
}

const users: Array<User> = [
  {
    profilePhoto:
      'https://cdn1.thr.com/sites/default/files/imagecache/nfe_square_383x383/2016/10/johnwick2_0.jpg',
    first_name: 'Johnathanios',
    last_name: 'Wick',
    role: 'Founder',
    email: 'johnathanios.wick@johnathanios.com',
    id: 1,
  },
  {
    profilePhoto:
      'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
    first_name: 'Johnathanios',
    last_name: 'Wick',
    role: 'Member',
    email: 'bla',
    id: 2,
  },
  {
    profilePhoto:
      'https://s3.amazonaws.com/uifaces/faces/twitter/iannnnn/128.jpg',
    first_name: 'Armani',
    last_name: 'Wick',
    role: 'Member',
    email: 'bla',
    id: 4,
  },
  {
    profilePhoto:
      'https://cdn1.thr.com/sites/default/files/imagecache/nfe_square_383x383/2016/10/johnwick2_0.jpg',
    first_name: 'Lucinda',
    last_name: 'Wick',
    role: 'Member',
    email: 'bla',
    id: 5,
  },
  {
    profilePhoto:
      'https://cdn1.thr.com/sites/default/files/imagecache/nfe_square_383x383/2016/10/johnwick2_0.jpg',
    first_name: 'Dagmar',
    last_name: 'Wick',
    role: 'Member',
    email: 'bla',
    id: 7,
  },
  {
    profilePhoto:
      'https://cdn1.thr.com/sites/default/files/imagecache/nfe_square_383x383/2016/10/johnwick2_0.jpg',
    first_name: 'John',
    last_name: 'Wick',
    role: 'Founder',
    email: 'bla',
    id: 11,
  },
  {
    profilePhoto:
      'https://cdn1.thr.com/sites/default/files/imagecache/nfe_square_383x383/2016/10/johnwick2_0.jpg',
    first_name: 'Ingeborga',
    last_name: 'Wick',
    role: 'Member',
    email: 'bla',
    id: 13,
  },
];

export default class OrganisationProfileScreen extends Component<{}, void> {
  get formatedUserCount(): string {
    return users.length.toLocaleString();
  }

  render() {
    return (
      <Screen>
        <View style={styles.dismisalButton}>
          <DismissModalButton
            onPress={this.props.screenProps.dismissModalRoute}
          />
        </View>
        <Table>
          <Section sectionPaddingTop={0}>
            <View style={css('backgroundColor', 'white')}>
              <OrganizationHeader
                title="YWCA"
                subtitle="Young Women's Christian Association"
                profileImageURI="https://logos-download.com/wp-content/uploads/2016/11/YWCA_logo_logotype.png"
                coverImageURI="https://www.ywcaknox.com/wp-content/uploads/photo3-407x222.jpg"
              />
              <View style={styles.users}>
                <Icon
                  name="user"
                  color="#B0BEC5"
                  style={css('marginRight', 4)}
                  size="sm"
                />
                <Text size={13} lineHeight={15} weight="600" color="#B0BEC5">
                  {this.formatedUserCount}
                </Text>
              </View>
            </View>
          </Section>

          <Section header="contact">
            <Cell
              contentContainerStyle={{ paddingRight: 0, paddingLeft: 0 }}
              cellContentView={
                <ContactGroup
                  onContactSelect={user =>
                    this.props.navigation.navigate(
                      'OrganisationMemberProfileScreen',
                      { user }
                    )}
                  users={users}
                />
              }
            />
          </Section>

          <Section header="about us">
            <Cell
              cellContentView={
                <View style={{ paddingVertical: 20 }}>
                  <Text color="#455A64" size={14} lineHeight={18}>
                    YWCA Metropolitan Chicago believes that all children deserve
                    quality care. High quality early education programs improve
                    children’s developmental outcomes. Recently the spotlight
                    has been on the importance of the early years and the public
                    is demanding more from early childhood professionals and
                    their programs. The Quality &amp; Training team is committed
                    to partnering with early childhood professionals like you
                    that have dedicated themselves to helping children learn,
                    grow, and develop to their full potential and to help
                    parents, families, and communities build strong educational
                    programs. We offer a variety of services specifically
                    designed to support early childhood professionals and help
                    them provide the highest quality of care for children in our
                    communities.
                  </Text>
                </View>
              }
            />
          </Section>
        </Table>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(69, 90, 100, 0.5)',
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  dismisalButton: {
    position: 'absolute',
    top: 20,
    zIndex: 1,
  },
  users: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
  },
});
