// @flow

import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { WhitePortal, BlackPortal } from 'react-native-portal';
import { type NavigationScreenConfigProps } from 'react-navigation';
import { isIphoneX } from 'react-native-iphone-x-helper';

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
import { recentLocations } from '../../utils/requestFactory';

let NAVIGATION_HEIGHT = 56;

if (Platform.OS === 'ios') {
  NAVIGATION_HEIGHT = 70;

  if (isIphoneX()) {
    NAVIGATION_HEIGHT = 88;
  }
}

const HEADER_ID = 'CreateEvent:SearchBox';

type State = {
  searchValue: string,
  locations: Array<{ id: string, name: string }>,
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
    locations: [],
  };

  componentWillMount() {
    this.fetch();
  }

  fetch = async () => {
    try {
      const { data } = await recentLocations();

      if (__DEV__) {
        console.log('[Event Locations] locations', data);
      }

      if (!data.error) {
        this.setState({ locations: data });
      }
    } catch (err) {
      if (__DEV__) {
        console.log('[Event Locations] error', err.message);
      }
    }
  };

  get filteredLocations(): Array<Object> {
    const { locations, searchValue } = this.state;

    return locations.filter((location: Object): boolean =>
      location.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  _onCellPress = (location: string) => {
    const { navigation } = this.props;

    navigation.state.params.formik.setFieldValue('location', location);
    navigation.goBack();
  };

  _onLocationChange = (searchValue: string) => {
    this.props.navigation.state.params.formik.setFieldValue(
      'location',
      searchValue
    );

    this.setState({ searchValue });
  };

  render(): React$Node {
    return (
      <Screen fill>
        <BlackPortal name={HEADER_ID}>
          <Navigation
            navigation={this.props.navigation}
            onLocationChange={this._onLocationChange}
            searchValue={
              this.state.searchValue ||
              this.props.navigation.state.params.formik.values.location
            }
          />
        </BlackPortal>

        {this.filteredLocations.length ? (
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
        ) : null}
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
    height: NAVIGATION_HEIGHT,
  },
  searchContainer: {
    flex: 1,
  },
});
