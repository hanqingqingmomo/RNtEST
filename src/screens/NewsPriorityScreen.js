// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { ScrollView, TableView, Text, View, Icon, Screen } from '../atoms';
import { getColor } from '../utils/color';

const { Table, Section, Cell } = TableView;

const communities = [
  {
    img: 'https://d30y9cdsu7xlg0.cloudfront.net/png/223566-200.png',
    name: 'Community1',
  },
  {
    img: 'https://d30y9cdsu7xlg0.cloudfront.net/png/223566-200.png',
    name: 'Community2',
  },
  {
    img: 'https://d30y9cdsu7xlg0.cloudfront.net/png/223566-200.png',
    name: 'Community3',
  },
  {
    img: 'https://d30y9cdsu7xlg0.cloudfront.net/png/223566-200.png',
    name: 'Community4',
  },
  {
    img: 'https://d30y9cdsu7xlg0.cloudfront.net/png/223566-200.png',
    name: 'Community5',
  },
  {
    img: 'https://d30y9cdsu7xlg0.cloudfront.net/png/223566-200.png',
    name: 'Community6',
  },
  {
    img: 'https://d30y9cdsu7xlg0.cloudfront.net/png/223566-200.png',
    name: 'Community7',
  },
  {
    img: 'https://d30y9cdsu7xlg0.cloudfront.net/png/223566-200.png',
    name: 'Community8',
  },
  {
    img: 'https://d30y9cdsu7xlg0.cloudfront.net/png/223566-200.png',
    name: 'Community9',
  },
  {
    img: 'https://d30y9cdsu7xlg0.cloudfront.net/png/223566-200.png',
    name: 'Community10',
  },
];

export default class NewsPriorityScreen extends React.Component<*, *, *> {
  static navigationOptions = {
    title: 'Prioritize',
  };

  render() {
    return (
      <Screen>
        <ScrollView>
          <Table>
            <Section sectionPaddingTop={0}>
              <View style={styles.infoContainer}>
                <View style={styles.margin}>
                  <Text style={styles.bigText}>Choose what to see first</Text>
                  <Text style={styles.regularText}>
                    You can select which community posts you want to see on the
                    top of your main News Feed.
                  </Text>
                </View>
              </View>
            </Section>
            <Section header="Your communities">
              {communities.map((community, i) => (
                <Cell
                  key={i + community.name}
                  title={community.name}
                  image={<Icon name="ywca" size="lg" />}
                  accessory="Checkmark"
                  onPress={() => {}}
                  disableImageResize
                />
              ))}
            </Section>
          </Table>
        </ScrollView>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: getColor('white'),
  },

  margin: {
    marginTop: 30,
    marginBottom: 30,
    marginRight: 35,
    marginLeft: 35,
  },

  bigText: {
    fontSize: 21,
    fontWeight: '500',
    lineHeight: 20,
    textAlign: 'center',
  },

  regularText: {
    fontSize: 14,
    lineHeight: 25,
    textAlign: 'center',
  },
});
