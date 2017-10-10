// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Button, Icon, Text, TouchableItem, View } from '../atoms';
import { getColor } from '../utils/color';
import { css } from '../utils/style';

const HIT_SLOP = {
  top: 6,
  right: 6,
  bottom: 6,
  left: 6,
};

type P = {
  actions: Object,
  amount: boolean,
  recurrent: any,
  success: boolean,
};

const Title = ({ highlight, text }) => (
  <Text
    lineHeight={22}
    size={21}
    style={[
      styles.title,
      css('color', highlight ? getColor('orange') : '#455A64'),
    ]}
    weight="600"
  >
    {text}
  </Text>
);

export default class DonationResult extends Component<P> {
  render() {
    const { actions, amount, recurrent, success } = this.props;

    return (
      <View style={styles.wrapper}>
        <View>
          <View style={[styles.alignCenter, styles.contentTop]}>
            <TouchableItem
              onPress={actions.onClose}
              style={styles.closeBtn}
              hitSlop={HIT_SLOP}
            >
              <Icon
                style={styles.closeBtnText}
                size={20}
                color="orange"
                name="close"
              />
            </TouchableItem>
            <Icon
              size={128}
              name="donate"
              color="orange"
              style={styles.donateIcon}
            />
          </View>
          <View style={styles.contentBottom}>
            {success ? (
              <View style={styles.titleWrapper}>
                <Title text="Your " />
                <Title highlight text={recurrent ? 'recurrent' : 'one time'} />
                <Title text=" donation of " />
                <Title highlight text={`$${amount}`} />
                <Title text=" is successful!" />
              </View>
            ) : (
              <View style={styles.titleWrapper}>
                <Title text="Oh snap! Something went " />
                <Title highlight text="wrong" />
                <Title text="." />
              </View>
            )}
            {success ? (
              <Text
                size={16}
                lineHeight={18}
                style={[styles.subtitle, css('color', '#455A64')]}
              >
                Thank you for your generous gift and supporting our YWCA family
              </Text>
            ) : (
              <Text
                size={16}
                lineHeight={18}
                style={[styles.subtitle, css('color', '#455A64')]}
              >
                For some reason we couldn't finalize your donation
              </Text>
            )}
            <View style={styles.alignCenter}>
              <Icon name="ywca" color="orange" size={80} />
            </View>
          </View>
        </View>
        <View style={styles.actionsWrapper}>
          <Button
            block
            color={getColor('orange')}
            onPress={success ? actions.spreadTheWord : actions.tryAgain}
            size="lg"
            textColor={getColor('white')}
            title={success ? 'Spread the word' : 'Try again'}
          />
          <Button
            block
            color={getColor('orange')}
            onPress={success ? actions.inviteFriends : actions.doItLater}
            outline
            size="lg"
            style={css('marginTop', 12)}
            textColor={getColor('orange')}
            title={success ? 'Invite friends' : 'Do it later'}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    backgroundColor: 'white',
    flexGrow: 1,
    justifyContent: 'space-between',
    width: '100%',
  },
  contentTop: {
    height: 200,
  },
  contentBottom: {
    paddingTop: 24,
    paddingBottom: 12,
    paddingHorizontal: 42,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  title: {
    textAlign: 'center',
  },
  titleWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  closeBtn: {
    position: 'absolute',
    top: 15,
    left: 20,
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  closeBtnText: {
    textAlign: 'center',
  },
  donateIcon: {
    paddingTop: 42,
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsWrapper: {
    paddingBottom: 48,
    paddingHorizontal: 42,
    overflow: 'hidden',
  },
});
