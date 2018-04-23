// @flow

import React, { Component } from 'react';
import { WhitePortal, BlackPortal } from 'react-native-portal';
import { type NavigationScreenConfigProps } from 'react-navigation';

import {
  Screen,
  NavigationTextButton,
  TableView,
  Avatar,
  CenterView,
  ActivityIndicator,
  Fetch,
} from '../../atoms';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';
import { type Community, type FetchProps } from '../../Types';
import { Checkmark } from './Checkmark';
import { makeReadCommunitiesListRq } from '../../utils/requestFactory';

const DONE_BUTTON_ID = 'CreateEvent:DoneButton';

type State = {
  selectedCommunities: Array<Community>,
};

export default class PostInScreen extends Component<
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
    const readCommunitiesListRq = makeReadCommunitiesListRq(true);

    return (
      <Fetch
        url={readCommunitiesListRq.url}
        options={readCommunitiesListRq.options}
      >
        {({ loading, data }: FetchProps<{ data: Array<Community> }>) => {
          return loading === false ? (
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
                <TableView.Section sectionPaddingTop={0}>
                  {data.data.map((community: Community): React$Node => (
                    <TableView.Cell
                      key={community.id}
                      title={community.name}
                      cellImageView={
                        <Avatar
                          imageURI={community.cover_photo}
                          size={28}
                          radius={3}
                          style={css('marginRight', 7)}
                        />
                      }
                      cellAccessoryView={
                        <Checkmark
                          selected={this.isSelected(community.id)}
                          selectedBackgroundColor={getColor('red')}
                        />
                      }
                      onPress={() => this._onCellPress(community)}
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
        }}
      </Fetch>
    );
  }
}
