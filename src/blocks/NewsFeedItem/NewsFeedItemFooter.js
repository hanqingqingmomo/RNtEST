// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { contentLike } from '../../redux/ducks/contentObject';
import { Text, View, TouchableItem, Count } from '../../atoms';
import { css } from '../../utils/style';
import { type Post } from '../../Types';

type Action = {
  label: string,
  onPress: Function,
};

type Props = {
  detailView: boolean,
  item: Post,
  like: Post => mixed,
  navigate: (routeName: string, params?: Object) => mixed,
};

const HIT_SLOP = {
  top: 2,
  right: 2,
  bottom: 2,
  left: 2,
};

class NewsFeedItemFooter extends Component<Props> {
  get actions(): Array<Action> {
    const { item, navigate, detailView } = this.props;
    const { id: postId } = item;

    const links = [];

    if (!detailView) {
      links.push({
        label: 'Comment',
        onPress: () => navigate('PostDetailScreen', { postId }),
      });
    }

    return links;
  }

  render() {
    const { likes_count, comments_count, liked } = this.props.item;

    return (
      <View style={[styles.footer, styles.row]}>
        <View style={[styles.footerLeft, styles.row]}>
          <TouchableItem
            style={styles.likeWrapper}
            onPress={() => {
              this.props.contentLike(this.props.item);
            }}
          >
            <Count iconName="like" count={likes_count} pinned={liked} />
          </TouchableItem>

          <View style={styles.likeWrapper}>
            <Count iconName="comment" count={comments_count} />
          </View>
        </View>
        <View style={[styles.footerRight, styles.row]}>
          {this.actions.map((action, idx) => (
            <TouchableItem
              key={action.label}
              onPress={action.onPress}
              hitSlop={HIT_SLOP}
            >
              <View
                style={[
                  styles.footerLink,
                  idx > 0 ? styles.borderLeft : undefined,
                ]}
              >
                <Text
                  size={13}
                  lineHeight={18}
                  style={
                    ({ backgroundColor: 'white' }, css('color', '#00B0FF'))
                  }
                >
                  {action.label}
                </Text>
              </View>
            </TouchableItem>
          ))}
        </View>
      </View>
    );
  }
}

export default connect(null, { contentLike })(NewsFeedItemFooter);

const styles = StyleSheet.create({
  borderLeft: {
    borderLeftWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ECEFF1',
  },
  row: {
    flexDirection: 'row',
  },
  footer: {
    paddingVertical: 7,
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ECEFF1',
  },
  likeWrapper: {
    paddingHorizontal: 8,
  },
  footerLeft: {
    flexGrow: 1,
    marginHorizontal: -8,
  },
  footerRight: {
    marginHorizontal: -15,
  },
  footerLink: {
    height: 19,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
});
