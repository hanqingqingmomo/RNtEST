// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, Avatar, Button } from '../../atoms';

type UserProps = {
  username: string,
  imageURI: string,
};

type P = {
  user: UserProps,
  onReplayPress: () => void,
};

export default class NewsFeedItemAuthor extends React.Component<*, P, *> {
  render() {
    const { username, imageURI } = this.props.user;

    return (
      <View style={[styles.container, styles.row]}>
        <View style={[styles.user, styles.row]}>
          <Avatar imageURI={imageURI} size={28} />
          <Text
            style={styles.username}
            size={13}
            color="#455A64"
            lineHeight={15}
            weight="600"
          >
            {username}
          </Text>
        </View>

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
