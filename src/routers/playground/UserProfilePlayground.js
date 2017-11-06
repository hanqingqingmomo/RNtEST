import React, { Component } from 'react';

import { ScrollView, TableView, Text, Icon } from '../../atoms';
import { ProfileCard } from '../../blocks';

const { Table, Section, Cell } = TableView;

const data = {
  id: 'ddfgdf',
  profile_photo:
    'https://www.thedealersden.com/uploads/cache/img_A_117518_89f3552911d13156e3164f3e11351a6f-500x500.jpg',
  first_name: 'Carla',
  last_name: 'Anthony',
  email: 'carla.anthony@ywca.com',
  joined_communities: [],
};

export default class UserProfilePlayground extends Component<{}> {
  static navigationOptions = {
    title: 'User Profile',
  };

  render() {
    return (
      <ScrollView>
        <Table>
          <Section sectionPaddingTop={0}>
            <ProfileCard user={data} />
          </Section>
          <Section header="Communities">
            <Cell title={<Text>comp</Text>} />
            <Cell
              title="def"
              image={<Icon name="ywca" size="lg" />}
              accessory="DisclosureIndicator"
              disableImageResize
            />
          </Section>
        </Table>
      </ScrollView>
    );
  }
}
