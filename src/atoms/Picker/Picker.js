// @flow

import React from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { PickerList } from './PickerList';
import { PickerHeader } from './PickerHeader';
import { PickerFooter } from './PickerFooter';

type Selection = Array<string>;

type Props<T> = $Exact<{
  data: Array<T>,
  description?: string,
  extractOption: T => { label: string, value: string },
  multiple: boolean,
  onValuesChange: Selection => mixed,
  optionKeyExtractor: T => string,
  PickerHeaderComponent?: React$Node,
  selectedValues: Selection,
  title?: string,
  trigger: React$Node,
}>;

type State = {
  selectedValues: Selection,
  visible: boolean,
  visibleContent: boolean,
};

// Constants
const WINDOW_HEIGHT = (Dimensions.get('window').height: number);
const WINDOW_WIDTH = (Dimensions.get('window').width: number);

// State Reducers
const toggleSelectedValue = (index: string) => (
  state: State
): $Shape<State> => ({
  selectedValues: state.selectedValues.includes(index)
    ? state.selectedValues.filter(value => value !== index)
    : state.selectedValues.concat(index),
});

const setSelectedValue = (index: string) => (state: State): $Shape<State> => ({
  selectedValues: state.selectedValues.includes(index) ? [] : [index],
});

// Component
export class Picker extends React.Component<Props<*>, State> {
  static defaultProps = {
    multiple: false,
  };

  state = {
    selectedValues: this.props.selectedValues,
    visible: false,
    visibleContent: false,
  };

  _animToggle: Animated.Value = new Animated.Value(0);

  componentWillReceiveProps(nextProps: Props<*>) {
    if (nextProps.selectedValues !== this.props.selectedValues) {
      this.setState({ selectedValues: nextProps.selectedValues });
    }
  }

  animateIn() {
    this.setState({ visible: true, visibleContent: true });
    Animated.timing(this._animToggle, {
      duration: 350,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  animateOut() {
    Animated.timing(this._animToggle, {
      duration: 350,
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ visibleContent: false });
      this.setState({ visible: false });
    });
  }

  openModal = () => {
    Keyboard.dismiss();
    this.animateIn();
  };

  hideModal = () => {
    this.animateOut();
  };

  toggleOption = (value: string) => {
    if (this.props.multiple) {
      this.setState(toggleSelectedValue(value));
    } else {
      this.setState(setSelectedValue(value));
    }
  };

  onSubmit = () => {
    this.props.onValuesChange(this.state.selectedValues);
    this.hideModal();
  };

  renderContent(): React$Node {
    return (
      <Animated.View
        style={{
          marginTop: 'auto',
          marginBottom: 15,
          alignSelf: 'center',
          maxWidth: Math.min(WINDOW_WIDTH - 30, 425),
          maxHeight: Math.min(WINDOW_HEIGHT - 100, 600),
          backgroundColor: 'white',
          justifyContent: 'flex-end',
          borderRadius: 15,
          transform: [
            {
              translateY: this._animToggle.interpolate({
                inputRange: [0, 1],
                outputRange: [WINDOW_HEIGHT, 0],
              }),
            },
          ],
        }}
      >
        {this.props.PickerHeaderComponent ? (
          this.props.PickerHeaderComponent
        ) : (
          <PickerHeader
            title={this.props.title}
            description={this.props.description}
          />
        )}

        <PickerList
          selected={this.state.selectedValues}
          onItemPress={this.toggleOption}
          data={this.props.data}
          extractOption={this.props.extractOption}
        />

        <PickerFooter onCancel={this.hideModal} onConfirm={this.onSubmit} />
      </Animated.View>
    );
  }

  render(): React$Node {
    return (
      <View>
        <TouchableOpacity onPress={this.openModal}>
          <View pointerEvents="none">{this.props.trigger}</View>
        </TouchableOpacity>
        <Modal
          transparent
          visible={this.state.visible}
          onRequestClose={this.hideModal}
        >
          {this.state.visibleContent ? (
            <Animated.View
              pointerEvents="none"
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'rgba(0,0,0,.75)',
                opacity: this._animToggle.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              }}
            />
          ) : null}

          {this.state.visibleContent ? this.renderContent() : null}
        </Modal>
      </View>
    );
  }
}
