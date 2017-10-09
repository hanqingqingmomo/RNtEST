// @flow

import React, { Component } from 'react';
import { Section as OriginalSection } from 'react-native-tableview-simple';

import SectionLabel from './SectionLabel';

type Props = {
  header?: string,
};

export default class Section extends Component<Props> {
  renderHeader(header?: string) {
    if (this.props.header) {
      return <SectionLabel title={this.props.header} />;
    }

    return null;
  }

  render() {
    const { header, ...bag } = this.props;
    return (
      <OriginalSection
        sectionTintColor="#F4F5F7"
        {...bag}
        headerComponent={this.renderHeader(header)}
      />
    );
  }
}
