// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, TouchableItem, Like } from '../../atoms';
import { css } from '../../utils/style';

type LikeProps = 'like' | 'comment';

type P = {
  links: Array<string>,
  onLinkPress: string => void,
  onLikePress: LikeProps => void,
};

const HIT_SLOP = {
  top: 2,
  right: 2,
  bottom: 2,
  left: 2,
};

export default class NewsFeedItemFooter extends React.Component<*, P, *> {
  onLikePress(status: LikeProps) {
    return () => {
      this.props.onLikePress(status);
    };
  }

  render() {
    return (
      <View style={[styles.footer, styles.row]}>
        <View style={[styles.footerLeft, styles.row]}>
          <View style={styles.likeWrapper}>
            <Like
              liked
              iconName="like"
              count={8}
              onPress={this.onLikePress('like')}
            />
          </View>
          <View style={styles.likeWrapper}>
            <Like
              iconName="comment"
              count={100}
              onPress={this.onLikePress('comment')}
            />
          </View>
        </View>
        <View style={[styles.footerRight, styles.row]}>
          {this.props.links.map((link, idx) => (
            <View
              key={link}
              style={[styles.footerLink, idx ? styles.borderLeft : undefined]}
            >
              <TouchableItem
                onPress={() => this.props.onLinkPress(link.toLowerCase())}
                hitSlop={HIT_SLOP}
              >
                <Text
                  size={13}
                  lineHeight={18}
                  style={
                    ({ backgroundColor: 'white' }, css('color', '#00B0FF'))
                  }
                >
                  {link}
                </Text>
              </TouchableItem>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

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
