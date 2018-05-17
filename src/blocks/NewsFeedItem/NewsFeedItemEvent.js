// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { format } from 'date-fns';

import { Text, View, Image, ShadowView, TouchableOpacity } from '../../atoms';
import { getColor } from '../../utils/color';

type Props = {
  cover_photo: string,
  end: Date,
  start: Date,
  title: string,
  onPress: Function,
};

export default class NewsFeedItemEvent extends Component<Props> {
  render() {
    const { title, cover_photo, start, end, onPress } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <View>
          {cover_photo ? (
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: cover_photo }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          ) : null}
          <View style={styles.dateContainer}>
            <ShadowView style={styles.dateBox} radius={3}>
              <Text
                size={20}
                lineHeight={20}
                weight="bold"
                color={getColor('gray')}
              >
                {format(start, 'DD')}
              </Text>
              <Text
                size={11}
                lineHeight={11}
                weight="600"
                color={getColor('gray')}
              >
                {format(start, 'MMM')}
              </Text>
            </ShadowView>
            <View style={styles.text}>
              <Text
                size={14}
                lineHeight={18}
                weight="600"
                numberOfLines={2}
                ellipsizeMode="tail"
                color="#455A64"
                style={styles.title}
              >
                {title}
              </Text>
              <Text size={13} lineHeight={18} color={getColor('gray')}>
                {`${format(start, 'HH:MM A')} - ${format(end, 'HH:MM A')}`}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  imageWrapper: {
    marginBottom: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -26,
    marginLeft: -26,
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    marginBottom: 4,
  },
  text: {
    flex: 1,
  },
  dateContainer: {
    flexDirection: 'row',
    marginBottom: 13,
  },
  dateBox: {
    borderWidth: 1,
    borderColor: '#CFD8DC',
    borderStyle: 'solid',
    width: 50,
    height: 50,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
    marginTop: 3,
  },
});
