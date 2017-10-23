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
import { makeDeletePostReq } from '../../utils/requestFactory';

type Setting = {
  label: string,
  iconName: IconName,
  key: 'pin' | 'delete' | 'share',
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
  deleting: boolean,
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
  },
];

const mapStateToProps = state => ({
  user: selectUser(state),
});

@connect(mapStateToProps)
export default class NewsFeedItemHeader extends Component<Props, State> {
  state = {
    deleting: false,
  };

  get settings(): Array<*> {
    return SETTINGS.map((setting: Setting) => ({
      label: () => this.renderSettings(setting),
      onPress: () => this.onSettingPress(setting),
    }));
  }

  get isUserAuthorOfPost(): boolean {
    const { author, user } = this.props;

    return author.id === user.id;
  }

  onCommunityPress = (community: CommunitySimple) => {
    const { navigation } = this.props;

    if (navigation) {
      navigation.navigate('CommunityCenterScreen', {
        communityId: community.id,
      });
    }
  };

  renderSettings = ({
    label,
    iconName,
    ...args
  }: Setting): React$Element<*> => {
    return (
      <PopoverItem
        {...args}
        contentView={label}
        imageView={
          <View style={{ padding: 6 }}>
            <Icon name={iconName} color="#B0BEC5" size="md" />
          </View>
        }
      />
    );
  };

  onSettingPress = async (setting: Setting) => {
    switch (setting.key) {
      case 'delete':
        this.deletePost();
        break;
      default:
    }
  };

  deletePost = async () => {
    const { id, onDelete } = this.props;
    const deletePostReq = makeDeletePostReq(id);

    this.setState({ deleting: true });

    try {
      await global.fetch(deletePostReq.url, deletePostReq.options);
      this.setState({ deleting: false });
      onDelete();
    } catch (err) {}
  };

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
        {this.isUserAuthorOfPost ? (
          <View>
            {this.state.deleting ? (
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
        ) : null}
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
