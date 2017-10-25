// @flow

import React, { Component } from 'react';
import { StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';

import { View, Text, Pill, TouchableOpacity } from '../../atoms';
import { getColor } from '../../utils/color';
import { type CommunitySimple } from '../../Types';

type Props = {
  selection: Array<string>,
  communities: Array<CommunitySimple>,
  selectCommunity: Function,
};

type State = {
  searchValue: string,
  isCollapsed: boolean,
};

export default class PostEditorSearchBox extends Component<Props, State> {
  state = {
    searchValue: '',
    selection: [],
    isCollapsed: true,
  };

  closeInterval = null;

  componentDidMount() {
    this.refs.searchInput.focus();
  }

  componentWillUnmount() {
    clearInterval(this.closeInterval);
  }

  get isEmptySearchValue(): boolean {
    return !!!this.state.searchValue;
  }

  get fileredCommunities(): ?Array<CommunitySimple> {
    const { searchValue } = this.state;

    return this.props.communities.filter(item => {
      const name = item.name.toLowerCase();
      return name.indexOf(searchValue.toLowerCase()) !== -1;
    });
  }

  showList = () => {
    clearInterval(this.closeInterval);
    this.setState({ isCollapsed: false });
  };

  hideList = () => {
    clearInterval(this.closeInterval);
    this.closeInterval = setInterval(() => {
      this.setState({ isCollapsed: true });
    }, 2000);
  };

  onSearchChange(searchValue: string) {
    this.setState({ searchValue });
  }

  onSearchKeyPress = (e: SyntheticEvent<HTMLInputElement>) => {
    if (
      e.nativeEvent.key.toLowerCase() === 'backspace' &&
      this.isEmptySearchValue
    ) {
      this.removeLastComunity();
    }
  };

  selectCommunity = (item: CommunitySimple) => {
    const selection = this.props.selection.concat(item.id);

    this.props.selectCommunity(selection);

    this.setState({
      searchValue: '',
      isCollapsed: true,
    });
  };

  removeLastComunity() {
    const { selection } = this.state;
    selection.splice(selection.length - 1, 1);

    this.props.selectCommunity(selection);

    this.setState({ selection });
  }

  renderselection() {
    const communities = this.props.communities.filter(community =>
      this.props.selection.includes(community.id)
    );
    return (
      <View style={styles.pillContainer}>
        {communities.map(pill => (
          <View key={pill.id} style={styles.pillItem}>
            <Pill title={pill.name} color={getColor('orange')} />
          </View>
        ))}
      </View>
    );
  }

  renderListOfCommunities(): ?React$Element<*> {
    return !this.state.isCollapsed ? (
      <View style={styles.listContainer}>
        {(this.fileredCommunities || []).map((item: CommunitySimple) => {
          if (!this.props.selection.includes(item.id)) {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => this.selectCommunity(item)}
              >
                <View style={[styles.listRow, styles.border]}>
                  <Text color="#455A64" size={15} lineHeight={18}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }

          return null;
        })}
      </View>
    ) : null;
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => this.refs.searchInput.focus()}>
          <View style={styles.border}>
            <Text
              size={11}
              weight="500"
              lineHeight={20}
              color={getColor('gray')}
              style={styles.text}
            >
              Post in:
            </Text>
            {this.renderselection()}
            <View style={styles.inputContainer}>
              <TextInput
                onChangeText={(text: string) => this.onSearchChange(text)}
                onKeyPress={this.onSearchKeyPress}
                value={this.state.searchValue}
                underlineColorAndroid="transparent"
                style={styles.searchInput}
                onFocus={this.showList}
                onBlur={this.hideList}
                ref="searchInput"
                minWidth={80}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        {this.renderListOfCommunities()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
  },
  border: {
    borderColor: '#ECEFF1',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    paddingTop: 10,
    paddingRight: 15,
  },
  pillContainer: {
    marginHorizontal: -1,
    flexDirection: 'row',
  },
  pillItem: {
    paddingHorizontal: 1,
    paddingBottom: 10,
  },
  text: {
    marginRight: 10,
  },
  inputContainer: {
    flexGrow: 1,
    paddingLeft: 5,
    justifyContent: 'center',
    paddingBottom: 10,
  },
  searchInput: {
    lineHeight: 18,
    fontSize: 14,
    color: '#B0BEC5',
  },
  listContainer: {},
  listRow: {
    paddingVertical: 11,
  },
});
