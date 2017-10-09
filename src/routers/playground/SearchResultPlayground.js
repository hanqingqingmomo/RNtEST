// @flow

import React, { Component } from 'react';

import { ScrollView } from '../../atoms';
import { SearchResult } from '../../blocks/';

export default class NewsfeedPlayground extends Component<{}> {
  render() {
    return (
      <ScrollView>
        <SearchResult />
      </ScrollView>
    );
  }
}
