// @flow

import React, { Component } from 'react';

import { ContactGroupCell, TableView, Text, View, Screen } from '../../atoms';
import { css } from '../../utils/style';
import { type User } from '../../Types';

const { Table, Section, Cell } = TableView;

type Props = {
  community: Object,
  navigateToMember(User): mixed,
};

export default class TabAbout extends Component<Props> {
  static navigationOptions = {
    tabBarLabel: 'About',
  };

  render() {
    const { community } = this.props;

    return (
      <Table>
        <Section header="contact">
          <ContactGroupCell
            onContactSelect={this.props.navigateToMember}
            users={community.administrators}
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
    );
  }
}
