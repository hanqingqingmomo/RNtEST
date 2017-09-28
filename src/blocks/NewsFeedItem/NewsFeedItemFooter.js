// @flow

import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View, TouchableItem } from '../../atoms';

type P = {
  links: Array<string>,
  onLinkPress: () => void,
};

export default class NewsFeedItemFooter extends React.Component<*, P, *> {
  render() {
    const { links } = this.props;

    return (
      <View style={[styles.footer, styles.row]}>
        <View style={[styles.footerLeft, styles.row]} />
        <View style={[styles.footerRight, styles.row]}>
          {links.map((link, idx) => (
            <View
              key={link}
              style={[styles.footerLink, idx ? styles.borderLeft : undefined]}
            >
              <TouchableItem
                onPress={() => this.props.onLinkPress(link.toLowerCase())}
              >
                <Text
                  color="#00B0FF"
                  size={13}
                  lineHeight={18}
                  style={{ backgroundColor: 'white' }}
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
  footerLeft: {
    flexGrow: 1,
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
