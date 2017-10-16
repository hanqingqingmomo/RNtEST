// @flow

import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Modal from 'react-native-modalbox';

import { Text, View, Button, TouchableItem, Icon } from '../atoms';
import { getColor } from '../utils/color';
import { css } from '../utils/style';

const HIT_SLOP = {
  top: 6,
  right: 6,
  bottom: 6,
  left: 6,
};

type Props = {
  forceOpen?: boolean,
  onConfirm: () => void,
};

type State = {
  open: boolean,
};

export default class DonationScreen extends Component<Props, State> {
  state = {
    open: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ open: true });
    }, 60000);
  }

  confirm = () => {
    this.props.onConfirm();
    this.setState({ open: false });
  };

  close = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Modal
        isOpen={this.props.forceOpen || this.state.open}
        backdrop
        swipeToClose={false}
        position="center"
        style={styles.modalWrapper}
      >
        <View style={styles.wrapper}>
          <View style={styles.contentTop}>
            <TouchableItem
              onPress={this.close}
              style={styles.closeBtn}
              hitSlop={HIT_SLOP}
            >
              <Icon
                style={styles.closeBtnText}
                size={20}
                color="white"
                name="close"
              />
            </TouchableItem>
            <Icon size={100} name="donate" color="white" style={styles.icon} />
          </View>
          <View style={styles.contentBottom}>
            <Text
              size={19}
              weight="500"
              lineHeight={20}
              style={[styles.title, css('color', '#455A64')]}
            >
              Make a Donation
            </Text>
            <Text
              size={14}
              lineHeight={18}
              style={[styles.description, css('color', '#455A64')]}
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
              onPress={this.close}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width - 50,
    height: 410,
    backgroundColor: 'transparent',
  },
  wrapper: {
    borderRadius: 10,
    overflow: 'hidden',
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
