// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';

import { View, Icon, Button, Text } from '../../atoms';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';

type State = {
  isCollapsed: boolean,
};

export default class FriendInvitationWidget extends Component<{}, State> {
  state = {
    isCollapsed: false,
  };

  render() {
    return (
      <Collapsible collapsed={this.state.isCollapsed}>
        <View style={styles.inviteContainer}>
          <Button.Icon
            iconName="close-bold"
            iconColor={getColor('gray')}
            size="lg"
            style={styles.closeBtn}
            onPress={() => this.setState({ isCollapsed: true })}
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
            onPress={this.props.openModal}
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
  },
  closeBtn: {
    position: 'absolute',
    right: 20,
    top: 30,
  },
});
