// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { connect, type Connector } from 'react-redux';
import { WhitePortal, BlackPortal } from 'react-native-portal';

import {
  ActionSheetProvider,
  connectActionSheet,
} from '@expo/react-native-action-sheet';
import {
  AvatarPicker,
  CenterView,
  DropdownAlert,
  Fetch,
  Form,
  FormField,
  Image,
  NavigationTextButton,
  Screen,
  TableView,
  Text,
  View,
} from '../atoms';
import { type AlertPayload } from '../atoms/DropdownAlert';
import { getColor } from '../utils/color';
import { makeLeaveCommunity } from '../utils/requestFactory';
import { api } from '../services';
import { selectUser } from '../redux/selectors';
import { setUserProfile } from '../redux/ducks/application';
import type { Store, User, JoinedCommunity } from '../Types';

const { Table, Section, Cell } = TableView;

type State = {
  busy: boolean,
  imageURI: string,
  registrationError: boolean,
};

type Props = {
  navigation: Object,
  setUserProfile: Function,
  showActionSheetWithOptions: Function,
  user: User,
};

const BG_COLOR = '#ECEFF1';
const HEADER_RIGHT_ID = 'UserProfile:HeaderRight';

@connectActionSheet
class UserProfileScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Edit Profile',
    headerRight: <WhitePortal name={HEADER_RIGHT_ID} />,
  };

  state = {
    imageURI: this.props.user.profile_photo,
    registrationError: false,
    busy: false,
  };

  dropdown = null;

  get hasJoinedCommunities() {
    return !!this.props.user.joined_communities.length;
  }

  onAlertClose = (data: AlertPayload) => {
    if (data.type === 'success') {
      // this.props.navigation.goBack();
    }
  };

  handleSubmit = (fetch: any) => async (user: User) => {
    this.setState({ registrationError: false, busy: true });
    try {
      await api.user.updateProfile(user);
      this.props.setUserProfile(user);
    } catch (err) {
      this.setState({ registrationError: true });
    } finally {
      this.setState({ busy: false });
    }
  };

  leaveCommunity = async (fetch: any, community: JoinedCommunity) => {
    const leaveCommunityReg = makeLeaveCommunity(
      this.props.user.id,
      community.id
    );
    const leaveCommunityRes = await fetch(
      leaveCommunityReg.url,
      leaveCommunityReg.options
    );

    if (leaveCommunityRes.error) {
      if (this.dropdown) {
        this.dropdown.alertWithType(
          'error',
          'Ooops',
          (leaveCommunityRes.error.message: string)
        );
      }
    }
    if (this.dropdown && leaveCommunityRes.response.status < 300) {
      if (this.dropdown) {
        this.dropdown.alertWithType(
          'success',
          'Successful attempt',
          `You have left ${community.name}.`
        );
      }
    }
  };

  onLeaveCommunity(fetch: any, community: JoinedCommunity) {
    return () => {
      this.props.showActionSheetWithOptions(
        {
          options: ['Leave Community', 'Cancel'],
          cancelButtonIndex: 1,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            this.leaveCommunity(fetch, community);
          }
        }
      );
    };
  }

  renderUserDetailCell = ({ placeholder, name }: Object): React$Element<*> => {
    return (
      <Cell
        cellStyle="RightDetail"
        title={placeholder}
        titleTextColor={getColor('gray')}
        cellAccessoryView={
          <View style={{ flexGrow: 1 }}>
            <FormField
              style={{ fontSize: 16, textAlign: 'right' }}
              label=""
              name={name}
              baseColor="transparent"
              editable={name !== 'email'}
              inputContainerStyle={{
                marginBottom: 0,
                paddingTop: 5,
                height: 30,
                borderBottomWidth: 0,
              }}
              labelTextStyle={{
                transform: [{ translateY: -5 }],
              }}
            />
          </View>
        }
      />
    );
  };

  renderCommunityCell = (fetch: any, community: Object) => {
    return (
      <Cell
        key={community.id}
        cellStyle="Basic"
        title={
          <Text size={15} lineHeight={18} color="#455A64">
            {community.name}
          </Text>
        }
        image={
          <Image
            style={{ borderRadius: 3, width: 28, height: 28 }}
            source={{
              uri: community.profile_photo,
            }}
          />
        }
        onPress={this.onLeaveCommunity(fetch, community)}
      />
    );
  };

  render() {
    const { user } = this.props;

    return (
      <Fetch manual>
        {({ loading, data, error, fetch }) => (
          <Form
            onSubmit={this.handleSubmit(fetch)}
            initialValues={{
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
            }}
            render={form => (
              <Screen>
                <BlackPortal name={HEADER_RIGHT_ID}>
                  <NavigationTextButton
                    title="Save"
                    onPress={form.handleSubmit}
                  />
                </BlackPortal>
                <Table>
                  <Section sectionPaddingTop={0}>
                    <Cell
                      cellContentView={
                        <CenterView style={styles.avatarPickerCell}>
                          <AvatarPicker
                            imageURI={this.state.imageURI}
                            size={82}
                            outline={3}
                            onChange={(imageURI: string) =>
                              this.setState({ imageURI })}
                          />
                        </CenterView>
                      }
                    />
                  </Section>
                  <Section
                    header="personal details"
                    separatorTintColor={BG_COLOR}
                  >
                    {this.renderUserDetailCell({
                      placeholder: 'First name',
                      name: 'first_name',
                    })}
                    {this.renderUserDetailCell({
                      placeholder: 'Last name',
                      name: 'last_name',
                    })}
                    {this.renderUserDetailCell({
                      placeholder: 'Email',
                      name: 'email',
                    })}
                  </Section>
                  {this.hasJoinedCommunities ? (
                    <Section
                      header="your communities"
                      separatorTintColor={BG_COLOR}
                    >
                      {user.joined_communities.map(community =>
                        this.renderCommunityCell(fetch, community)
                      )}
                    </Section>
                  ) : null}
                </Table>

                <DropdownAlert
                  ref={ref => (this.dropdown = ref)}
                  onClose={this.onAlertClose}
                />
              </Screen>
            )}
          />
        )}
      </Fetch>
    );
  }
}

const Provider = ({ ...props }: Object) => {
  return (
    <ActionSheetProvider>
      <UserProfileScreen {...props} />
    </ActionSheetProvider>
  );
};

export default (connect(
  (state: Store) => ({
    user: selectUser(state),
  }),
  { setUserProfile }
): Connector<{}, Props>)(Provider);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  avatarPickerCell: {
    padding: 20,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
