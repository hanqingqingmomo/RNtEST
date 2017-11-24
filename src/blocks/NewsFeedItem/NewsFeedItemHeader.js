// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect, type Connector } from 'react-redux';

import { Pill, TouchableItem, View } from '../../atoms';
import { SettingsPopup } from '../../blocks';
// TODO move PopupSetting declaration into component
import type { CommunitySimple, User, Post, PopupSetting } from '../../Types';
import { selectUser } from '../../redux/selectors';
import { contentReport, contentDestroy } from '../../redux/ducks/contentObject';

type Props = {
  item: Post,
  navigateToCommunity: (community: CommunitySimple) => mixed,
  navigation: Object,
  onDelete: Function,
  viewer: User,
};

const mapState = state => ({
  viewer: selectUser(state),
});

const mapDispatch = { contentDestroy, contentReport };

const connector: Connector<Props, Props> = connect(mapState, mapDispatch);

const HIT_SLOP = {
  top: 2,
  right: 2,
  bottom: 2,
  left: 2,
};

class NewsFeedItemHeader extends Component<Props> {
  get popupActions() {
    return [
      {
        key: 'delete',
        iconName: 'delete',
        label: 'Delete',
        isHidden: ({ viewer, author }) => author.id !== viewer.id,
        onPress: () => this.props.contentDestroy(this.props.item),
      },
      {
        key: 'report',
        iconName: 'report',
        label: 'Report',
        onPress: () => this.props.contentReport(this.props.item),
      },
    ].filter(
      (setting: PopupSetting) =>
        !setting.isHidden ||
        !setting.isHidden({
          viewer: this.props.viewer,
          author: this.props.item.author,
        })
    );
  }

  render() {
    return (
      <View style={[styles.header, styles.row]}>
        <View style={[styles.tags, styles.row]}>
          {this.props.item.communities
            .slice(0, 3)
            .map((community: CommunitySimple) => (
              <View style={styles.tag} key={community.id}>
                <TouchableItem
                  onPress={() => this.props.navigateToCommunity(community)}
                  hitSlop={HIT_SLOP}
                >
                  <View style={{ backgroundColor: 'white' }}>
                    <Pill title={community.name} color={'orange'} />
                  </View>
                </TouchableItem>
              </View>
            ))}
        </View>

        <SettingsPopup settings={this.popupActions} />
      </View>
    );
  }
}

export default connector(NewsFeedItemHeader);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  header: {
    paddingVertical: 15,
  },
  tags: {
    marginHorizontal: -2,
    flex: 1,
  },
  tag: {
    paddingHorizontal: 2,
  },
});
