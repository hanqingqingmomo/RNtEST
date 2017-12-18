import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

export default class Label extends Component {
  static propTypes = {
    text: PropTypes.string,
    style: Text.propTypes.style,
    numberOfLines: PropTypes.number,
    textProps: PropTypes.object,
  };

  static defaultProps = {
    numberOfLines: 1,
    style: {
      fontSize: 16,
      textAlign: 'left',
      fontWeight: 'normal',
      color: 'white',
      backgroundColor: 'transparent',
    },
    textProps: {},
  };

  render() {
    const { text, style, numberOfLines, textProps } = this.props;
    const styles = [style];

    if (this.props.type === 'custom') {
      styles.push({
        color: '#333',
      });
    }

    if (text !== null && text.length > 0) {
      return (
        <Text {...textProps} style={styles} numberOfLines={numberOfLines}>
          {text}
        </Text>
      );
    }
    return null;
  }
}
