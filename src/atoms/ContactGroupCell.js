// @flow

import React, { Component } from 'react';

import { ContactGroup, TableView } from './index';
import { css } from '../utils/style';

type Props = {
  users: Array<*>,
  onContactSelect: Function,
};

export default class ContactGroupCell extends Component<Props> {
  render() {
    return (
      <TableView.Cell
        contentContainerStyle={[css('paddingRight', 0), css('paddingLeft', 0)]}
        cellContentView={
          <ContactGroup
            onContactSelect={this.props.onContactSelect}
            users={this.props.users}
          />
        }
      />
    );
  }
}
