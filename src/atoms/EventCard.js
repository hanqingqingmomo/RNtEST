// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  distanceInWordsToNow,
  format,
  isToday,
  isTomorrow,
  isYesterday,
} from 'date-fns';

import { ImageBackground, View, Text, TouchableItem, Button } from './';
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
  onPress: P => void,
  startDate: Date,
  title: string,
};

export default class EventCard extends React.Component<*, P, *> {
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

  onPress = (): void => {
    this.props.onPress(this.props);
  };

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
      <TouchableItem style={style.wrapper} onPress={this.onPress}>
        {isLive && (
          <Text
            style={style.badgeRed}
            size={13}
            color="white"
            weight="bold"
            lineHeight={20}
          >
            Live
          </Text>
        )}
        <View style={style.shadow}>
          <ImageBackground style={style.image} source={{ uri: imageURI }}>
            <View
              style={[style.container, isLive ? style.containerRed : undefined]}
            >
              <View style={style.contentTop}>
                <Text
                  style={style.title}
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
              <View style={style.contentBottom}>
                <View style={style.verticalCenter}>
                  <View style={style.icon} />
                  <Text size={13} color="white" lineHeight={15} weight="500">
                    {`  ${members}`}
                  </Text>
                </View>
                {isCommunityMember ? (
                  <TouchableItem
                    style={btnStyle.touchableWrapper}
                    onPress={this.onInviteMember}
                    hitSlop={HIT_SLOP}
                  >
                    <Text style={btnStyle.view} size={21} color="white">
                      +
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
          </ImageBackground>
        </View>
      </TouchableItem>
    );
  }
}

const btnStyle = StyleSheet.create({
  view: {
    lineHeight: 23,
    width: 24,
    height: 24,
    textAlign: 'center',
  },
  touchableWrapper: {
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: getColor('white'),
    borderStyle: 'solid',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: getColor('red'),
  },
});

const style = StyleSheet.create({
  wrapper: {
    position: 'relative',
    paddingTop: 4,
    flexGrow: 1,
  },
  container: {
    paddingHorizontal: 8,
    paddingTop: 23,
    paddingBottom: 13,
    borderRadius: 3,
    position: 'relative',
    backgroundColor: 'rgba(69, 90, 100, 0.7)',
    minHeight: 155,
  },
  containerRed: {
    borderColor: 'rgba(255,23,68,0.7)',
    borderWidth: 1,
    borderStyle: 'solid',
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
    top: 0,
    zIndex: 10,
  },
  image: {
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.14,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 4 },
  },
  contentTop: {
    flexGrow: 1,
  },
  contentBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 15,
    height: 15,
    backgroundColor: 'red',
  },
  verticalCenter: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
