// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { type NavigationScreenConfigProps } from 'react-navigation';

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

export default class AtendeesCommunitiesScreen extends Component<
  NavigationScreenConfigProps
> {
  render() {
    const readCommunitiesListRq = makeReadCommunitiesListRq(true);

    return (
      <Screen>
        <TableView.Table>
          <TableView.Section sectionPaddingTop={0}>
            <TableView.Cell
              title="Mobile Contacts"
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
                      key={community.id}
                      title={community.name}
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
                            ...this.props.navigation.state.params,
                            community_id: community.id,
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

const styles = StyleSheet.create({
  avatar: {
    marginRight: 7,
  },
});
