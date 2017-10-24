// @flow

import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { BlackPortal, WhitePortal } from 'react-native-portal';
import { getColor } from '../utils/color';

import {
  ActivityIndicator,
  CenterView,
  CommunityCard,
  Fetch,
  Icon,
  Screen,
  ScrollView,
  SegmentedControl,
  Text,
  TouchableItem,
  TouchableOpacity,
  View,
} from '../atoms';
import { makeReadCommunitiesListRq } from '../utils/requestFactory';

const HEADER_VIEW_ID = 'HeaderView:CommListing';

function NavigatorHeader(props) {
  return (
    <TouchableOpacity
      onPress={props.screenProps.openDrawer}
      style={{ marginLeft: 10 }}
    >
      <Icon name="menu-1" size={20} color={getColor('orange')} />
    </TouchableOpacity>
  );
}

type MembershipStatus = 'Joined' | 'Explore';

type State = {
  membershipStatus: MembershipStatus,
};

export default class CommunityListScreen extends Component<{}, State> {
  static navigationOptions = props => ({
    headerLeft: <NavigatorHeader {...props} />,
    headerTitle: <WhitePortal name={HEADER_VIEW_ID} />,
  });

  state = {
    membershipStatus: 'Joined',
  };

  render() {
    const { navigation } = this.props;
    const readCommunitiesListRq = makeReadCommunitiesListRq(
      this.state.membershipStatus === 'Joined'
    );

    return (
      <Screen>
        <BlackPortal name={HEADER_VIEW_ID}>
          <View style={styles.segmentedControlContainer}>
            <SegmentedControl
              labels={['Joined', 'Explore']}
              selectedLabel={this.state.membershipStatus}
              onChange={(membershipStatus: MembershipStatus) =>
                this.setState({ membershipStatus })}
            />
          </View>
        </BlackPortal>
        <Fetch
          url={readCommunitiesListRq.url}
          options={readCommunitiesListRq.options}
        >
          {({ loading, error, data, fetch }) => (
            <ScrollView contentContainerStyle={styles.container}>
              {loading && (
                <CenterView>
                  <ActivityIndicator />
                </CenterView>
              )}
              {error && (
                <CenterView>
                  <Text>{error.message}</Text>
                </CenterView>
              )}
              {!loading &&
                data &&
                data.data.map(community => (
                  <TouchableItem
                    onPress={() =>
                      navigation.navigate('CommunityCenterScreen', {
                        communityId: community.id,
                        reloadCommunityList: fetch,
                      })}
                    key={community.id}
                    style={styles.item}
                  >
                    <CommunityCard
                      imageURI={community.cover_photo}
                      title={community.name}
                      subtitle={`${community.members} members`}
                    />
                  </TouchableItem>
                ))}
            </ScrollView>
          )}
        </Fetch>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  segmentedControlContainer: {
    width: '100%',
    paddingRight: Platform.OS === 'android' ? 15 : 0,
  },
  container: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow: 1,
  },

  item: {
    paddingTop: 1,
    paddingBottom: 5,
    paddingHorizontal: 5,
    flexGrow: 1,
    width: '50%',
  },
});
