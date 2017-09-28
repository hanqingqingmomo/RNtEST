// @flow

import React from 'react';
import { StyleSheet, Platform } from 'react-native';

import { Text, View, Pill, Icon, TouchableItem } from '../../atoms';

type TagProps = {
  name: string,
  disabled?: boolean,
};

type P = {
  tags: Array<TagProps>,
};

export default class NewsFeedItemHeader extends React.Component<*, P, *> {
  onTagPress(tag) {
    return () => {
      console.log(tag);
    };
  }

  render() {
    const { tags } = this.props;

    return (
      <View style={[styles.header, styles.row]}>
        <View style={[styles.tags, styles.row]}>
          {tags.map(tag => (
            <View style={styles.tag} key={tag.name}>
              <TouchableItem
                onPress={this.onTagPress(tag)}
                disabled={tag.disabled}
              >
                <View style={{ backgroundColor: 'white' }}>
                  <Pill
                    title={tag.name}
                    color={tag.disabled ? '#B0BEC5' : '#FC612D'}
                  />
                </View>
              </TouchableItem>
            </View>
          ))}
        </View>
        <View>
          <Icon
            name="attachment"
            color="#C6D3D8"
            size={20}
            style={{ backgroundColor: 'red' }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },

  header: {
    paddingVertical: 15,
  },
  tags: {
    marginHorizontal: -2,
    flexGrow: 1,
  },
  tag: {
    paddingHorizontal: 2,
  },
});
