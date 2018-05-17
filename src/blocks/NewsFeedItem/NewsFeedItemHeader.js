// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect, type Connector } from 'react-redux';

import { Pill, TouchableItem, View } from '../../atoms';
import { PopupActions } from '../../blocks';
import type { CommunitySimple, User, Post, PopupAction } from '../../Types';
import { selectUser } from '../../redux/selectors';
import { contentReport, contentDestroy } from '../../redux/ducks/contentObject';
import { getColor } from '../../utils/color';

type Props = {
  item: Post,
  navigateToCommunity(community: CommunitySimple): mixed,
  viewer: User,
};

type ActionCollection = {
  visible?: Props => boolean,
  action: PopupAction,
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
  get actions(): Array<PopupAction> {
    const collection: Array<ActionCollection> = [
      {
        visible: props => props.item.author.id === props.viewer.id,
        action: {
          key: 'delete',
          iconName: 'delete',
          label: 'Delete',
          onPress: () => this.props.contentDestroy(this.props.item),
        },
      },
      {
        action: {
          key: 'report',
          iconName: 'report',
          label: 'Report',
          onPress: () => this.props.contentReport(this.props.item),
        },
      },
    ];
    return collection
      .filter(({ visible }) => (visible ? visible(this.props) : true))
      .map(({ action }) => action);
  }

  render() {
    const { communities, event } = this.props.item;
    const maxPills = event ? 2 : 3;

    return (
      <View style={styles.container}>
        <View style={styles.pillsWrapper}>
          {event ? (
            <View style={styles.pill}>
              <Pill title="Event" color={getColor('gray')} truncate />
            </View>
          ) : null}
          {communities.slice(0, maxPills).map((community: CommunitySimple) => (
            <TouchableItem
              key={community.id}
              onPress={() => this.props.navigateToCommunity(community)}
              hitSlop={HIT_SLOP}
              style={styles.pill}
            >
              <Pill title={community.name} color={'orange'} truncate />
            </TouchableItem>
          ))}
        </View>
        <PopupActions actions={this.actions} />
      </View>
    );
  }
}

export default connector(NewsFeedItemHeader);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  pillsWrapper: {
    flexDirection: 'row',
    flex: 1,
  },
  pill: {
    marginRight: 2,
  },
});
