// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { isToday, format } from 'date-fns';

import { View, Text, Image, Count } from '../../atoms/';
import { css } from '../../utils/style';

type Props = {
  imageURI: string,
  title: string,
  date: Date,
  comments?: number,
  onCommentPress: Props => void,
};

export default class CommentAttachment extends Component<Props> {
  formatDate(date: Date) {
    const day = isToday(date)
      ? 'Today'
      : isToday(date) ? 'Yesterday' : format(date, 'DD.MM.YYYY');
    const time = format(date, 'HH:MM A');

    return `${day} at ${time}`;
  }

  onCommentPress = () => {
    this.props.onCommentPress(this.props);
  };

  render() {
    const { imageURI, title, date, comments } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.icon}>
          <Image source={{ uri: imageURI }} style={styles.image} />
        </View>
        <View style={styles.text}>
          <Text
            size={14}
            weight="600"
            lineHeight={18}
            numberOfLines={2}
            ellipsizeMode="tail"
            style={css('color', '#455A64')}
          >
            {title}
          </Text>
          <Text
            size={11}
            lineHeight={18}
            numberOfLines={1}
            ellipsizeMode="tail"
            style={css('color', '#B0BEC5')}
          >
            Uploaded {this.formatDate(date)}
          </Text>
          {comments ? (
            <View style={styles.likeWrapper}>
              <Count iconName="comment" count={comments} />
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 14,
    paddingBottom: 3,
  },
  image: {
    width: 55,
    height: 70,
  },
  icon: {
    paddingRight: 18,
  },
  text: {
    flex: 1,
  },
  likeWrapper: {
    marginTop: 5,
    alignItems: 'flex-start',
  },
});
