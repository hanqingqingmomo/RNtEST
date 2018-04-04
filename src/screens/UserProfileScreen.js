// @flow

import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { connect, type Connector } from 'react-redux';
import { WhitePortal, BlackPortal } from 'react-native-portal';

import {
  ActionSheetProvider,
  connectActionSheet,
} from '@expo/react-native-action-sheet';
import {
  ActivityIndicator,
  AvatarPicker,
  CenterView,
  Fetch,
  Form,
  FormField,
  Image,
  NavigationIconButton,
  NavigationTextButton,
  Screen,
  TableView,
  Text,
  View,
} from '../atoms';
import { getColor } from '../utils/color';
import { RQLeaveCommunity } from '../utils/requestFactory';
import { selectUser } from '../redux/selectors';
import { setUserProfile } from '../redux/ducks/application';
import type {
  CommunitySimple,
  FetchProps,
  ScreenProps,
  Store,
  User,
} from '../Types';
import {
  makeUpdateProfileReq,
  makeReadProfileRq,
} from '../utils/requestFactory';

const { Table, Section, Cell } = TableView;

type P = ScreenProps<*> & {
  screenProps: any,
  setUserProfile: Function,
  showActionSheetWithOptions: Function,
  user: User,
};

const BG_COLOR = '#ECEFF1';

const HEADER_RIGHT_ID = 'UserProfile:HeaderRight';
const HEADER_LEFT_ID = 'UserProfile:HeaderLeft';

function DismissModalButton({ onPress }) {
  return (
    <NavigationIconButton name="close" color={'orange'} onPress={onPress} />
  );
}

// TODO rewrite profile update so that screen don't blink
@connectActionSheet
class UserProfileScreen extends React.Component<P> {
  onAvatarChange = (
    setFieldValue: (string, any) => void,
    setFieldTouched: (string, boolean) => void
  ) => (photo: string) => {
    setFieldValue('profile_photo', photo);
    setFieldTouched('profile_photo', true);
  };

  handleSubmit = (fetch: any) => async (user: User) => {
    const updateProfileReq = makeUpdateProfileReq(user);
    const updateProfileRes = await fetch(
      updateProfileReq.url,
      updateProfileReq.options
    );

    if (updateProfileRes.error) {
    } else {
      this.props.setUserProfile(updateProfileRes.data);
    }
  };

  leaveCommunity = async (fetch: any, community: CommunitySimple) => {
    const leaveCommunityRes = await RQLeaveCommunity(
      this.props.user.id,
      community.id
    );

    if (leaveCommunityRes.ok) {
      const { data } = await fetch();
      this.props.setUserProfile(data);
    }
  };

  onLeaveCommunity(fetch: any, community: CommunitySimple) {
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

  renderUserDetailCell = ({
    placeholder,
    name,
    onChange,
    editable,
  }: Object): React$Element<*> => {
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
              editable={editable}
              inputContainerStyle={{
                marginBottom: 0,
                paddingTop: 5,
                height: 30,
                borderBottomWidth: 0,
              }}
              labelTextStyle={{
                transform: [{ translateY: -5 }],
              }}
              onChange={onChange}
            />
          </View>
        }
      />
    );
  };

  renderCommunityCell = (fetch: any, community: CommunitySimple) => {
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
              uri: community.cover_photo,
            }}
          />
        }
        onPress={this.onLeaveCommunity(fetch, community)}
      />
    );
  };

  handleFieldChange = (
    setFieldValue: (string, boolean) => void,
    setFieldTouched: (string, boolean) => void,
    event: Object
  ) => {
    const { name, value } = event.target;
    setFieldTouched(name, true);
    setFieldValue(name, value);
  };

  handleClose = (isTouched: boolean) => {
    if (isTouched) {
      Alert.alert(
        'Edit profile',
        'Are you sure you want to discard all changes?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Yes',
            onPress: this.props.screenProps.dismissModalRoute,
          },
        ]
      );
    } else {
      this.props.screenProps.dismissModalRoute();
    }
  };

  compareData(oldData: Object, newData: Object) {
    return JSON.stringify(oldData) === JSON.stringify(newData);
  }

  render() {
    const myProfileReq = makeReadProfileRq('me');
    let user = this.props.user;

    return (
      <Fetch url={myProfileReq.url} options={myProfileReq.options}>
        {({ loading, data, fetch }: FetchProps<User>) => {
          if (loading === false && data) {
            user = data;
          }

          return (
            <Form
              onSubmit={this.handleSubmit(fetch)}
              initialValues={{
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                profile_photo: user.profile_photo || '',
              }}
              enableReinitialize={true}
              render={form => (
                <Screen fill>
                  <BlackPortal name={HEADER_LEFT_ID}>
                    <DismissModalButton
                      onPress={() =>
                        this.handleClose(Object.keys(form.touched).length > 0)}
                    />
                  </BlackPortal>
                  {loading === false && data ? (
                    <View>
                      <BlackPortal name={HEADER_RIGHT_ID}>
                        {!this.compareData(this.props.user, {
                          ...this.props.user,
                          ...form.values,
                        }) ? (
                          <NavigationTextButton
                            title="Save"
                            onPress={form.handleSubmit}
                          />
                        ) : null}
                      </BlackPortal>
                      <Table>
                        <Section sectionPaddingTop={0}>
                          <Cell
                            cellContentView={
                              <CenterView style={styles.avatarPickerCell}>
                                <AvatarPicker
                                  imageURI={form.values.profile_photo}
                                  onChange={this.onAvatarChange(
                                    form.setFieldValue,
                                    form.setFieldTouched
                                  )}
                                  outline={3}
                                  size={82}
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
                            editable: true,
                            onChange: e =>
                              this.handleFieldChange(
                                form.setFieldValue,
                                form.setFieldTouched,
                                e
                              ),
                          })}
                          {this.renderUserDetailCell({
                            placeholder: 'Last name',
                            name: 'last_name',
                            editable: true,
                            onChange: e =>
                              this.handleFieldChange(
                                form.setFieldValue,
                                form.setFieldTouched,
                                e
                              ),
                          })}
                          {this.renderUserDetailCell({
                            placeholder: 'Email',
                            name: 'email',
                            editable: false,
                            onChange: e =>
                              this.handleFieldChange(
                                form.setFieldValue,
                                form.setFieldTouched,
                                e
                              ),
                          })}
                        </Section>
                        {user.joined_communities &&
                        user.joined_communities.length ? (
                          <Section
                            header="your communities"
                            separatorTintColor={BG_COLOR}
                          >
                            {(user.joined_communities || []
                            ).map((community: CommunitySimple) =>
                              this.renderCommunityCell(fetch, community)
                            )}
                          </Section>
                        ) : null}
                      </Table>
                    </View>
                  ) : (
                    <CenterView>
                      <ActivityIndicator />
                    </CenterView>
                  )}
                </Screen>
              )}
            />
          );
        }}
      </Fetch>
    );
  }
}

class Provider extends React.Component<P> {
  static navigationOptions = {
    headerTitle: 'Your Profile',
    headerRight: <WhitePortal name={HEADER_RIGHT_ID} />,
    headerLeft: <WhitePortal name={HEADER_LEFT_ID} />,
  };

  render(): React$Node {
    return (
      <ActionSheetProvider>
        <UserProfileScreen {...this.props} />
      </ActionSheetProvider>
    );
  }
}

export default (connect(
  (state: Store) => ({
    user: selectUser(state),
  }),
  { setUserProfile }
): Connector<{}, P>)(Provider);

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
