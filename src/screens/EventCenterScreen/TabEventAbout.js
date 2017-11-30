// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { View, Button, Text } from '../../atoms';
import EventScreen from '../EventScreen';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';

const LiveEventButton = () => (
  <View style={styles.join}>
    <View style={styles.joinButton}>
      <Button
        block
        title="Join Now!"
        size="lg"
        color={getColor('#00E676')}
        textColor="white"
        onPress={() => {}}
      />
    </View>
  </View>
);

const FutureEventButtons = () => (
  <View style={styles.going}>
    <Text>Are you going?</Text>
    <View style={styles.buttonsWrapper}>
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
);

export default class TabEventAbout extends Component<Props> {
  static navigationOptions = {
    tabBarLabel: 'About',
  };

  render() {
    const { event } = this.props;

    return (
      <View>
        {event.status === 'live' ? (
          <LiveEventButton />
        ) : event.status === 'future' ? (
          <FutureEventButtons />
        ) : null}
        <EventScreen text={event.description} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonsWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  going: {
    height: 90,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: getColor('#EDEFF2'),
    borderBottomWidth: 1,
  },
  joinButton: {
    width: 285,
  },
  join: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
  },
});
