// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import {
  ActivityIndicator,
  CenterView,
  Pill,
  TouchableItem,
  View,
} from '../../atoms';
import { SettingsPopup } from '../../blocks';
import { getColor } from '../../utils/color';
import type { CommunitySimple, User, Post, PopupSetting } from '../../Types';
import { selectUser } from '../../redux/selectors';
import { makeDeletePostReq, makeReportReq } from '../../utils/requestFactory';
import { type ItemActionEmitter } from './NewsFeedItem';

type P = {
  item: Post,
  // TODO remote navigation prop
  navigation: Object,
  user: User,
  emitAction: ItemActionEmitter,
};

type S = {
  isBeingDeleted: boolean,
  isBeingReported: boolean,
};

const HIT_SLOP = {
  top: 2,
  right: 2,
  bottom: 2,
  left: 2,
};

const mapStateToProps = state => ({
  user: selectUser(state),
});

class NewsFeedItemHeader extends Component<P, S> {
  state = {
    isBeingDeleted: false,
    isBeingReported: false,
  };

  onCommunityPress = (community: CommunitySimple) => {
    const { navigation } = this.props;

    if (navigation) {
      navigation.navigate('CommunityCenterScreen', {
        communityId: community.id,
      });
    }
  };

  deletePost = async () => {
    this.setState({ isBeingDeleted: true });
    const { item } = this.props;
    const deletePostReq = makeDeletePostReq(item.id);

    try {
      await global.fetch(deletePostReq.url, deletePostReq.options);
      this.props.emitAction('delete', item);
    } catch (err) {}
  };

  reportPost = async () => {
    this.setState({ isBeingReported: true });

    const { item } = this.props;
    const reportReq = makeReportReq({ postId: item.id });

    try {
      const reportResp = await global.fetch(reportReq.url, reportReq.options);
      const resp = await reportResp.json();
      this.setState({ isBeingReported: false });

      if (resp.error) {
        global.alertWithType('error', 'Ooops', resp.error);
      } else {
        global.alertWithType(
          'success',
          'Thanks!',
          'Your report has been successfully received and will be reviewed by our support staff.'
        );
      }
    } catch (err) {}
  };

  getPopupSettings() {
    return [
      {
        iconName: 'delete',
        label: 'Delete',
        isHidden: ({ user, author }) => author.id !== user.id,
        onPress: this.deletePost,
      },
      {
        iconName: 'report',
        label: 'Report',
        onPress: this.reportPost,
      },
    ].filter(
      (setting: PopupSetting) =>
        !setting.isHidden ||
        !setting.isHidden({
          user: this.props.user,
          author: this.props.item.author,
        })
    );
  }

  render() {
    const { isBeingDeleted, isBeingReported } = this.state;
    const communities = [...this.props.item.communities];
    return (
      <View style={[styles.header, styles.row]}>
        <View style={[styles.tags, styles.row]}>
          {communities.splice(0, 3).map((community: CommunitySimple) => (
            <View style={styles.tag} key={community.id}>
              <TouchableItem
                onPress={() => this.onCommunityPress(community)}
                disabled={community.disabled}
                hitSlop={HIT_SLOP}
              >
                <View style={{ backgroundColor: 'white' }}>
                  <Pill
                    title={community.name}
                    color={community.disabled ? '#B0BEC5' : getColor('orange')}
                  />
                </View>
              </TouchableItem>
            </View>
          ))}
        </View>
        <View>
          <SettingsPopup
            busy={isBeingReported || isBeingDeleted}
            settings={this.getPopupSettings()}
          />
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(NewsFeedItemHeader);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  header: {
    paddingVertical: 15,
  },
  tags: {
    marginHorizontal: -2,
    flex: 1,
  },
  tag: {
    paddingHorizontal: 2,
  },
});
