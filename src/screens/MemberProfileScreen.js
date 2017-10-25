// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
  ActivityIndicator,
  CenterView,
  Fetch,
  Icon,
  Pill,
  Popover,
  PopoverItem,
  Screen,
  TableView,
  TouchableOpacity,
  View,
} from '../atoms';
import { ProfileCard } from '../blocks';
import { getColor } from '../utils/color';
import { makeReadProfileRq, makeReportReq } from '../utils/requestFactory';
import type { IconName, User, CommunitySimple } from '../Types';

const { Table, Section, Cell } = TableView;

type Setting = {
  label: string,
  iconName: IconName,
  isVisible: Function,
  key: 'report',
};

type Props = {
  navigation: Object,
};

const SETTINGS = [
  {
    key: 'report',
    label: 'Report',
    iconName: 'report',
  },
];

export default class MemberProfileScreen extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const { first_name, last_name } = navigation.state.params.user;
    return {
      title: `${first_name} ${last_name}`,
    };
  };

  get settings(): Array<*> {
    return SETTINGS.map((setting: Setting) => ({
      label: () => this.renderSettings(setting),
      onPress: () => this.onSettingPress(setting),
    }));
  }

  onSettingPress = async (setting: Setting) => {
    switch (setting.key) {
      case 'report':
        this.reportUser();
        break;
      default:
    }
  };

  handleCommunityPress = (community: CommunitySimple) => {
    this.props.navigation.navigate('CommunityCenterScreen', {
      communityId: community.id,
    });
  };

  reportUser = async () => {
    const { id } = this.props.navigation.state.params.user;
    const reportReq = makeReportReq({ userId: id });

    try {
      const reportResp = await global.fetch(reportReq.url, reportReq.options);

      const resp = await reportResp.json();

      if (resp.error) {
        global.alertWithType('error', 'Ooops', resp.error);
      } else {
        global.alertWithType(
          'success',
          'Thanks!',
          `Your report has been successfully received and will be reviewed`
        );
      }
    } catch (err) {}
  };

  renderSettings = ({
    label,
    iconName,
    ...args
  }: Setting): React$Element<*> => (
    <PopoverItem
      {...args}
      contentView={label}
      imageView={
        <View style={{ padding: 6 }}>
          <Icon name={iconName} color="#B0BEC5" size="md" />
        </View>
      }
      key={iconName}
    />
  );

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
                    <ProfileCard
                      user={memeberData}
                      settings={
                        <Popover
                          labels={this.settings}
                          button={
                            <Icon name="menu" color="#C6D3D8" size={20} />
                          }
                        />
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
