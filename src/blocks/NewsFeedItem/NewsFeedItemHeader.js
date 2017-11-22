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
import type {
  CommunitySimple,
  PopupSetting,
  Post,
  ScreenProps,
  Store,
  User,
} from '../../Types';
import { selectUser } from '../../redux/selectors';
import { makeDeletePostReq, makeReportReq } from '../../utils/requestFactory';
import { type ItemActionEmitter } from './NewsFeedItem';

type P = ScreenProps<*> & {
  emitAction: ItemActionEmitter,
  item: Post,
  onDelete: Function,
  user: ?User,
};

type S = {
  updating: boolean,
};

const HIT_SLOP = {
  top: 2,
  right: 2,
  bottom: 2,
  left: 2,
};

class NewsFeedItemHeader extends Component<P, S> {
  state = {
    updating: false,
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
    const { item } = this.props;
    const deletePostReq = makeDeletePostReq(item.id);

    this.setState({ updating: true });

    try {
      await global.fetch(deletePostReq.url, deletePostReq.options);
      // this.props.emitAction('delete', item);

      this.setState({ updating: false });
      this.props.onDelete();
    } catch (err) {}
  };

  reportPost = async () => {
    this.setState({ updating: true });

    const { item } = this.props;
    const reportReq = makeReportReq({ postId: item.id });

    try {
      const reportResp = await global.fetch(reportReq.url, reportReq.options);
      const resp = await reportResp.json();
      this.setState({ updating: false });

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

  getPopupSettings(): Array<PopupSetting> {
    return [
      {
        iconName: 'delete',
        label: 'Delete',
        isHidden:
          this.props.item.author.id !==
          (this.props.user ? this.props.user.id : ''),
        onPress: this.deletePost,
      },
      {
        iconName: 'report',
        label: 'Report',
        onPress: this.reportPost,
      },
    ].filter((setting: PopupSetting): boolean => !setting.isHidden);
  }

  render() {
    const { updating } = this.state;
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
          <SettingsPopup busy={updating} settings={this.getPopupSettings()} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: Store): { user: ?User } => ({
  user: selectUser(state),
});

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
