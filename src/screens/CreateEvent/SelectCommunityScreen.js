// @flow

import React, { Component } from 'react';
import { WhitePortal, BlackPortal } from 'react-native-portal';
import { type NavigationScreenConfigProps } from 'react-navigation';

import { Screen, NavigationTextButton, TableView } from '../../atoms';
import { getColor } from '../../utils/color';
import { CommunityCell } from './Cells';
import { type Community } from '../../Types';

const DONE_BUTTON_ID = 'CreateEvent:DoneButton';

const COMMUNUTIES = [
  {
    id: '5c4b12e77d0b',
    name: 'Test communitasdasdy',
    cover_photo:
      'https://api-testing.poweredbyaction.org/assets/cover_photos/boytelescope.jpg',
  },
  {
    id: '5c4b12e77d0c',
    name: 'Test communitasdasdy 2',
    cover_photo:
      'https://api-testing.poweredbyaction.org/assets/cover_photos/boytelescope.jpg',
  },
  {
    id: '5c4b12e77d0d',
    name: 'Test communitasdasdy 3',
    cover_photo:
      'https://api-testing.poweredbyaction.org/assets/cover_photos/boytelescope.jpg',
  },
];

type State = {
  selectedCommunities: Array<Community>,
};

export default class SelectCommunityScreen extends Component<
  NavigationScreenConfigProps,
  State
> {
  static navigationOptions = ({ navigation }) => ({
    headerRight: <WhitePortal name={DONE_BUTTON_ID} />,
  });

  state = {
    selectedCommunities:
      this.props.navigation.state.params.formik.values.post_in || [],
  };

  _onCellPress = (community: Community) => {
    const { selectedCommunities } = this.state;

    if (this.isSelected(community.id)) {
      selectedCommunities.splice(this.getSelectedIndex(community.id), 1);
    } else {
      selectedCommunities.push(community);
    }

    this.setState({ selectedCommunities });

    this.props.navigation.state.params.formik.setFieldValue(
      'post_in',
      selectedCommunities
    );
  };

  isSelected = (id: string): boolean => {
    return this.state.selectedCommunities.some(
      (selectedCommunity: Community): boolean => selectedCommunity.id === id
    );
  };

  getSelectedIndex = (id: string): number => {
    return this.state.selectedCommunities.findIndex(
      (selectedCommunity: Community): boolean => selectedCommunity.id === id
    );
  };

  render(): React$Node {
    return (
      <Screen fill>
        <BlackPortal name={DONE_BUTTON_ID}>
          <NavigationTextButton
            title="Done"
            textColor={getColor('orange')}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
        </BlackPortal>

        <TableView.Table>
          <TableView.Section header="Recent Locations">
            {COMMUNUTIES.map((community: Object): React$Node => (
              <CommunityCell
                key={community.id}
                onPress={() => this._onCellPress(community)}
                selected={this.isSelected(community.id)}
                {...community}
              />
            ))}
          </TableView.Section>
        </TableView.Table>
      </Screen>
    );
  }
}
