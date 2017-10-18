// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { Section } from 'react-native-tableview-simple';

import { Avatar, Icon, Text, View } from '../../atoms';
import SectionHeader from './SectionHeader';
import { css } from '../../utils/style';
import { getColor } from '../../utils/color';

const mockedItem = {
  imageURI: 'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
  text: 'Don’t forget about the upcoming workshop on August 12',
};

export default function PinnedSection() {
  return (
    <View>
      <Section
        sectionPaddingBottom={0}
        sectionPaddingTop={20}
        headerComponent={
          <SectionHeader headerLeft="Pinned items" headerRight="See All" />
        }
      />
      <View style={styles.pinnedContainer}>
        <View
          style={[
            styles.shadow,
            styles.centerContent,
            css('marginLeft', 10),
            css('width', 55),
          ]}
        >
          <Avatar imageURI={mockedItem.imageURI} size={38} />
          <View
            style={[styles.editIconCircle, styles.centerContent, styles.shadow]}
          >
            <Icon name="pin" size={16} color="#90A4AE" />
          </View>
        </View>
        <View style={styles.pinnedTextContainer}>
          <Text>{mockedItem.text}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  editIconCircle: {
    position: 'absolute',
    top: 0,
    right: -8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: getColor('white'),
  },

  pinnedContainer: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: getColor('white'),
  },

  pinnedTextContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginLeft: 10,
  },

  shadow: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
});
