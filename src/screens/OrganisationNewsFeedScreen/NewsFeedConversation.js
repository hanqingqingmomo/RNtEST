// @flow

import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import { Avatar, Icon, ShadowView, View, TableView, Text } from '../../atoms';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';

const { Table, Section, Cell } = TableView;
const AVATAR_WIDTH = 30;

export default function NewsFeedConversation() {
  return (
    <ShadowView style={styles.cellContainer}>
      <Cell
        title="Start a conversation..."
        titleTextColor={getColor('gray')}
        image={
          <View style={styles.container}>
            <Avatar
              imageURI={
                'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg'
              }
              size={AVATAR_WIDTH}
            />
          </View>
        }
        cellAccessoryView={
          <View style={styles.container}>
            <Icon
              name="attachment"
              size="md"
              color="#CFD8DC"
              style={css('marginRight', 10)}
            />
            <Icon name="pen" size="md" color="#CFD8DC" />
          </View>
        }
        onPress={() => {}}
        disableImageResize
      />
    </ShadowView>
  );
}

const styles = StyleSheet.create({
  cellContainer: {
    backgroundColor: getColor('white'),
  },

  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 65,
  },
});
