// @flow

import React, { Component } from 'react';
import { StyleSheet, RefreshControl, InteractionManager } from 'react-native';
import { connect } from 'react-redux';

import { View } from '../../atoms';
import NewsFeedList from '../../blocks/NewsFeedItem/NewsFeedList';
import type { Post, TimelineState } from '../../Types';
import { loadTimeline } from '../../redux/ducks/timelines';
import { selectTimeline } from '../../redux/selectors';

import Footer from './Footer';

type Props = {
  id: string,
  path: string,
  limit: number,
  ListHeaderComponent?: React$Node,
  navigation: any,
  timeline: TimelineState,
};

class NewsFeed extends Component<Props> {
  static defaultProps = {
    limit: 5,
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.fetchFreshData);
  }

  keyExtractor = (item: Post) => item.id;

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

  render() {
    const { timeline } = this.props;
    return (
      <NewsFeedList
        {...this.props}
        data={timeline.content}
        renderItemProps={{
          navigation: this.props.navigation,
        }}
        refreshControl={
          <RefreshControl
            refreshing={timeline.refreshing}
            onRefresh={this.fetchFreshData}
          />
        }
        ListHeaderComponent={
          this.props.ListHeaderComponent && (
            <View style={styles.ListHeaderComponent}>
              {this.props.ListHeaderComponent}
            </View>
          )
        }
        ListFooterComponent={
          <View style={styles.ListFooterComponent}>
            <Footer
              disabled={timeline.next === null}
              loading={timeline.loading}
              onRequestMoreData={this.fetchNextData}
            />
          </View>
        }
      />
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
});

const mapState = (state, props: Props) => ({
  timeline: selectTimeline(props.id)(state),
});

export default connect(mapState, { loadTimeline })(NewsFeed);
