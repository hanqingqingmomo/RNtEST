// @flow

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import {
  ActivityIndicator,
  CenterView,
  Fetch,
  Screen,
  TableView,
  View,
  Image,
} from '../atoms';
import { ProfileCard, PopupActions } from '../blocks';
import { contentReport } from '../redux/ducks/contentObject';
import { makeReadProfileRq } from '../utils/requestFactory';
import type { CommunitySimple, Community } from '../Types';

type Props = {
  navigation: Object,
  contentReport: Object => mixed,
};

function TableImage({ cover_photo }): React$Node {
  return (
    <View style={styles.imageWrapper}>
      <Image source={{ uri: cover_photo }} style={styles.image} />
    </View>
  );
}

class MemberProfileScreen extends Component<Props> {
  static navigationOptions = ({ navigation }) => {
    const { first_name, last_name } = navigation.state.params.user;
    return {
      title: `${first_name} ${last_name}`,
    };
  };

  handleCommunityPress = (community: CommunitySimple) => {
    this.props.navigation.navigate('CommunityTab:CommunityScreen', {
      communityId: community.id,
    });
  };

  getPopupSettings() {
    return [
      {
        key: 'report',
        iconName: 'report',
        label: 'Report',
        onPress: () => {
          this.props.contentReport(this.props.navigation.state.params.user);
        },
      },
    ];
  }

  render() {
    const { navigation } = this.props;

    const memberProfileReq = makeReadProfileRq(navigation.state.params.user.id);

    return (
      <Fetch url={memberProfileReq.url} options={memberProfileReq.options}>
        {({ loading, data, error, fetch }) => {
          if (loading === false) {
            const memeberData = data.data;
            const { joined_communities } = memeberData;

            return (
              <Screen>
                <TableView.Table>
                  <TableView.Section sectionPaddingTop={0}>
                    <ProfileCard
                      user={memeberData}
                      actionsView={
                        <PopupActions actions={this.getPopupSettings()} />
                      }
                    />
                  </TableView.Section>
                  {joined_communities && joined_communities.length ? (
                    <TableView.Section header="Joined Communities">
                      {joined_communities.map((community: Community) => (
                        <TableView.Cell
                          key={community.id}
                          cellImageView={
                            <TableImage key={community.id} {...community} />
                          }
                          title={community.name}
                          onPress={() => this.handleCommunityPress(community)}
                        />
                      ))}
                    </TableView.Section>
                  ) : null}
                </TableView.Table>
              </Screen>
            );
          } else {
            return (
              <CenterView>
                <ActivityIndicator />
              </CenterView>
            );
          }
        }}
      </Fetch>
    );
  }
}

export default connect(null, { contentReport })(MemberProfileScreen);

const styles = StyleSheet.create({
  imageWrapper: {
    width: 28,
    height: 28,
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    width: 28,
    height: 28,
  },
});
