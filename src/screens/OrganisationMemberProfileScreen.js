// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Screen, TableView } from '../atoms';
import { ProfileCard } from '../blocks';

const { Table, Section, Cell } = TableView;

export default class OrganisationMemberProfileScreen extends Component<
  {},
  void
> {
  static navigationOptions = ({ navigation }) => {
    const { user } = navigation.state.params;

    return {
      title: `${user.first_name} ${user.last_name}`,
    };
  };

  render() {
    const { user } = this.props.navigation.state.params;

    return (
      <Screen>
        <Table>
          <Section sectionPaddingTop={0}>
            <ProfileCard user={user} />
          </Section>
          {/* <Section header="Communities">
            <Cell title={<Text>comp</Text>} />
            <Cell
              title="def"
              image={<Icon name="ywca" size="lg" />}
              accessory="DisclosureIndicator"
              disableImageResize
            />
          </Section> */}
        </Table>
      </Screen>
    );
  }
}
