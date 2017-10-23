// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
  ActivityIndicator,
  CenterView,
  CursorBasedFetech,
  ShadowView,
  Screen,
  Text,
  View,
} from '../../atoms';
import NewsFeedList from '../../blocks/NewsFeedItem/NewsFeedList';
import FriendInvitationWidget from './FriendInvitationWidget';
import NewsFeedHeader from './NewsFeedHeader';
import NewsFeedConversation from './NewsFeedConversation';
import { makeReadAggregatedFeedRq } from '../../utils/requestFactory';

type Props = {
  navigation: any,
  screenProps: any,
};

function NavigatorHeader(props) {
  return (
    <ShadowView radius={0} style={{ paddingTop: 20, backgroundColor: 'white' }}>
      <NewsFeedHeader openDrawer={props.screenProps.openDrawer} />
    </ShadowView>
  );
}

export default class AggregatedNewsFeedScreen extends Component<Props> {
  static navigationOptions = {
    header: NavigatorHeader,
  };

  render() {
    const { url, options } = makeReadAggregatedFeedRq();

    return (
      <CursorBasedFetech url={url} options={options}>
        {({ data, loading, batch, requestNextBatch, refetch }) => {
          if (loading === false) {
            return (
              <Screen fill>
                <NewsFeedConversation
                  onPress={() =>
                    this.props.navigation.navigate('PostEditorScreen')}
                />
                {data && data.length > 0 ? (
                  <NewsFeedList
                    data={data}
                    navigation={this.props.navigation}
                    onEndReached={requestNextBatch}
                    ListHeaderComponent={
                      <FriendInvitationWidget
                        openModal={
                          this.props.screenProps.openFriendsInitationModal
                        }
                      />
                    }
                  />
                ) : (
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>There is no content.</Text>
                  </View>
                )}
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
      </CursorBasedFetech>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontWeight: '500',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
