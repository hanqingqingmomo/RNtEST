// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import {
  ActivityIndicator,
  CenterView,
  CommunityCard,
  Fetch,
  Screen,
  ScrollView,
  Text,
  TouchableItem,
} from '../atoms';
import { communitiesHeaderLabels } from './';

export default function CommunitiesScreen({ navigation }) {
  return (
    <Screen tintColor="#ECEFF1" fill>
      <Fetch
        url={`v1/communities${navigation.state.params.label ===
        communitiesHeaderLabels[0]
          ? '/?membership_status=joined'
          : ''}`}
      >
        {({ loading, error, data }) => (
          <ScrollView contentContainerStyle={style.container}>
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
            {data &&
              data.data.map(community => (
                <TouchableItem
                  onPress={() =>
                    navigation.navigate('CommunityLandingScreen', {
                      communityId: community.id,
                    })}
                  key={community.id}
                  style={style.item}
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
    </Screen>
  );
}

const style = StyleSheet.create({
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
