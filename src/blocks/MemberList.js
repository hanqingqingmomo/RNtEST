// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Separator } from 'react-native-tableview-simple';

import { TableView, Icon, Avatar } from '../atoms';

const { Table, Section, Cell } = TableView;
const AVATAR_WIDTH = 28;

export default class MemberList extends Component<{}> {
  static navigationOptions = {
    title: 'Members',
  };

  renderItem = ({ item, separators }) => {
    return (
      <Cell
        title={`${item.first_name} ${item.last_name}`}
        titleTextColor="#455A64"
        image={<Avatar imageURI={item.profile_photo} size={AVATAR_WIDTH} />}
        cellAccessoryView={
          <Icon name="conversation" size="lg" color="#CFD8DC" />
        }
        onPress={() =>
          this.props.navigation.navigate('MemberProfileScreen', {
            user: item,
          })}
        disableImageResize
        onHighlightRow={separators.highlight}
        onUnHighlightRow={separators.unhighlight}
      />
    );
  };

  keyExtractor = item => item.id;

  render() {
    const { members } = this.props;

    return (
      <Table>
        <Section sectionPaddingTop={0}>
          <FlatList
            data={members}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            ItemSeparatorComponent={({ highlighted }) => (
              <Separator isHidden={highlighted} />
            )}
          />
        </Section>
      </Table>
    );
  }
}
