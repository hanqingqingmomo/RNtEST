// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import {
  ActivityIndicator,
  CenterView,
  Icon,
  Pill,
  Popover,
  PopoverItem,
  TouchableItem,
  View,
} from '../../atoms';
import { getColor } from '../../utils/color';
import type { IconName, CommunitySimple, User, Post } from '../../Types';
import { selectUser } from '../../redux/selectors';
import {
  makeDeletePostReq,
  makeReportPostReq,
} from '../../utils/requestFactory';

type Setting = {
  label: string,
  iconName: IconName,
  isVisible: Function,
  key: 'delete' | 'report',
};

type P = {
  item: Post,
  navigation: Object,
  user: User,
  requestDelete: Function,
  deleteSuccessful: Function,
  isBeingDeleted: boolean,
};

type S = {
  isBeingReported: boolean,
};

const HIT_SLOP = {
  top: 2,
  right: 2,
  bottom: 2,
  left: 2,
};

const SETTINGS = [
  {
    key: 'delete',
    label: 'Delete',
    iconName: 'delete',
    isVisible: ({ user, author }) => isUserAuthorOfPost(user, author),
  },
  {
    key: 'report',
    label: 'Report',
    iconName: 'report',
  },
];

function isUserAuthorOfPost(user, author): boolean {
  return author.id === user.id;
}

const mapStateToProps = state => ({
  user: selectUser(state),
});

class NewsFeedItemHeader extends Component<P, S> {
  state = {
    isBeingReported: false,
  };

  get settings(): Array<*> {
    return SETTINGS.filter(
      (setting: Setting) =>
        typeof setting.isVisible === 'undefined' ||
        setting.isVisible({
          user: this.props.user,
          author: this.props.item.author,
        })
    ).map((setting: Setting) => ({
      label: () => this.renderSettings(setting),
      onPress: () => this.onSettingPress(setting),
    }));
  }

  onCommunityPress = (community: CommunitySimple) => {
    const { navigation } = this.props;

    if (navigation) {
      navigation.navigate('CommunityCenterScreen', {
        communityId: community.id,
      });
    }
  };

  onSettingPress = async (setting: Setting) => {
    switch (setting.key) {
      case 'delete':
        this.deletePost();
        break;
      case 'report':
        this.reportPost();
        break;
      default:
    }
  };

  deletePost = async () => {
    const { item, requestDelete, deleteSuccessful } = this.props;
    const deletePostReq = makeDeletePostReq(item.id);

    requestDelete(item);

    try {
      await global.fetch(deletePostReq.url, deletePostReq.options);

      deleteSuccessful(item);
    } catch (err) {}
  };

  reportPost = async () => {
    const { item } = this.props;
    const reportPostReq = makeReportPostReq(item.id);

    this.setState({ isBeingReported: true });

    try {
      const reportResp = await global.fetch(
        reportPostReq.url,
        reportPostReq.options
      );

      this.setState({ isBeingReported: false });

      const resp = await reportResp.json();

      if (resp.error) {
        global.alertWithType('error', 'Ooops', resp.error);
      } else {
        global.alertWithType(
          'success',
          'Thanks!',
          'The post has been successfully reported.'
        );
      }
    } catch (err) {}
  };

  renderSettings = ({
    label,
    iconName,
    ...args
  }: Setting): React$Element<*> => (
    <PopoverItem
      {...args}
      contentView={label}
      imageView={
        <View style={{ padding: 6 }}>
          <Icon name={iconName} color="#B0BEC5" size="md" />
        </View>
      }
      key={iconName}
    />
  );

  render() {
    const { item, isBeingDeleted } = this.props;
    const { isBeingReported } = this.state;

    return (
      <View style={[styles.header, styles.row]}>
        <View style={[styles.tags, styles.row]}>
          {item.communities.splice(0, 3).map((community: CommunitySimple) => (
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
        {isBeingReported || isBeingDeleted ? (
          <CenterView>
            <ActivityIndicator />
          </CenterView>
        ) : (
          <Popover
            labels={this.settings}
            button={<Icon name="menu" color="#C6D3D8" size={20} />}
          />
        )}
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
