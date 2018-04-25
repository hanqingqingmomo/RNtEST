// @flow

import React, { Component } from 'react';
import { StyleSheet, TextInput, Alert } from 'react-native';

import { ChoiceIcon, ChoiceRow, ChoiceButton, ChoiceInput } from './Choice';
import { getColor } from '../../utils/color';
import { View } from '../../atoms';

export type Poll = {
  question: string,
  choices: Array<string>,
};

export type UpdateData = { question: string } | { choices: Array<string> };

type Props = Poll & {
  onUpdate: UpdateData => void,
};

type State = {
  newVal: string,
};

export default class PollEditor extends Component<Props, State> {
  state = {
    newVal: '',
  };

  onAdd = () => {
    const { choices, onUpdate } = this.props;
    const { newVal } = this.state;

    const valueExist = choices.some(
      (value: string): boolean => value.toLowerCase() === newVal.toLowerCase()
    );

    if (valueExist) {
      Alert.alert('Ooops', 'This option exists already!');
    } else {
      choices.push(newVal);
      this.setState({ newVal: '' });
      onUpdate({ choices });
    }
  };

  render(): React$Node {
    const { question, choices, onUpdate } = this.props;
    const { newVal } = this.state;

    return (
      <View style={styles.pollEditor}>
        <TextInput
          style={styles.question}
          underlineColorAndroid="transparent"
          placeholder="Poll question"
          placeholderTextColor="#B0BEC5"
          value={question}
          onChangeText={(question: string) => {
            onUpdate({ question });
          }}
        />

        {choices.map((choice, index) => (
          <ChoiceRow key={index}>
            <ChoiceInput
              value={choice}
              placeholder={`Choice ${index + 1}`}
              onChangeText={(text: string) => {
                choices[index] = text;
                onUpdate({ choices });
              }}
            />

            <ChoiceButton
              onPress={() => {
                choices.splice(index, 1);
                onUpdate({ choices });
              }}
            >
              <ChoiceIcon name="close" />
            </ChoiceButton>
          </ChoiceRow>
        ))}

        <ChoiceRow>
          <ChoiceInput
            value={newVal}
            placeholder={`Choice ${choices.length + 1}`}
            onChangeText={(newVal: string) => {
              this.setState({ newVal });
            }}
          />

          <ChoiceButton onPress={this.onAdd} disabled={!newVal}>
            <ChoiceIcon name="plus" color={getColor('orange')} />
          </ChoiceButton>
        </ChoiceRow>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pollEditor: {
    paddingLeft: 20,
    paddingRight: 13,
    backgroundColor: 'white',
  },
  question: {
    marginVertical: 20,
    color: '#455A64',
    fontSize: 15,
    fontWeight: '100',
    padding: 0,
  },
});
