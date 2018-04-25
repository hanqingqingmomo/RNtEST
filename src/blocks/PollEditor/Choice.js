// @flow

import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { getColor } from '../../utils/color';
import { Icon, View, TouchableOpacity } from '../../atoms';

type ButtonProps = {
  disabled?: boolean,
  children?: any,
  onPress: Function,
  style?: any,
};

type InputProps = {
  onChangeText: string => void,
  placeholder: string,
  value: string,
};

type IconProps = {
  name: string,
};

type RowProps = {
  children: any,
};

type Props = InputProps & {
  disabledButton?: boolean,
  children?: any,
  onButtonPress: Function,
};

type State = {
  isFocused: boolean,
};

export const ChoiceIcon = (props: IconProps) => {
  return <Icon size={13} color="#455A64" {...props} />;
};

export const ChoiceButton = ({
  children,
  style,
  ...bag
}: ButtonProps): React$Node => {
  return (
    <TouchableOpacity {...bag} style={[styles.iconColumn, style]}>
      {children}
    </TouchableOpacity>
  );
};

export const ChoiceRow = ({ children }: RowProps): React$Node => {
  return <View style={styles.row}>{children}</View>;
};

export class ChoiceInput extends Component<InputProps, State> {
  state = {
    isFocused: false,
  };

  onFocus = () => {
    this.setState({ isFocused: true });
  };

  onBlur = () => {
    this.setState({ isFocused: false });
  };

  render(): React$Node {
    return (
      <TextInput
        style={[
          styles.textInput,
          this.state.isFocused ? styles.focused : undefined,
        ]}
        placeholderTextColor="#B0BEC5"
        underlineColorAndroid="transparent"
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        {...this.props}
      />
    );
  }
}

export default ({
  onButtonPress,
  children,
  disabledButton,
  ...bag
}: Props): React$Node => {
  return (
    <ChoiceRow>
      <ChoiceInput {...bag} />

      <ChoiceButton onPress={onButtonPress} disabled={disabledButton}>
        {children}
      </ChoiceButton>
    </ChoiceRow>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    color: '#455A64',
    fontSize: 14,
    fontWeight: '100',
    paddingHorizontal: 12,
    flex: 1,
    borderColor: '#ECEFF1',
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    height: 44,
    marginVertical: 5,
  },
  focused: {
    borderColor: getColor('orange'),
  },
  iconColumn: {
    padding: 20,
    width: 40 + 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
