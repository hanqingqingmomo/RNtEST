// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { View, Text, Button, ShadowView, Count, Icon } from '../../atoms';
import { getColor } from '../../utils/color';

type Props = {
  community: Object,
  onJoin: Function,
  joined: boolean,
};

export default class JoinSection extends Component<Props> {
  get isJoined(): boolean {
    return this.props.joined || this.props.community.joined;
  }

  render() {
    const { community, onJoin } = this.props;

    return (
      <ShadowView radius={0}>
        <View style={styles.container}>
          <View style={styles.likeWrapper}>
            <Count iconName="user" count={community.members || 0} />
          </View>

          <Button.Icon
            block
            iconName={this.isJoined ? 'check' : ''}
            iconColor="#00E676"
            title={this.isJoined ? 'Joined' : 'Request to Join'}
            size="lg"
            outline={this.isJoined}
            color="#00E676"
            textColor={this.isJoined ? '#00E676' : 'white'}
            onPress={this.isJoined ? null : onJoin}
          />

          {/* <Text
            size={14}
            lineHeight={18}
            // color={getColor('gray')}
            style={styles.text}
          >
            You will receive confirmation of your request within{' '}
            <Text weight="bold">24 hours</Text>.
          </Text> */}
        </View>
      </ShadowView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 45,
    paddingVertical: 30,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginTop: 15,
  },
  likeWrapper: {
    marginBottom: 20,
  },
});
