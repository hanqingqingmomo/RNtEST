// @flow

import React, { Component } from 'react';
import { Separator } from 'react-native-tableview-simple';

import {
  ActivityIndicator,
  Avatar,
  CenterView,
  Fetch,
  FlatList,
  Icon,
  Screen,
  TableView,
  Text,
} from '../../atoms';
import { makeReadCommunityMembersRq } from '../../utils/requestFactory';
import type { User, FetchProps, Community } from '../../Types';

const AVATAR_WIDTH = 28;

type Props = {
  community: Community,
  navigateToMember(User): mixed,
};

export default class MembersTab extends Component<Props> {
  keyExtractor = (item: User) => item.id;

  renderItem = ({ item }: { item: User }) => (
    <TableView.Cell
      title={`${item.first_name} ${item.last_name}`}
      titleTextColor="#455A64"
      image={<Avatar imageURI={item.profile_photo} size={AVATAR_WIDTH} />}
      cellAccessoryView={<Icon name="chat-1" size="md" color="#CFD8DC" />}
      onPress={() => this.props.navigateToMember(item)}
      disableImageResize
    />
  );

  render() {
    const readCommunityMembersRq = makeReadCommunityMembersRq(
      this.props.community.id,
      9999 // TODO pagination
    );

    return (
      <Screen scrollEnabled={false}>
        <Fetch
          url={readCommunityMembersRq.url}
          options={readCommunityMembersRq.options}
        >
          {({ loading, error, data }: FetchProps<{ data: Array<User> }>) => {
            if (loading) {
              return (
                <CenterView>
                  <ActivityIndicator />
                </CenterView>
              );
            }

            if (error) {
              <CenterView>
                <Text>{error.message}</Text>
              </CenterView>;
            }

            if (loading === false && data) {
              return (
                <FlatList
                  data={data.data}
                  keyExtractor={this.keyExtractor}
                  renderItem={this.renderItem}
                  ItemSeparatorComponent={Separator}
                />
              );
            }

            return null;
          }}
        </Fetch>
      </Screen>
    );
  }
}
