// @flow

import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { BlackPortal, WhitePortal } from 'react-native-portal';

import { getColor } from '../utils/color';
import { makeReadCommunitiesListRq } from '../utils/requestFactory';
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
import { NoContent } from '../blocks';
import type { Community, ScreenProps, FetchProps } from '../Types';

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

type Props = ScreenProps<*>;

export default class CommunityListScreen extends Component<Props, State> {
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
          {({
            loading,
            error,
            data,
            fetch,
          }: FetchProps<{ data: Array<Community> }>) => (
            <View style={{ minHeight: '100%' }}>
              {loading === false ? (
                data && data.data.length ? (
                  <ScrollView contentContainerStyle={styles.container}>
                    {data.data.map(community => (
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
                ) : (
                  <NoContent iconName="sad-face" title="No Content" />
                )
              ) : error ? (
                <CenterView>
                  <Text>{error.message}</Text>
                </CenterView>
              ) : (
                <CenterView>
                  <ActivityIndicator />
                </CenterView>
              )}
            </View>
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
    paddingVertical: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    paddingTop: 1,
    paddingBottom: 5,
    paddingHorizontal: 5,
    flexGrow: 1,
    width: '50%',
  },
});
