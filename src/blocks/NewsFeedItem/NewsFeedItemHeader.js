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
import type { IconName, CommunitySimple, User } from '../../Types';
import { selectUser } from '../../redux/selectors';
import {
  makeDeletePostReq,
  makeReportPostReq,
} from '../../utils/requestFactory';

type Setting = {
  label: string,
  iconName: IconName,
  isVisible: Function,
  key: 'pin' | 'delete' | 'share' | 'report',
};

type Props = {
  author: User,
  communities: Array<CommunitySimple>,
  id: number | string,
  user?: User,
  navigation: any,
  onDelete: Function,
};

type State = {
  updating: boolean,
};

const HIT_SLOP = {
  top: 2,
  right: 2,
  bottom: 2,
  left: 2,
};

const SETTINGS = [
  // {
  //   key: 'share',
  //   label: 'Share',
  //   iconName: 'share',
  // },
  // {
  //   key: 'pin',
  //   label: 'Pin',
  //   iconName: 'pin',
  // },
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

@connect(mapStateToProps)
export default class NewsFeedItemHeader extends Component<Props, State> {
  state = {
    updating: false,
  };

  get settings(): Array<*> {
    return SETTINGS.filter(
      (setting: Setting) =>
        typeof setting.isVisible === 'undefined' ||
        setting.isVisible({
          user: this.props.user,
          author: this.props.author,
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
    const { id, onDelete } = this.props;
    const deletePostReq = makeDeletePostReq(id);

    this.setState({ updating: true });

    try {
      await global.fetch(deletePostReq.url, deletePostReq.options);
      this.setState({ updating: false });
      onDelete();
    } catch (err) {}
  };

  reportPost = async () => {
    const { id } = this.props;
    const reportPostReq = makeReportPostReq(id);

    this.setState({ updating: true });

    try {
      const reportResp = await global.fetch(
        reportPostReq.url,
        reportPostReq.options
      );

      this.setState({ updating: false });

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
    let communities = [...this.props.communities];

    communities = communities.splice(0, 3);

    return (
      <View style={[styles.header, styles.row]}>
        <View style={[styles.tags, styles.row]}>
          {communities.map((item: CommunitySimple) => (
            <View style={styles.tag} key={item.id}>
              <TouchableItem
                onPress={() => this.onCommunityPress(item)}
                disabled={item.disabled}
                hitSlop={HIT_SLOP}
              >
                <View style={{ backgroundColor: 'white' }}>
                  <Pill
                    title={item.name}
                    color={item.disabled ? '#B0BEC5' : getColor('orange')}
                  />
                </View>
              </TouchableItem>
            </View>
          ))}
        </View>
        {this.state.updating ? (
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
