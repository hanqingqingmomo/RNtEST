// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Button, Icon, Text, View } from '../atoms';
import { getColor } from '../utils/color';
import { css } from '../utils/style';

type P = {
  actions: Object,
  amount: number,
  recurrent: boolean,
  success: boolean,
};

type TitleProps = {
  highlight?: boolean,
  text: string,
};

const Title = ({ highlight, text }: TitleProps): React$Node => (
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
                <Title highlight text={recurrent ? 'recurring' : 'one time'} />
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
            <View style={[styles.logo, styles.alignCenter]}>
              <Icon name="mpwr-logo" color="orange" size={60} />
            </View>
          </View>
        </View>
        <View style={styles.actionsWrapper}>
          {actions.tryAgain && success === false ? (
            <Button
              block
              color={getColor('orange')}
              onPress={actions.tryAgain}
              size="lg"
              textColor={getColor('white')}
              title={'Try again'}
            />
          ) : null}
          <Button
            block
            color={getColor('orange')}
            onPress={success ? actions.inviteFriends : actions.doItLater}
            outline
            size="lg"
            style={css('marginTop', 12)}
            textColor={getColor('orange')}
            title={success ? 'Invite friends' : 'Go Back'}
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
    height: 180,
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
  logo: {
    marginTop: 30,
  },
});
