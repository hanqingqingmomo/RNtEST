// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { CenterView, Icon, Screen, TableView, Text } from '../atoms';
import { getColor } from '../utils/color';
import { css } from '../utils/style';

const { Table, Section, Cell } = TableView;

const communities = [
  {
    img: 'https://d30y9cdsu7xlg0.cloudfront.net/png/223566-200.png',
    name: 'Child Care Provider Training & Assistance',
  },
  {
    img: 'https://d30y9cdsu7xlg0.cloudfront.net/png/223566-200.png',
    name: 'Drive to Thrive',
  },
  {
    img: 'https://d30y9cdsu7xlg0.cloudfront.net/png/223566-200.png',
    name: 'Child Care Assistance Program',
  },
  {
    img: 'https://d30y9cdsu7xlg0.cloudfront.net/png/223566-200.png',
    name: '3D Youth',
  },
  {
    img: 'https://d30y9cdsu7xlg0.cloudfront.net/png/223566-200.png',
    name: 'Community5',
  },
  {
    img: 'https://d30y9cdsu7xlg0.cloudfront.net/png/223566-200.png',
    name: 'Young Parents Program',
  },
];

export default class NewsFeedSettingsScreen extends React.Component<{}> {
  static navigationOptions = {
    title: 'Prioritize',
  };

  render() {
    return (
      <Screen>
        <Table>
          <Section sectionPaddingTop={0}>
            <CenterView style={styles.infoContainer}>
              <Text
                size={19}
                color="#455A64"
                weight="500"
                style={css('lineHeight', 25)}
              >
                Choose what to see first
              </Text>
              <Text
                size={14}
                color="#455A64"
                style={css('textAlign', 'center')}
              >
                You can select which community posts you want to see on the top
                of your main News Feed.
              </Text>
            </CenterView>
          </Section>
          <Section header="Your communities">
            {communities.map((community, i) => (
              <Cell
                key={i + community.name}
                title={community.name}
                image={
                  <Icon name="communities" color={getColor('gray')} size="lg" />
                }
                accessory="Checkmark"
                onPress={() => {}}
                disableImageResize
              />
            ))}
          </Section>
        </Table>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: getColor('white'),
    paddingVertical: 30,
    paddingHorizontal: 35,
    marginTop: -1,
  },
});
