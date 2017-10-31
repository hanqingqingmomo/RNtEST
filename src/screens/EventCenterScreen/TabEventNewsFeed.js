// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { View, Button, Text } from '../../atoms';
import EventScreen from '../EventScreen';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utlabore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

type Props = {
  communityId: string,
  navigateToPost: Object => void,
  reloadCommunity: Function,
};

export default class TabEventNewsFeed extends Component<Props> {
  static navigationOptions = {
    tabBarLabel: 'News',
  };

  render() {
    isLive = true;
    isFuture = true;
    return (
      <View>
        {isLive ? (
          <View style={styles.join}>
            <Button
              title="Join Now!"
              size="lg"
              color={getColor('#00E676')}
              textColor="white"
              onPress={() => {}}
            />
          </View>
        ) : isFuture ? (
          <View style={styles.going}>
            <Text>Are you going?</Text>
            <View style={styles.alignment}>
              <Button.Icon
                color={getColor('gray')}
                iconColor={getColor('gray')}
                iconName="close"
                outline
                size="md"
                style={css('paddingRight', 12)}
              />
              <Button.Icon
                color={getColor('green')}
                iconColor={getColor('white')}
                iconName="check"
                size="md"
              />
            </View>
          </View>
        ) : null}
        <EventScreen text={text} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  alignment: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  going: {
    height: 90,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  join: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});
