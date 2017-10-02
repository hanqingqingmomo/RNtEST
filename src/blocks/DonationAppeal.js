// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, Button, TouchableItem, Icon } from '../atoms';
import { getColor } from '../utils/color';
import { css } from '../utils/style';

const HIT_SLOP = {
  top: 6,
  right: 6,
  bottom: 6,
  left: 6,
};

type P = {
  onClose: () => void,
  onConfirm: (status: 'confirmed' | 'declined') => void,
};

export default class DonationScreen extends React.Component<*, P, *> {
  confirm = () => {
    this.props.onConfirm('confirmed');
  };

  decline = () => {
    this.props.onConfirm('declined');
  };

  close = () => {
    this.props.onClose();
  };

  render() {
    return (
      <View style={style.wrapper}>
        <View style={style.contentTop}>
          <TouchableItem
            onPress={this.close}
            style={style.closeBtn}
            hitSlop={HIT_SLOP}
          >
            <Icon
              style={style.closeBtnText}
              size={20}
              color="white"
              name="close"
            />
          </TouchableItem>
          <Icon size={100} name="donate" color="white" style={style.icon} />
        </View>
        <View style={style.contentBottom}>
          <Text
            size={19}
            weight="500"
            lineHeight={20}
            style={[style.title, css('color', '#455A64')]}
          >
            Make a Donation
          </Text>
          <Text
            size={14}
            lineHeight={18}
            style={[style.description, css('color', '#455A64')]}
          >
            Make a donation in support for the YWCA’s global conversation
            efforts and choose a thank-you gift
          </Text>
          <Button
            title="Donate now"
            size="lg"
            color={getColor('orange')}
            textColor="white"
            onPress={this.confirm}
          />
          <Button
            title="Maybe later"
            size="lg"
            color="transparent"
            textColor={getColor('orange')}
            onPress={this.decline}
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    width: '100%',
  },
  contentTop: {
    height: 160,
    backgroundColor: getColor('orange'),
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  contentBottom: {
    paddingTop: 24,
    paddingBottom: 12,
    paddingHorizontal: 42,
    backgroundColor: 'white',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
  },
  title: {
    textAlign: 'center',
    marginBottom: 14,
  },
  description: {
    textAlign: 'center',
    marginBottom: 40,
  },
  closeBtn: {
    position: 'absolute',
    top: 15,
    right: 20,
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  closeBtnText: {
    textAlign: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    textAlign: 'center',
  },
});
