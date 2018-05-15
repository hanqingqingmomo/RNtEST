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
  Screen,
} from '../../atoms';
import type { User, Contact, Community, RSVPStatuses } from '../../Types';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';

const attendanceDescription = [
  { icon: 'check', text: 'Going', status: 'going' },
  { icon: 'question-mark', text: 'Pending', status: 'pending' },
  { icon: 'close', text: 'Not Going', status: 'not_going' },
];

const attendanceStatus: { [key: RSVPStatuses]: Object } = {
  going: {
    icon: 'check',
    backgroundColor: getColor('green'),
  },
  pending: {
    icon: 'question-mark',
    backgroundColor: getColor('gray'),
  },
  not_going: {
    icon: 'close',
    backgroundColor: getColor('red'),
  },
};

const ICON_WIDTH = 28;

type Props = Object;

export default class TabEventMembers extends Component<Props> {
  static navigationOptions = {
    tabBarLabel: 'Participants',
  };

  get participants(): Array<User> {
    const { attendees_communities, attendees_contacts } = this.props;

    if (!attendees_communities || !attendees_contacts) {
      return [];
    }

    return [
      ...attendees_contacts.map((contact: Contact): User => ({
        id: contact.recordID,
        first_name: contact.givenName,
        last_name: contact.familyName,
        profile_photo: contact.thumbnailPath,
        disabled: true,
        rsvp: contact.rsvp,
      })),
      ...attendees_communities.reduce((acc: Array<*>, communuty: Community) => {
        return [...acc, ...communuty.members];
      }, []),
    ];
  }

  renderItem = ({
    item,
  }: {
    item: User & { rsvp: RSVPStatuses },
  }): React$Node => (
    <TableView.Cell
      contentContainerStyle={css('height', 55)}
      title={`${item.first_name} ${item.last_name}`}
      titleTextColor="#455A64"
      cellImageView={
        <View style={[css('marginBottom', 6), css('marginRight', 21)]}>
          <Avatar source={{ uri: item.profile_photo }} size={36} />
          <View
            style={[
              styles.iconAccessory,
              styles.centerView,
              css(
                'backgroundColor',
                attendanceStatus[item.rsvp].backgroundColor
              ),
            ]}
          >
            <Icon
              name={attendanceStatus[item.rsvp].icon}
              size={10}
              color="white"
            />
          </View>
        </View>
      }
      cellAccessoryView={<Icon name="chat-1" size="md" color="#CFD8DC" />}
    />
  );

  renderAttendance() {
    return attendanceDescription.map(item => (
      <View key={item.icon} style={styles.attendanceWrapper}>
        <View style={[styles.iconWrapper, styles.centerView]}>
          <Icon name={item.icon} size="sm" color="white" />
        </View>
        <Text style={styles.attendanceText}>{`${this.getPartisipantsByStatus(
          item.status
        ).length} ${item.text}`}</Text>
      </View>
    ));
  }

  getPartisipantsByStatus = (status: RSVPStatuses) => {
    return this.participants.filter(
      (user: User & { rsvp: RSVPStatuses }): boolean => user.rsvp === status
    );
  };

  render() {
    return (
      <Screen fill>
        <ShadowView style={styles.attendanceContainer} radius={0}>
          {this.renderAttendance()}
        </ShadowView>

        <ShadowView
          style={[css('marginTop', 10), css('minHeight', '100%')]}
          radius={0}
        >
          <FlatList
            data={this.participants}
            keyExtractor={(item: User): string => item.id}
            renderItem={this.renderItem}
            ItemSeparatorComponent={() => <Separator />}
          />
        </ShadowView>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  attendanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
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
    marginBottom: 5,
    paddingVertical: 28,
  },
  centerView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconAccessory: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 22,
    height: 22,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 11,
  },
  iconWrapper: {
    height: ICON_WIDTH,
    width: ICON_WIDTH,
    borderRadius: ICON_WIDTH / 2,
    backgroundColor: getColor('#B0BEC5'),
    marginBottom: 6,
  },
});
