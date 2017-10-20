// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
  ActivityIndicator,
  CenterView,
  Fetch,
  Pill,
  Screen,
  TableView,
  TouchableOpacity,
  View,
} from '../atoms';
import { ProfileCard } from '../blocks';
import { getColor } from '../utils/color';
import { makeReadProfileRq } from '../utils/requestFactory';
import type { User, JoinedCommunity } from '../Types';

const { Table, Section, Cell } = TableView;

type Props = {
  navigation: Object,
};

export default class MemberProfileScreen extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const { first_name, last_name } = navigation.state.params.user;
    return {
      title: `${first_name} ${last_name}`,
    };
  };

  handleCommunityPress = (community: JoinedCommunity) => {
    this.props.navigation.navigate('CommunityCenterScreen', {
      communityId: community.id,
    });
  };

  renderCommunities = (member: User) => {
    return (
      <View style={styles.pillContainer}>
        {(member.joined_communities || []).map(pill => (
          <View key={pill.id} style={styles.pillItem}>
            <TouchableOpacity onPress={() => this.handleCommunityPress(pill)}>
              <Pill title={pill.name} color={getColor('orange')} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  render() {
    const { navigation } = this.props;

    const memberProfileReq = makeReadProfileRq(navigation.state.params.user.id);

    return (
      <Fetch url={memberProfileReq.url} options={memberProfileReq.options}>
        {({ loading, data, error, fetch }) => {
          if (loading === false) {
            const memeberData = data.data;

            return (
              <Screen>
                <Table>
                  <Section sectionPaddingTop={0}>
                    <ProfileCard user={memeberData} />
                  </Section>
                  <Section header="Communities">
                    <Cell
                      cellContentView={this.renderCommunities(memeberData)}
                    />
                  </Section>
                </Table>
              </Screen>
            );
          } else {
            return (
              <CenterView>
                <ActivityIndicator />
              </CenterView>
            );
          }
        }}
      </Fetch>
    );
  }
}

const styles = StyleSheet.create({
  pillContainer: {
    marginHorizontal: -1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
  },
  pillItem: {
    paddingHorizontal: 1,
    paddingBottom: 10,
  },
});
