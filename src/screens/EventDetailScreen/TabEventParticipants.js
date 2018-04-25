// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Separator } from 'react-native-tableview-simple';

import {
  TableView,
  FlatList,
  Text,
  Icon,
  Avatar,
  ShadowView,
  View,
} from '../../atoms';
import { type User } from '../../Types';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';

const attendanceDescription = [
  { icon: 'check', text: ' Going' },
  { icon: 'question-mark', text: ' Pending' },
  { icon: 'close', text: ' Not Going' },
];

const attendanceStatus = {
  going: {
    icon: 'check',
    backgroundColor: '#00E676',
  },
  pending: {
    icon: 'question-mark',
    backgroundColor: 'gray',
  },
  notgoing: {
    icon: 'close',
    backgroundColor: '#FC612D',
  },
};

const { Cell } = TableView;
const ICON_WIDTH = 28;
const AVATAR_WIDTH = 36;

type Props = {
  event: Object,
};

export default class TabEventMembers extends Component<Props> {
  static navigationOptions = {
    tabBarLabel: 'Participants',
  };

  keyExtractor = item => item.id;

  renderItem = ({ item, separators }) => (
    <Cell
      title={`${item.first_name} ${item.last_name}`}
      titleTextColor="#455A64"
      image={
        <View>
          <Avatar imageURI={item.profile_photo} size={AVATAR_WIDTH} />
          <ShadowView
            radius={16}
            style={[
              styles.iconAccessory,
              styles.centerView,
              css(
                'backgroundColor',
                attendanceStatus[item.status].backgroundColor
              ),
            ]}
          >
            <Icon
              name={attendanceStatus[item.status].icon}
              size={12}
              color="white"
            />
          </ShadowView>
        </View>
      }
      cellAccessoryView={<Icon name="chat-1" size="md" color="#CFD8DC" />}
      disableImageResize
      onHighlightRow={separators.highlight}
      onUnHighlightRow={separators.unhighlight}
    />
  );

  renderAttendance() {
    return attendanceDescription.map(item => (
      <View key={item.icon} style={styles.attendanceWrapper}>
        <View style={[styles.iconWrapper, styles.centerView]}>
          <Icon name={item.icon} size="sm" color="white" />
        </View>
        <Text style={styles.attendanceText}>{56 + item.text}</Text>
      </View>
    ));
  }

  render() {
    const { event } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.attendanceContainer}>
          {this.renderAttendance()}
        </View>
        <View style={css('height', 5)} />
        <View>
          <FlatList
            data={event.participants}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            ItemSeparatorComponent={({ highlighted }) => (
              <Separator isHidden={highlighted} />
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  attendanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 120,
    backgroundColor: 'white',
  },
  attendanceText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    color: getColor('#455A64'),
  },
  attendanceWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  centerView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconAccessory: {
    position: 'absolute',
    bottom: -3,
    right: -5,
    width: 20,
    height: 20,
    borderColor: 'white',
  },
  iconWrapper: {
    height: ICON_WIDTH,
    width: ICON_WIDTH,
    borderRadius: ICON_WIDTH / 2,
    backgroundColor: getColor('#B0BEC5'),
  },
});
