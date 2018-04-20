// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { TouchableOpacity, View, Icon, Text, Image } from '../../atoms';
import { getColor } from '../../utils/color';

type InviteProps = {
  title: string,
  onPress: Function,
};

type PhotoProps = {
  name: string,
  onPress: Function,
};

export function InviteButton({ title, onPress }: InviteProps): React$Node {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.iconWrapper}>
          <Icon name="plus" color={getColor('linkBlue')} size="sm" />
        </View>
        <Text
          size={12}
          lineHeight={12}
          color={getColor('linkBlue')}
          style={styles.text}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export class PhotoButton extends Component<PhotoProps> {
  static contextTypes = {
    formik: PropTypes.object,
  };

  render(): React$Node {
    const { onPress, name } = this.props;
    const uri = this.context.formik.values[name];

    return (
      <TouchableOpacity onPress={onPress}>
        {uri ? (
          <Image source={{ uri }} style={styles.image} resizeMode="cover" />
        ) : (
          <Icon name="photo-camera" color={getColor('gray')} size="md" />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 72,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderColor: getColor('linkBlue'),
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
  },
  text: {
    textAlign: 'center',
  },
  image: {
    width: 34,
    height: 34,
    borderWidth: 1,
    borderColor: '#CFD8DC',
  },
});
