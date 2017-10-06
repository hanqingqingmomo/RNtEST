// @flow

import React, { Component } from 'react';

import { ScrollView, TableView, Text, Icon } from '../../atoms';
import { ProfileCard } from '../../blocks';

const { Table, Section, Cell } = TableView;

const data = {
  imageURI:
    'https://www.thedealersden.com/uploads/cache/img_A_117518_89f3552911d13156e3164f3e11351a6f-500x500.jpg',
  username: 'Carla Anthony',
  position: 'Academy Leader',
  email: 'carla.anthony@ywca.com',
  phone: '0918053935',
};

export default class UserProfilePlayground extends Component<{}, void> {
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
