// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { type NavigationScreenConfigProps } from 'react-navigation';
import { connect } from 'react-redux';

import {
  Screen,
  TableView,
  Avatar,
  Fetch,
  ActivityIndicator,
  CenterView,
} from '../../atoms';
import { type Community, type FetchProps } from '../../Types';
import { makeReadCommunitiesListRq } from '../../utils/requestFactory';

class SelectCommunitiesScreen extends Component<NavigationScreenConfigProps> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.title,
  });

  membersCount = (id: string): number => {
    const { formik, communitiesField } = this.props;

    const community = formik.values[communitiesField].find(
      (community: Community): boolean => community.id === id
    );

    return community ? community.members.length : 0;
  };

  render() {
    const readCommunitiesListRq = makeReadCommunitiesListRq(true);

    return (
      <Screen>
        <TableView.Table>
          {/* <TableView.Section sectionPaddingTop={0}>
            <TableView.Cell
              cellStyle="RightDetail"
              title="Mobile Contacts"
              detail={
                __DEV__
                  ? (this.props.formik.values[this.props.contactsField] || []).length
                  : ''
              }
              accessory="DisclosureIndicator"
              cellImageView={
                <Avatar
                  source={require('./avatar.png')}
                  size={28}
                  style={styles.avatar}
                />
              }
              onPress={() => {
                this.props.navigation.navigate('SelectContactsScreen', {
                  ...this.props,
                });
              }}
            />
          </TableView.Section> */}

          <Fetch
            url={readCommunitiesListRq.url}
            options={readCommunitiesListRq.options}
          >
            {({ loading, data }: FetchProps<{ data: Array<Community> }>) => {
              return loading === false ? (
                <TableView.Section header="Communities">
                  {data.data.map((community: Community): React$Node => (
                    <TableView.Cell
                      cellStyle="RightDetail"
                      key={community.id}
                      title={community.name}
                      detail={__DEV__ ? this.membersCount(community.id) : ''}
                      accessory="DisclosureIndicator"
                      cellImageView={
                        <Avatar
                          source={{ uri: community.cover_photo }}
                          size={28}
                          radius={3}
                          style={styles.avatar}
                        />
                      }
                      onPress={() => {
                        this.props.navigation.navigate('SelectMembersScreen', {
                          ...this.props,
                          community,
                        });
                      }}
                    />
                  ))}
                </TableView.Section>
              ) : (
                <CenterView>
                  <ActivityIndicator />
                </CenterView>
              );
            }}
          </Fetch>
        </TableView.Table>
      </Screen>
    );
  }
}

const mapState = (state, props) => ({
  ...props.navigation.state.params,
});

export default connect(mapState, {})(SelectCommunitiesScreen);

const styles = StyleSheet.create({
  avatar: {
    marginRight: 7,
  },
});
