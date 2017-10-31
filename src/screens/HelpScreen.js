// @flow

import React, { Component } from 'react';
import { Linking } from 'react-native';

import { Screen, TableView, Icon, Text } from '../atoms';
import type { ScreenProps } from '../Types';

type Props = ScreenProps<*>;

const LINKS = [
  {
    title: 'How to sign in',
    link:
      'https://poweredbyaction.zendesk.com/hc/en-us/articles/216805898-How-to-Access-PbA',
  },
  {
    title: 'Mobile Embedded Posting',
    link: 'https://poweredbyaction.zendesk.com/hc/en-us/articles/115002308931',
  },
  {
    title: 'Email Notifications',
    link: 'https://poweredbyaction.zendesk.com/hc/en-us/articles/217509198',
  },
  {
    title: 'Pinned posts',
    link: 'https://poweredbyaction.zendesk.com/hc/en-us/articles/219495368',
  },
  {
    title: 'Donation',
    link: 'https://poweredbyaction.zendesk.com/hc/en-us/articles/115002319692',
  },
];

export default class HelpScreen extends Component<Props> {
  render() {
    return (
      <Screen>
        <TableView.Table>
          <TableView.Section header="General inquiries">
            <TableView.Cell
              cellStyle="Basic"
              title="support@poweredbyaction.org"
              accessory="DisclosureIndicator"
              onPress={() =>
                Linking.openURL('mailto:support@poweredbyaction.org')}
            />
          </TableView.Section>
          <TableView.Section header="Cancel Payment">
            <TableView.Cell
              cellContentView={
                <Text style={{ paddingVertical: 15 }} color="#455A64" size={15}>
                  To cancel or change your recurring donation to the YWCA
                  Metropolitan Chicago, please email us at:
                  support@poweredbyaction.org
                </Text>
              }
            />
          </TableView.Section>
          <TableView.Section>
            {LINKS.map(link => (
              <TableView.Cell
                cellStyle="Basic"
                key={link.title}
                title={link.title}
                image={<Icon size="md" name="link" color="#CFD8DC" />}
                accessory="DisclosureIndicator"
                onPress={() =>
                  this.props.navigation.navigate('WebViewScreen', {
                    webURL: link.link,
                    title: link.title,
                  })}
              />
            ))}
          </TableView.Section>
        </TableView.Table>
      </Screen>
    );
  }
}
