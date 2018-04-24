// @flow

import React, { Component } from 'react';

import { type Poll, type UpdateData, PollEditor } from '../../blocks';
import { ScrollView, Text } from '../../atoms';

export default class PollEditorPlayground extends Component<{}, Poll> {
  state = {
    question: 'What is your name?',
    choices: ['Adam', 'Andrej', 'Vlado'],
  };

  render = () => (
    <ScrollView>
      <Text>State</Text>
      <Text style={{ marginLeft: 20 }}>Question: {this.state.question}</Text>
      <Text style={{ marginLeft: 20 }}>
        Choices: {this.state.choices.join(', ')}
      </Text>
      <Text>================</Text>
      <PollEditor
        {...this.state}
        onUpdate={(data: UpdateData) => {
          this.setState(data);
        }}
      />
    </ScrollView>
  );
}
