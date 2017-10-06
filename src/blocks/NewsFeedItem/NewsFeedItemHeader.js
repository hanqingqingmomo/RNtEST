// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { View, Pill, Icon, TouchableItem } from '../../atoms';

type TagProps = {
  disabled?: boolean,
  name: string,
};

type P = {
  onMorePress: () => void,
  onTagPress: TagProps => void,
  tags: Array<TagProps>,
};

const HIT_SLOP = {
  top: 2,
  right: 2,
  bottom: 2,
  left: 2,
};

export default class NewsFeedItemHeader extends Component<P, void> {
  render() {
    return (
      <View style={[styles.header, styles.row]}>
        <View style={[styles.tags, styles.row]}>
          {this.props.tags.map((tag: TagProps) => (
            <View style={styles.tag} key={tag.name}>
              <TouchableItem
                onPress={() => this.props.onTagPress(tag)}
                disabled={tag.disabled}
                hitSlop={HIT_SLOP}
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
          <TouchableItem onPress={this.props.onMorePress} hitSlop={HIT_SLOP}>
            <Icon name="menu" color="#C6D3D8" size={20} />
          </TouchableItem>
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
