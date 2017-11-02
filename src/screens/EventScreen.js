// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { Section } from 'react-native-tableview-simple';

import {
  ContactGroup,
  Icon,
  SegmentedControl,
  Screen,
  Text,
  View,
} from '../atoms';
import { NewsFeedItem } from '../blocks';
import { NewsFeedConversation } from './index';
import { getColor } from '../utils/color';
import { css } from '../utils/style';
import { parseTextContent } from '../utils/text';

const mocks = [
  {
    first_name: 'Vladko',
    last_name: 'Laca',
    profile_photo:
      'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
    id: 0,
    role: 'Al Capone',
  },
  {
    first_name: 'Mirko',
    last_name: 'Abramov',
    profile_photo:
      'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
    id: 1,
    role: 'Member',
  },
  {
    first_name: 'Ferko',
    last_name: 'Sipacov',
    profile_photo:
      'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
    id: 2,
    role: 'Slave',
  },
  {
    first_name: 'Vektor',
    last_name: 'Sipacov',
    profile_photo:
      'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
    id: 3,
    role: 'Stormtrooper',
  },
  {
    first_name: 'Dudko',
    last_name: 'Sipacov',
    profile_photo:
      'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
    id: 4,
    role: 'Stormtrooper',
  },
  {
    first_name: 'Ludko',
    last_name: 'Sipacov',
    profile_photo:
      'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
    id: 5,
    role: 'Stormtrooper',
  },
];

type CommentType = 'Top comments' | 'Newest first';

type State = {
  commentType: CommentType,
};

export default class EventScreen extends React.Component {
  state = {
    commentType: 'Top comments',
  };

  render() {
    const { text } = this.props;
    return (
      <Screen>
        <Text size={14} lineHeight={18} style={styles.text}>
          {parseTextContent(text, 80)}
        </Text>
        <ContactGroup users={mocks} />
        <View style={styles.segmented}>
          <View style={styles.segmentedWrapper}>
            <SegmentedControl
              labels={['Top comments', 'Newest first']}
              selectedLabel={this.state.commentType}
              onChange={(commentType: CommentType) =>
                this.setState({ commentType })}
            />
          </View>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#455A64',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  segmented: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 65,
  },
  segmentedWrapper: {
    width: 260,
  },
});
