// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { View, Text, Button, ShadowView, Like } from '../../atoms';
import { getColor } from '../../utils/color';

type Props = {
  community: Object,
  navigateToPost: Object => void,
};

export default class NewsTab extends Component<Props> {
  render() {
    const { community } = this.props;
    return (
      <ShadowView radius={0}>
        <View style={styles.container}>
          <View style={styles.likeWrapper}>
            <Like iconName="user" count={community.members || 0} />
          </View>

          <Button
            block
            title="Request to Join"
            size="lg"
            color="#00E676"
            textColor="white"
          />

          <Text
            size={14}
            lineHeight={18}
            color={getColor('gray')}
            style={styles.text}
          >
            You will receive confirmation of your request within{' '}
            <Text weight="bold">24 hours</Text>.
          </Text>
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
