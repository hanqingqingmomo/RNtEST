// @flow

import React, { Component } from 'react';

import { Screen, TableView } from '../atoms';
import { ProfileCard } from '../blocks';

const { Table, Section } = TableView;

// TODO rename to "MemberProfileScreen"
export default class OrganisationMemberProfileScreen extends Component<{}> {
  static navigationOptions = ({ navigation }) => {
    const { user } = navigation.state.params;

    return {
      title: `${user.first_name} ${user.last_name}`,
    };
  };

  render() {
    // TODO load data
    // /v1/members/bcb54f098a8f
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
