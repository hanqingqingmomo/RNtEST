// @flow

import React, { Component } from 'react';
import { type NavigationScreenConfigProps } from 'react-navigation';
import { WhitePortal, BlackPortal } from 'react-native-portal';
import { connect } from 'react-redux';

import {
  Screen,
  CenterView,
  ActivityIndicator,
  TableView,
  Avatar,
  NavigationTextButton,
  NavigationIconButton,
  SearchBox,
} from '../../atoms';
import { type User, type Community } from '../../Types';
import { makeReadCommunityMembersRq } from '../../utils/requestFactory';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';
import { Checkmark } from './Checkmark';

const HEADER_TITLE_ID = 'CreateEvent:SearchMembers';
const HEADER_RIGHT_ID = 'CreateEvent:SaveMembers';

type State = {
  members: Array<User>,
  searchValue: string,
  selectedMembers: Array<User>,
  loading: boolean,
  everyone: boolean,
};

class SelectMembersScreen extends Component<
  NavigationScreenConfigProps,
  State
> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <WhitePortal name={HEADER_TITLE_ID} />,
    headerRight: <WhitePortal name={HEADER_RIGHT_ID} />,
    headerLeft: (
      <NavigationIconButton
        name="arrow-open-left-thin"
        color={getColor('orange')}
        onPress={() => navigation.goBack()}
      />
    ),
  });

  state = {
    members: [],
    searchValue: '',
    selectedMembers: [],
    loading: true,
    everyone: false,
  };

  get filteredMembers(): Array<User> {
    return this.state.members.filter((member: User): boolean =>
      `${member.first_name} ${member.last_name}`
        .toLowerCase()
        .includes(this.state.searchValue.toLowerCase())
    );
  }

  getCommunity = (): Community & { members: Array<User> } => {
    const { formik, community, communitiesField } = this.props;

    return formik.values[communitiesField].find(
      (selectedCommunity: Community) => selectedCommunity.id === community.id
    );
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = async () => {
    this.setState({ loading: true });
    const readCommunityMembersRq = makeReadCommunityMembersRq(
      this.props.community.id
    );

    try {
      const data = await global.fetch(
        readCommunityMembersRq.url,
        readCommunityMembersRq.options
      );

      const members = JSON.parse(data._bodyInit).data;

      this.setState({
        members,
        loading: false,
      });

      const community = this.getCommunity();

      if (community) {
        this.setState({
          selectedMembers: community.members,
          everyone: community.members.length === members.length,
        });
      }
    } catch (err) {}
  };

  _onSelectAll = () => {
    if (this.state.selectedMembers.length === this.state.members.length) {
      this.setState({ selectedMembers: [], everyone: false });
    } else {
      this.setState({ selectedMembers: this.state.members, everyone: true });
    }
  };

  _onSelectMember = (member: User) => {
    const selectedMembers = [...this.state.selectedMembers];

    if (this.isSelected(member.id)) {
      selectedMembers.splice(this.findIndex(member.id), 1);
    } else {
      selectedMembers.push(member);
    }

    this.setState({
      selectedMembers,
      everyone: selectedMembers.length === this.state.members.length,
    });
  };

  _onSaveMembers = () => {
    const { formik, community, communitiesField } = this.props;
    const communities = [...formik.values[communitiesField]];

    const isPushedCommunity = communities.some(
      (selectedCommunity: Community): boolean =>
        selectedCommunity.id === community.id
    );

    const newData = {
      ...community,
      members: this.state.selectedMembers,
      everyone: this.state.everyone,
    };

    if (isPushedCommunity) {
      const index = communities.findIndex(
        (selectedCommunity: Community): boolean =>
          selectedCommunity.id === community.id
      );

      communities.splice(index, 1);
    }

    if (this.state.selectedMembers.length) {
      communities.push(newData);
    }

    formik.setFieldValue(communitiesField, communities);

    this.props.navigation.goBack();
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
            // disabled={this.state.selectedMembers.length === 0}
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
                  selected={this.state.everyone}
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
                    source={{ uri: member.profile_photo }}
                    size={28}
                    style={css('marginRight', 7)}
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

const mapState = (state, props) => ({
  ...props.navigation.state.params,
});

export default connect(mapState, {})(SelectMembersScreen);
