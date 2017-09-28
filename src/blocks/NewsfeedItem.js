// @flow

import React from 'react';
import { StyleSheet, Platform } from 'react-native';

import { Text, View, Pill, Icon, TouchableItem } from '../atoms';
import { css } from '../utils/style';

import NewsFeedItemFooter from './NewsFeedItem/NewsFeedItemFooter';
import NewsFeedItemHeader from './NewsFeedItem/NewsFeedItemHeader';
import NewsFeedItemAuthor from './NewsFeedItem/NewsFeedItemAuthor';
import NewsFeedItemPostedTime from './NewsFeedItem/NewsFeedItemPostedTime';

type TagProps = {
  name: string,
  disabled?: boolean,
};

type UserProps = {
  username: string,
  imageURI: string,
};

type P = {
  isNew?: boolean,
  title?: string,
  tags: Array<TagProps>,
  date: Date,
  user: UserProps,
  onReplayPress: () => void,
  onLinkPress: () => void,
  onTagPress: () => void,
};

const LINKS = ['Share', 'Comment'];

export default class NewsfeedItem extends React.Component<*, P, *> {
  shortenString(
    string: string,
    maxChars: number
  ): {
    isShorted: boolean,
    string: string,
  } {
    if (!string) {
      return null;
    }

    const newString = string.substring(0, maxChars);

    return {
      isShorted: newString.length < string.length,
      string: newString,
    };
  }

  onTagPress(tag) {
    return () => {
      this.props.onTagPress(tag);
    };
  }

  onLinkPress = (key: 'share' | 'comment') => {
    this.props.onLinkPress(key, this.props);
  };

  render() {
    const { isNew, title, tags, date, user } = this.props;

    const shortedTitle = this.shortenString(title, 110);

    return (
      <View
        style={[
          styles.containerByPlatform,
          isNew ? styles.borderIsNew : undefined,
        ]}
      >
        <View style={styles.container}>
          <NewsFeedItemHeader tags={tags} />
          {title ? (
            <Text size={14} lineHeight={18} color="#455A64">
              {shortedTitle.string}
              {shortedTitle.isShorted ? (
                <Text>
                  {`... `}
                  <Text color="#00B0FF">Continue reading</Text>
                </Text>
              ) : null}
            </Text>
          ) : null}
          <NewsFeedItemPostedTime date={date} style={styles.postedTime} />
          <NewsFeedItemAuthor
            user={user}
            onReplayPress={() => this.props.onReplayPress(this.props)}
          />
          <NewsFeedItemFooter links={LINKS} onLinkPress={this.onLinkPress} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 3,
    overflow: 'hidden',
    paddingHorizontal: 15,
  },
  containerByPlatform: Platform.select({
    ios: {
      shadowColor: 'rgb(143,142,148)',
      shadowOpacity: 0.3,
      shadowRadius: 3,
      shadowOffset: { width: 1, height: 4 },
    },
    android: {
      borderRadius: 3,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'rgba(143,142,148,0.3)',
    },
  }),
  borderIsNew: {
    borderRadius: 3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0,230,118,0.7)',
  },

  row: {
    flexDirection: 'row',
  },
  postedTime: {
    marginTop: 12,
  },
});
