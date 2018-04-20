// @flow

import React, { Component } from 'react';
import { type NavigationScreenConfigProps } from 'react-navigation';
import { WhitePortal, BlackPortal } from 'react-native-portal';

import {
  Screen,
  Text,
  Fetch,
  CenterView,
  ActivityIndicator,
  TableView,
  Avatar,
  NavigationTextButton,
  SearchBox,
} from '../../atoms';
import { type FetchProps, type User } from '../../Types';
import { makeReadCommunityMembersRq } from '../../utils/requestFactory';
import { getColor } from '../../utils/color';
import { Checkmark } from './Checkmark';

const HEADER_TITLE_ID = 'CreateEvent:SearchMembers';
const HEADER_RIGHT_ID = 'CreateEvent:SaveMembers';

type State = {
  members: Array<User>,
  searchValue: string,
  selectedMembers: Array<User>,
  loading: boolean,
};

export default class AtendeesMembersScreen extends Component<
  NavigationScreenConfigProps,
  State
> {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <WhitePortal name={HEADER_TITLE_ID} />,
      headerRight: <WhitePortal name={HEADER_RIGHT_ID} />,
    };
  };

  state = {
    members: [],
    searchValue: '',
    selectedMembers: [],
    loading: true,
  };

  get filteredMembers(): Array<User> {
    return this.state.members.filter((member: User): boolean =>
      `${member.first_name} ${member.last_name}`
        .toLowerCase()
        .includes(this.state.searchValue.toLowerCase())
    );
  }

  componentDidMount() {
    this.fetch();
  }

  fetch = async () => {
    this.setState({ loading: true });
    const readCommunityMembersRq = makeReadCommunityMembersRq(
      this.props.navigation.state.params.community_id
    );

    try {
      const data = await global.fetch(
        readCommunityMembersRq.url,
        readCommunityMembersRq.options
      );

      this.setState({
        members: JSON.parse(data._bodyInit).data,
        loading: false,
      });
    } catch (err) {}
  };

  _onSelectAll = () => {
    if (this.state.selectedMembers.length === this.state.members.length) {
      this.setState({ selectedMembers: [] });
    } else {
      this.setState({ selectedMembers: this.state.members });
    }
  };

  _onSelectMember = (member: User) => {
    const selectedMembers = [...this.state.selectedMembers];

    if (this.isSelected(member.id)) {
      selectedMembers.splice(this.findIndex(member.id), 1);
    } else {
      selectedMembers.push(member);
    }

    this.setState({ selectedMembers });
  };

  _onSaveMembers = () => {
    console.log('save');
  };

  _onSearchMembers = (searchValue: string) => {
    this.setState({ searchValue });
  };

  isSelected = (id: string) => {
    return this.state.selectedMembers.some(
      (member: User): boolean => member.id === id
    );
  };

  findIndex = (id: string) => {
    return this.state.selectedMembers.findIndex(
      (selectedMember: User): boolean => selectedMember.id === id
    );
  };

  render() {
    return this.state.loading === false ? (
      <Screen>
        <BlackPortal name={HEADER_RIGHT_ID}>
          <NavigationTextButton
            disabled={this.state.selectedMembers.length === 0}
            title="Save"
            textColor={getColor('orange')}
            onPress={this._onSaveMembers}
          />
        </BlackPortal>
        <BlackPortal name={HEADER_TITLE_ID}>
          <SearchBox
            onChangeText={this._onSearchMembers}
            placeholder="Search..."
            value={this.state.searchValue}
          />
        </BlackPortal>

        <TableView.Table>
          <TableView.Section header="child care assistance program">
            <TableView.Cell
              title="Select all community"
              cellAccessoryView={
                <Checkmark
                  selected={
                    this.state.selectedMembers.length ===
                    this.state.members.length
                  }
                  selectedBackgroundColor={getColor('linkBlue')}
                  color="white"
                />
              }
              onPress={this._onSelectAll}
            />
          </TableView.Section>
          <TableView.Section header="members">
            {this.filteredMembers.map((member: User): React$Node => (
              <TableView.Cell
                key={member.id}
                title={`${member.first_name} ${member.last_name}`}
                cellAccessoryView={
                  <Checkmark
                    selected={this.isSelected(member.id)}
                    selectedBackgroundColor={getColor('linkBlue')}
                    color="white"
                  />
                }
                cellImageView={
                  <Avatar
                    imageURI={member.profile_photo}
                    size={28}
                    style={{ marginRight: 7 }}
                  />
                }
                onPress={() => this._onSelectMember(member)}
              />
            ))}
          </TableView.Section>
        </TableView.Table>
      </Screen>
    ) : (
      <CenterView>
        <ActivityIndicator />
      </CenterView>
    );
  }
}
