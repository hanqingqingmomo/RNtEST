// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import format from 'date-fns/format';
import isBefore from 'date-fns/is_before';
import isAfter from 'date-fns/is_after';

import {
  ImageBackground,
  Pill,
  Text,
  View,
  TouchableOpacity,
} from '../../atoms';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';
import type { Community } from '../../Types';

type Props = {
  title: string,
  cover_photo: string,
  start: Date,
  end: Date,
  location: string,
  post_in: Array<Community>,
};

type State = {
  showAllPills: boolean,
};

export default class EventHeader extends Component<Props, State> {
  state = {
    showAllPills: false,
  };

  get isBetween(): boolean {
    return (
      isBefore(new Date(), this.props.end) &&
      isAfter(new Date(), this.props.start)
    );
  }

  get status(): string {
    if (this.isBetween) {
      return 'In Progress';
    }

    if (isAfter(new Date(), this.props.end)) {
      return format(this.props.start, 'MM/DD/YYYY');
    }

    return format(this.props.start, 'MM/DD/YYYY');
  }

  onShowAllCommunities = () => {
    this.setState({ showAllPills: !this.state.showAllPills });
  };

  _renderPills(communities: Array<Community>) {
    const copy = [...communities];
    const max = this.state.showAllPills ? copy.length : 1;
    const items = copy.splice(0, max);

    function renderPill(title: string, key?: string) {
      return (
        <View style={css('margin', 2)} key={key}>
          <Pill color={getColor('white')} title={title} />
        </View>
      );
    }

    return (
      <View style={[css('flexDirection', 'row'), css('flexWrap', 'wrap')]}>
        {items.map((community: Community) =>
          renderPill(community.name, community.id)
        )}
        {copy.length > 0 ? (
          <TouchableOpacity onPress={this.onShowAllCommunities}>
            {renderPill(`+${copy.length}`)}
          </TouchableOpacity>
        ) : this.state.showAllPills ? (
          <TouchableOpacity onPress={this.onShowAllCommunities}>
            {renderPill('<')}
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  render() {
    const { title, cover_photo, start, end, location, post_in } = this.props;

    return (
      <ImageBackground
        source={cover_photo ? { uri: cover_photo } : require('./bg.jpg')}
        style={styles.container}
      >
        <View style={[styles.dimm, StyleSheet.absoluteFill]} />
        <View style={styles.headerContainer}>
          <View style={styles.textWrapper}>
            <Text
              color={getColor('white')}
              lineHeight={24}
              size={20}
              style={css('marginBottom', 6)}
            >
              {title}
            </Text>
            <Text
              color={getColor('white')}
              lineHeight={16}
              size={14}
              weight="500"
            >
              {`${this.status}, ${format(start, 'h:mm A')} - ${format(
                end,
                'h:mm A'
              )}, ${location}`}
            </Text>
          </View>

          {this._renderPills(post_in)}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 186,
  },
  dimm: {
    backgroundColor: '#161D21',
    opacity: 0.35,
  },
  headerContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    justifyContent: 'flex-end',
    flex: 1,
  },
  textWrapper: {
    backgroundColor: 'transparent',
    paddingBottom: 10,
    width: '100%',
  },
});
