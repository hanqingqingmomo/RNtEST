// @flow

import React, { Component } from 'react';
import { Separator } from 'react-native-tableview-simple';

import {
  ActivityIndicator,
  CenterView,
  Fetch,
  TableView,
  FlatList,
  Text,
  Icon,
  Avatar,
  View,
} from '../../atoms';
import { makeReadCommunityMembersRq } from '../../utils/requestFactory';
import type { User, FetchProps } from '../../Types';

const { Cell } = TableView;
const AVATAR_WIDTH = 28;

type Props = {
  community: Object,
  navigateToMember: (user: User) => void,
};

type ItemProps = {
  item: User,
  separators: Object,
};

export default class MembersTab extends Component<Props> {
  keyExtractor = (item: User): string => item.id;

  renderItem = ({ item, separators }: ItemProps): any => (
    <Cell
      title={`${item.first_name} ${item.last_name}`}
      titleTextColor="#455A64"
      image={<Avatar imageURI={item.profile_photo} size={AVATAR_WIDTH} />}
      cellAccessoryView={<Icon name="chat-1" size="md" color="#CFD8DC" />}
      onPress={() => this.props.navigateToMember(item)}
      disableImageResize
      onHighlightRow={separators.highlight}
      onUnHighlightRow={separators.unhighlight}
    />
  );

  render() {
    const readCommunityMembersRq = makeReadCommunityMembersRq(
      this.props.community.id,
      9999 // TODO pagination
    );
    // TODO use flat list
    return (
      <View style={{ flex: 1 }}>
        <Fetch
          url={readCommunityMembersRq.url}
          options={readCommunityMembersRq.options}
        >
          {({ loading, error, data }: FetchProps<{ data: Array<User> }>) => {
            if (loading === true || loading === null) {
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
                  ItemSeparatorComponent={({ highlighted }) => (
                    <Separator isHidden={highlighted} />
                  )}
                />
              );
            }

            return null;
          }}
        </Fetch>
      </View>
    );
  }
}
