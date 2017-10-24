// @flow

import React, { Component } from 'react';

import { View, Screen } from '../atoms';
import { HelpBlock } from '../blocks';

const help = [
  {
    title: 'General inquiries:',
    text: ['support@poweredbyaction.org'],
  },
  {
    title: 'How to sign in:',
    text: [
      'https://poweredbyaction.zendesk.com/hc/en-us/articles/216805898-How-to-Access-PbA',
    ],
  },
  {
    title: 'Mobile Embedded Posting:',
    text: [
      'https://poweredbyaction.zendesk.com/hc/en-us/articles/115002308931',
    ],
  },
  {
    title: 'Email Notifications:',
    text: ['https://poweredbyaction.zendesk.com/hc/en-us/articles/217509198'],
  },
  {
    title: 'Pinned posts:',
    text: ['https://poweredbyaction.zendesk.com/hc/en-us/articles/219495368'],
  },
  {
    title: 'Donation:',
    text: [
      'https://poweredbyaction.zendesk.com/hc/en-us/articles/115002319692',
    ],
  },
  {
    title: 'Cancel Payment:',
    text: [
      'To cancel or change your recurring donation to the YWCA Metropolitan Chicago, please email us at: support@poweredbyaction.org',
    ],
  },
];

export default class HelpScreen extends Component<{}> {
  render() {
    return (
      <Screen>
        <View>{help.map((bag, idx) => <HelpBlock key={idx} {...bag} />)}</View>
      </Screen>
    );
  }
}
