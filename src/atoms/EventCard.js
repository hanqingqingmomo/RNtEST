// @flow

import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import {
  distanceInWordsToNow,
  format,
  isToday,
  isTomorrow,
  isYesterday,
} from 'date-fns';
import Color from 'color';

import {
  Icon,
  Image,
  View,
  Text,
  TouchableItem,
  Button,
  ShadowView,
} from './index';
import { getColor } from '../utils/color';

const HIT_SLOP = {
  top: 6,
  right: 6,
  bottom: 6,
  left: 6,
};

type P = {
  endDate?: Date,
  imageURI: string,
  isCommunityMember: boolean,
  isLive?: boolean,
  members: number,
  onInviteMember: P => void,
  onJoin: P => void,
  startDate: Date,
  title: string,
};

export default class EventCard extends Component<P> {
  formatDate(date: Date): string {
    if (isToday(date)) {
      return 'Today';
    } else if (isTomorrow(date)) {
      return 'Tomorrow';
    } else if (isYesterday(date)) {
      return 'Yesterday';
    }

    const string = distanceInWordsToNow(date, {
      addSuffix: true,
    });

    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getDateRange(startDate: Date, endDate?: Date): string {
    let range = format(startDate, 'hh:mm A');
    return endDate ? `${range} - ${format(endDate, 'hh:mm A')}` : range;
  }

  onJoin = (): void => {
    this.props.onJoin(this.props);
  };

  onInviteMember = (): void => {
    this.props.onInviteMember(this.props);
  };

  render() {
    const {
      isLive,
      imageURI,
      startDate,
      endDate,
      members,
      title,
      isCommunityMember,
    } = this.props;

    return (
      <View>
        {isLive ? (
          <Text
            style={styles.badgeRed}
            size={13}
            color="white"
            weight="bold"
            lineHeight={Platform.select({ ios: 20, android: 19 })}
          >
            Live
          </Text>
        ) : null}
        <ShadowView radius={3}>
          <View style={[styles.border, isLive ? styles.borderRed : undefined]}>
            <Image
              style={styles.image}
              source={{ uri: imageURI }}
              resizeMode="cover"
            />
            <View style={styles.overlay}>
              <View style={styles.contentTop}>
                <Text
                  style={styles.title}
                  size={15}
                  color="white"
                  fontWeight="600"
                  lineHeight={18}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {title}
                </Text>
                <Text size={13} color="white" lineHeight={15} weight="500">
                  {this.formatDate(startDate)},{'\n'}
                  {this.getDateRange(startDate, endDate)}
                </Text>
              </View>
              <View style={styles.contentBottom}>
                <View style={styles.verticalCenter}>
                  <Icon name="user" size={17} color="white" />
                  <Text size={13} color="white" lineHeight={17} weight="500">
                    {`  ${members}`}
                  </Text>
                </View>
                {isCommunityMember ? (
                  <TouchableItem
                    style={styles.buttonWrapper}
                    onPress={this.onInviteMember}
                    hitSlop={HIT_SLOP}
                  >
                    <Text style={styles.button} color="white">
                      <Icon name="plus" size={16} color="white" />
                    </Text>
                  </TouchableItem>
                ) : (
                  <Button
                    title="Join"
                    size="sm"
                    color="#00E676"
                    textColor="white"
                    style={{ marginVertical: 1 }}
                    onPress={this.onJoin}
                  />
                )}
              </View>
            </View>
          </View>
        </ShadowView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    lineHeight: 23,
    width: 24,
    height: 24,
    textAlign: 'center',
  },
  buttonWrapper: {
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: getColor('white'),
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: getColor('red'),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    backgroundColor: 'rgba(69, 90, 100, 0.7)',
    paddingHorizontal: 8,
    paddingTop: 23,
    paddingBottom: 13,
    borderRadius: 2,
  },
  border: {
    borderRadius: 3,
    overflow: 'hidden',
    height: 155,
  },
  borderRed: {
    borderColor: Color(getColor('red')).alpha(0.7),
    borderWidth: 1,
  },
  title: {
    marginBottom: 10,
  },
  badgeRed: {
    backgroundColor: getColor('red'),
    width: 46,
    height: 20,
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    top: -4,
    zIndex: 10,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 2,
  },
  contentTop: {
    flexGrow: 1,
  },
  contentBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verticalCenter: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
