// @flow

import React, { Component } from 'react';
import { InteractionManager, StyleSheet } from 'react-native';

import {
  ActivityIndicator,
  CenterView,
  ContactGroup,
  Fetch,
  Icon,
  NavigationIconButton,
  OrganizationHeader,
  Screen,
  TableView,
  Text,
  View,
} from '../atoms';
import { css } from '../utils/style';
import { makeReadOrganisationReq } from '../utils/requestFactory';
import type { Community, ScreenProps, FetchProps } from '../Types';

type State = {
  screenIsReady: boolean,
};

type Props = ScreenProps<*> & {
  screenProps: Object,
};

const { Table, Section, Cell } = TableView;

function DismissModalButton({ onPress }) {
  return <NavigationIconButton name="close" color="white" onPress={onPress} />;
}

export default class OrganisationProfileScreen extends Component<Props, State> {
  state = {
    screenIsReady: false,
  };

  componentWillMount() {
    InteractionManager.runAfterInteractions(this.initDataFetch);
  }

  initDataFetch = () => {
    this.setState({ screenIsReady: true });
  };

  render() {
    if (this.state.screenIsReady === false) {
      return <Screen fill />;
    }

    const readOrganisationReq = makeReadOrganisationReq();

    return (
      <Fetch
        url={readOrganisationReq.url}
        options={readOrganisationReq.options}
      >
        {({ loading, data }: FetchProps<Community>) => {
          return loading === false ? (
            <Screen fill>
              <View style={styles.dismisalButton}>
                <DismissModalButton
                  onPress={this.props.screenProps.dismissModalRoute}
                />
              </View>
              <Table>
                <Section sectionPaddingTop={0}>
                  <View style={css('backgroundColor', 'white')}>
                    <OrganizationHeader
                      title={data.name}
                      profileImageURI={data.profile_photo}
                      coverImageURI={data.cover_photo}
                    />
                    <View style={styles.users}>
                      <Icon
                        name="user"
                        color="#B0BEC5"
                        style={css('marginRight', 4)}
                        size="sm"
                      />
                      <Text
                        size={13}
                        lineHeight={15}
                        weight="600"
                        color="#B0BEC5"
                      >
                        {data.members}
                      </Text>
                    </View>
                  </View>
                </Section>

                <Section header="contact">
                  <Cell
                    contentContainerStyle={{ paddingRight: 0, paddingLeft: 0 }}
                    cellContentView={
                      <ContactGroup
                        onContactSelect={user =>
                          this.props.navigation.navigate(
                            'MemberProfileScreen',
                            { user }
                          )}
                        users={data.administrators}
                      />
                    }
                  />
                </Section>

                <Section header="about us">
                  <Cell
                    cellContentView={
                      <View style={{ paddingVertical: 20 }}>
                        <Text color="#455A64" size={14} lineHeight={18}>
                          {data.description}
                        </Text>
                      </View>
                    }
                  />
                </Section>
              </Table>
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

const styles = StyleSheet.create({
  dismisalButton: {
    position: 'absolute',
    top: 20,
    zIndex: 1,
  },
  users: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
  },
});
