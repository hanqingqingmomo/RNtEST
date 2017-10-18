// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, Avatar, Button, TouchableItem } from '../../atoms';
import { css } from '../../utils/style';

type UserProps = {
  email: string,
  first_name: string,
  last_name: string,
  profile_photo: string,
  id: number,
};

type P = {
  onReplayPress: () => void,
  onUserPress: UserProps => void,
  author: UserProps,
  replies: number,
};

const HIT_SLOP = {
  top: 6,
  right: 6,
  bottom: 6,
  left: 6,
};

export default class NewsFeedItemAuthor extends Component<P> {
  onUserPress = () => {
    this.props.onUserPress(this.props.author);
  };

  render() {
    const { first_name, last_name, profile_photo } = this.props.author;

    return (
      <View style={[styles.container, styles.row]}>
        <TouchableItem
          onPress={this.onUserPress}
          style={styles.user}
          hitSlop={HIT_SLOP}
        >
          <View style={styles.row}>
            {/* <Avatar imageURI={{ uri: profile_photo }} size={28} /> */}
            <Text
              style={[styles.username, css('color', '#455A64')]}
              size={13}
              lineHeight={15}
              weight="600"
            >
              {`${first_name} ${last_name}`}
            </Text>
          </View>
        </TouchableItem>

        <View style={[styles.button, styles.row]}>
          {this.props.replies ? (
            <Button
              size="sm"
              color="#00E676"
              textColor="white"
              title={`${this.props.replies} Reply`}
              onPress={this.props.onReplayPress}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 11,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  user: {
    flexGrow: 1,
  },
  username: {
    marginLeft: 10,
  },
  button: {
    marginVertical: 2,
  },
});
