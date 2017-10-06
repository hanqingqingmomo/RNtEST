// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, Avatar, Button, TouchableItem } from '../../atoms';
import { css } from '../../utils/style';

type UserProps = {
  username: string,
  imageURI: string,
};

type P = {
  user: UserProps,
  onReplayPress: () => void,
  onUserPress: UserProps => void,
};

const HIT_SLOP = {
  top: 6,
  right: 6,
  bottom: 6,
  left: 6,
};

export default class NewsFeedItemAuthor extends React.Component<P, void> {
  onUserPress = () => {
    this.props.onUserPress(this.props.user);
  };

  render() {
    const { username, imageURI } = this.props.user;

    return (
      <View style={[styles.container, styles.row]}>
        <TouchableItem
          onPress={this.onUserPress}
          style={styles.user}
          hitSlop={HIT_SLOP}
        >
          <View style={styles.row}>
            <Avatar imageURI={imageURI} size={28} />
            <Text
              style={[styles.username, css('color', '#455A64')]}
              size={13}
              lineHeight={15}
              weight="600"
            >
              {username}
            </Text>
          </View>
        </TouchableItem>

        <View style={[styles.button, styles.row]}>
          <Button
            size="sm"
            color="#00E676"
            textColor="white"
            title="1 Reply"
            onPress={this.props.onReplayPress}
          />
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
