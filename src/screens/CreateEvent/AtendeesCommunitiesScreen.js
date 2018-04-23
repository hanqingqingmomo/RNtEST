// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { type NavigationScreenConfigProps } from 'react-navigation';
import { connect } from 'react-redux';

import {
  Screen,
  TableView,
  Avatar,
  Image,
  Fetch,
  ActivityIndicator,
  CenterView,
} from '../../atoms';
import { type Community, type FetchProps } from '../../Types';
import { css } from '../../utils/style';
import { makeReadCommunitiesListRq } from '../../utils/requestFactory';

class AtendeesCommunitiesScreen extends Component<NavigationScreenConfigProps> {
  membersCount = (id: string): number | string => {
    const { formik } = this.props;

    const community = formik.values.atendees_communities.find(
      (community: Community): boolean => community.id === id
    );

    return community ? community.members.length : '';
  };

  render() {
    const readCommunitiesListRq = makeReadCommunitiesListRq(true);

    return (
      <Screen>
        <TableView.Table>
          <TableView.Section sectionPaddingTop={0}>
            <TableView.Cell
              cellStyle="RightDetail"
              title="Mobile Contacts"
              detail={
                __DEV__
                  ? (this.props.formik.values.atendees_contacts || []).length
                  : ''
              }
              accessory="DisclosureIndicator"
              cellImageView={
                <Image
                  source={require('./avatar.png')}
                  style={[
                    css('borderRadius', 28 / 2),
                    css('width', 28),
                    css('height', 28),
                    styles.avatar,
                  ]}
                />
              }
              onPress={() => {
                this.props.navigation.navigate('AtendeesContactsScreen', {
                  ...this.props,
                });
              }}
            />
          </TableView.Section>

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
                          imageURI={community.cover_photo}
                          size={28}
                          radius={3}
                          style={styles.avatar}
                        />
                      }
                      onPress={() => {
                        this.props.navigation.navigate(
                          'AtendeesMembersScreen',
                          {
                            ...this.props,
                            community,
                          }
                        );
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

export default connect(mapState, {})(AtendeesCommunitiesScreen);

const styles = StyleSheet.create({
  avatar: {
    marginRight: 7,
  },
});
