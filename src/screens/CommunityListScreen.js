// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
  ActivityIndicator,
  CenterView,
  CommunityCard,
  Fetch,
  ScrollView,
  Text,
  TouchableItem,
  SegmentedControl,
  View,
  TouchableOpacity,
  Icon,
} from '../atoms';
import { makeReadCommunitiesListRq } from '../utils/requestFactory';

const styles = StyleSheet.create({
  segmentedControlContainer: {
    width: '100%',
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

function NavigatorHeader(props) {
  return (
    <TouchableOpacity
      onPress={props.screenProps.openDrawer}
      style={{ marginLeft: 10 }}
    >
      <Icon name="ywca" size={33} color="orange" />
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
    headerTitle: props.navigation.state.params
      ? props.navigation.state.params.headerTitleComponent
      : null,
  });

  state = {
    membershipStatus: 'Joined',
  };

  componentDidMount() {
    this.props.navigation.setParams({
      headerTitleComponent: (
        <View style={styles.segmentedControlContainer}>
          <SegmentedControl
            labels={['Joined', 'Explore']}
            selectedLabel="Joined"
            onChange={(membershipStatus: MembershipStatus) =>
              this.setState({ membershipStatus })}
          />
        </View>
      ),
    });
  }

  render() {
    const { navigation } = this.props;
    const readCommunitiesListRq = makeReadCommunitiesListRq(
      this.state.membershipStatus === 'Joined'
    );

    return (
      <Fetch
        url={readCommunitiesListRq.url}
        options={readCommunitiesListRq.options}
      >
        {({ loading, error, data }) => (
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
                    navigation.navigate('CommunityLandingScreen', {
                      communityId: community.id,
                    })}
                  key={community.id}
                  style={styles.item}
                >
                  <CommunityCard
                    imageURI={community.profile_photo}
                    title={community.name}
                    subtitle={community.description}
                  />
                </TouchableItem>
              ))}
          </ScrollView>
        )}
      </Fetch>
    );
  }
}
