// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

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
import { ProfileCard, SettingsPopup } from '../blocks';
import { getColor } from '../utils/color';
import { contentReport } from '../redux/ducks/contentObject';
import { makeReadProfileRq } from '../utils/requestFactory';
import type { User, CommunitySimple } from '../Types';

const { Table, Section, Cell } = TableView;

type Props = {
  navigation: Object,
  contentReport: Object => mixed,
};

class MemberProfileScreen extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const { first_name, last_name } = navigation.state.params.user;
    return {
      title: `${first_name} ${last_name}`,
    };
  };

  handleCommunityPress = (community: CommunitySimple) => {
    this.props.navigation.navigate('CommunityCenterScreen', {
      communityId: community.id,
    });
  };

  getPopupSettings() {
    return [
      {
        key: 'report',
        iconName: 'report',
        label: 'Report',
        onPress: () => {
          this.props.contentReport(this.props.navigation.state.params.user);
        },
      },
    ];
  }

  renderCommunities = (member: User) => {
    return (
      <View style={styles.pillContainer}>
        {(member.joined_communities || []).map(pill => (
          <View key={pill.id} style={styles.pillItem}>
            <TouchableOpacity onPress={() => this.handleCommunityPress(pill)}>
              <Pill
                title={pill.name}
                color={getColor('orange')}
                truncate={member.joined_communities.length > 1}
              />
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
                    <ProfileCard
                      user={memeberData}
                      settings={
                        <SettingsPopup settings={this.getPopupSettings()} />
                      }
                    />
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

export default connect(null, { contentReport })(MemberProfileScreen);

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
