// @flow

import React, { Component } from 'react';

import { View } from '../../atoms';
import { NewsFeed, PinnedPost } from '../../blocks';
import StartConversationButton from './../AggregatedNewsFeedScreen/StartConversationButton';

type Props = {
  communityId: string,
  navigation: any,
  navigateToPost: Object => void,
  reloadCommunity: Function,
};

export default class CommunityNewsFeedScreen extends Component<Props> {
  render() {
    // TODO do not pass navigation
    return (
      <NewsFeed
        id={this.props.communityId}
        path={`content_objects/posts/${this.props.communityId}`}
        navigation={this.props.navigation}
        ListHeaderComponent={
          <View>
            <StartConversationButton
              navigateToEditorScreen={() =>
                this.props.navigation.navigate('PostEditorScreen')}
            />
            <PinnedPost
              communityId={this.props.communityId}
              onPress={data =>
                this.props.navigation.navigate('PostDetailScreen', {
                  postId: data.id,
                })}
              onSeeAll={data => {
                this.props.navigation.navigate('PinnedPostsScreen', {
                  communityId: this.props.communityId,
                });
              }}
            />
          </View>
        }
      />
    );
  }
}
