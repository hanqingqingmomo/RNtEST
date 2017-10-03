// @flow

import React from 'react';
import { Section as OriginalSection } from 'react-native-tableview-simple';

import { View } from '../index';

import SectionLabel from './SectionLabel';

export default class Section extends React.Component {
  renderHeader(header: string) {
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
