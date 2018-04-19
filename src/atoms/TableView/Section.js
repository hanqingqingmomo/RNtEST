// @flow

import React, { Component } from 'react';
import { Section as OriginalSection } from 'react-native-tableview-simple';

import SectionLabel from './SectionLabel';
import { getColor } from '../../utils/color';

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
        footerTextColor={getColor('gray')}
        headerComponent={this.renderHeader(header)}
        {...bag}
      />
    );
  }
}
