// @flow

import React, { Component } from 'react';
import { AsyncStorage, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';

import { View, Icon, Button, Text } from '../../atoms';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';

const key = 'friendInvitationWidgetWasClosed';

type State = {
  isCollapsed: boolean,
  wasClosed: boolean,
};

type Props = {
  openModal: Function,
};

export default class FriendInvitationWidget extends Component<Props, State> {
  state = {
    isCollapsed: false,
    wasClosed: true,
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = async () => {
    const wasClosed = await AsyncStorage.getItem(key);

    this.setState({
      wasClosed,
    });
  };

  onClosePress = () => {
    this.setState({
      isCollapsed: true,
    });

    AsyncStorage.setItem(key, '"true"');
  };

  onOpenPress = () => {
    this.props.openModal();
    this.onClosePress();
  };

  render() {
    const { wasClosed, isCollapsed } = this.state;

    if (wasClosed) {
      return null;
    }

    return (
      <Collapsible collapsed={isCollapsed}>
        <View style={styles.inviteContainer}>
          <Button.Icon
            iconName="close-bold"
            iconColor={getColor('gray')}
            size="lg"
            style={styles.closeBtn}
            onPress={this.onClosePress}
          />
          <Icon
            name="invite-feed"
            color="#CBD4D8"
            size={70}
            style={{ backgroundColor: 'transparent' }}
          />
          <Text
            color={getColor('gray')}
            lineHeight={20}
            size={14}
            style={[
              css('marginBottom', 20),
              css('marginTop', 15),
              css('textAlign', 'center'),
            ]}
          >
            You think some of your friends might be interested to join our
            organization?
          </Text>
          <Button
            title="Invite friends"
            color={getColor('orange')}
            textColor={getColor('white')}
            size="lg"
            onPress={this.onOpenPress}
          />
        </View>
      </Collapsible>
    );
  }
}

const styles = StyleSheet.create({
  inviteContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    overflow: 'hidden',
    backgroundColor: '#F4F5F7',
  },
  closeBtn: {
    position: 'absolute',
    right: 20,
    top: 30,
  },
});
