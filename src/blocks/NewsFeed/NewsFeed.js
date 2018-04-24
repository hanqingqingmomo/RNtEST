// @flow

import React, { Component } from 'react';
import { StyleSheet, RefreshControl, InteractionManager, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { View } from '../../atoms';
import NewsFeedItem from '../../blocks/NewsFeedItem/NewsFeedItem';
import { loadTimeline, type Timeline } from '../../redux/ducks/timelines';
import { selectTimeline } from '../../redux/selectors';
import { css } from '../../utils/style';
import { getColor } from '../../utils/color';
import type { CommunitySimple, Post, User } from '../../Types';
import Footer from './Footer';

/**
 * Separator
 */
function ItemSeparatorComponent() {
  return <View style={styles.Separator} />;
}

/**
 * Main component
 */

type Props = {
  disableRefreshControl?: boolean,
  id: string,
  limit: number,
  ListHeaderComponent?: React$Node,
  loadTimeline: typeof loadTimeline,
  navigateToCommunity: CommunitySimple => mixed,
  navigateToMemberProfile(User): mixed,
  navigateToPostDetail(Post): mixed,
  path: string,
  timeline: Timeline,
};

class NewsFeed extends Component<Props> {
  static defaultProps = {
    limit: 20,
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.fetchFreshData);
  }

  loadTimeline(mergeMode) {
    this.props.loadTimeline({
      id: this.props.id,
      path: this.props.path,
      limit: this.props.limit,
      mergeMode,
    });
  }

  fetchFreshData = async () => {
    this.loadTimeline('replace');
  };

  fetchNextData = async () => {
    this.loadTimeline('append');
  };

  renderItem = (item: Post) => (
    <View key={item.id} style={css('paddingHorizontal', 10)}>
      <NewsFeedItem
        item={item}
        navigateToCommunity={this.props.navigateToCommunity}
        navigateToPostDetail={() => this.props.navigateToPostDetail(item)}
        navigateToMemberProfile={() => this.props.navigateToMemberProfile(item.author)}
      />
    </View>
  );

  render() {
    const { timeline, disableRefreshControl } = this.props;

    return (
      <ScrollView
        refreshControl={
          disableRefreshControl ? null : (
            <RefreshControl
              refreshing={timeline.refreshing}
              onRefresh={this.fetchFreshData}
              colors={[getColor('orange')]}
            />
          )
        }
      >
        {this.props.ListHeaderComponent !== undefined ? (
          <View style={styles.ListHeaderComponent}>{this.props.ListHeaderComponent}</View>
        ) : null}
        {timeline.content.map((item: Post, index: number) => [
          index > 0 ? <ItemSeparatorComponent key={`${item.id}-${index}`} /> : null,
          this.renderItem(item),
        ])}
        <View style={styles.ListFooterComponent}>
          <Footer
            disabled={timeline.next === null}
            loading={timeline.loading}
            onRequestMoreData={this.fetchNextData}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  ListHeaderComponent: {
    marginBottom: 10,
  },
  ListFooterComponent: {
    marginTop: 10,
  },
  Separator: {
    height: 10,
  },
});

const mapState = (state, props: Props) => ({
  timeline: selectTimeline(props.id)(state),
});

export default connect(mapState, { loadTimeline })(NewsFeed);
