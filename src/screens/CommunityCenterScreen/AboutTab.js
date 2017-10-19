// @flow

import React, { Component } from 'react';

import { ContactGroup, ScrollView, TableView, Text, View } from '../../atoms';
import { css } from '../../utils/style';
import { type User } from '../../Types';

const { Table, Section, Cell } = TableView;

type Props = {
  community: Object,
  navigateToMember: (user: User) => void,
};

export default class AboutTab extends Component<Props> {
  static navigationOptions = {
    tabBarLabel: 'About',
  };

  render() {
    const { community } = this.props;

    return (
      <ScrollView>
        <Table>
          <Section header="contact">
            <Cell
              contentContainerStyle={[
                css('paddingRight', 0),
                css('paddingLeft', 0),
              ]}
              cellContentView={
                <ContactGroup
                  onContactSelect={this.props.navigateToMember}
                  users={community.administrators}
                />
              }
            />
          </Section>

          <Section header="about us">
            <Cell
              cellContentView={
                <View style={css('paddingVertical', 20)}>
                  <Text color="#455A64" size={14} lineHeight={18}>
                    {community.description}
                  </Text>
                </View>
              }
            />
          </Section>
        </Table>
      </ScrollView>
    );
  }
}
