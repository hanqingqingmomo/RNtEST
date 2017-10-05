// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { ScrollView } from '../../atoms';
import { SearchResult } from '../../blocks/';

export default class NewsfeedPlayground extends React.Component<*, *, *> {
  render() {
    return (
      <ScrollView>
        <SearchResult />
      </ScrollView>
    );
  }
}
