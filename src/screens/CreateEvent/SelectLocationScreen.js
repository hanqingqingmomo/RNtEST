// @flow

import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { WhitePortal, BlackPortal } from 'react-native-portal';
import { type NavigationScreenConfigProps } from 'react-navigation';

import {
  Screen,
  NavigationTextButton,
  TableView,
  SearchBox,
  View,
  Icon,
} from '../../atoms';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';

const HEADER_ID = 'CreateEvent:SearchBox';

const LOCATIONS = [
  {
    id: '7352d18dad46',
    name: 'Chicago',
  },
  {
    id: '7352d18dad78',
    name: 'Las Wegas',
  },
];

type State = {
  searchValue: string,
};

const Navigation = (props: Object): React$Node => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBox
          onChangeText={props.onLocationChange}
          placeholder="Enter location"
          value={props.searchValue}
        />
      </View>

      <NavigationTextButton
        title="Cancel"
        textColor={getColor('orange')}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
    </View>
  );
};

export default class SelectLocationScreen extends Component<
  NavigationScreenConfigProps,
  State
> {
  static navigationOptions = ({ navigation }) => ({
    header: <WhitePortal name={HEADER_ID} />,
  });

  state = {
    searchValue: '',
  };

  get filteredLocations(): Array<Object> {
    return LOCATIONS.filter((location: Object) =>
      location.name.toLowerCase().includes(this.state.searchValue.toLowerCase())
    );
  }

  _onCellPress = (location: string) => {
    const { navigation } = this.props;

    navigation.state.params.formik.setFieldValue('location', location);
    navigation.goBack();
  };

  _onLocationChange = (searchValue: string) => {
    this.setState({ searchValue });
  };

  render(): React$Node {
    return (
      <Screen fill>
        <BlackPortal name={HEADER_ID}>
          <Navigation
            navigation={this.props.navigation}
            onLocationChange={this._onLocationChange}
            searchValue={this.state.searchValue}
          />
        </BlackPortal>

        <TableView.Table>
          <TableView.Section header="Recent Locations">
            {this.filteredLocations.map((location: Object): React$Node => (
              <TableView.Cell
                key={location.id}
                title={location.name}
                onPress={() => this._onCellPress(location.name)}
                titleTextColor="#455A64"
                cellImageView={
                  <Icon
                    name="map-pin"
                    size="md"
                    color="#455A64"
                    style={css('marginRight', 15)}
                  />
                }
              />
            ))}
          </TableView.Section>
        </TableView.Table>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(true) + 6,
    paddingBottom: 7,
    paddingLeft: 10,
    alignItems: 'center',
    backgroundColor: Platform.OS === 'ios' ? '#f6f6f6' : '#FFF',
    flexDirection: 'row',
    borderColor: '#a2a2a2',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  searchContainer: {
    flex: 1,
  },
});
