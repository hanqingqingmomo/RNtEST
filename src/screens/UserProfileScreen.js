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
import { makeLeaveCommunity } from '../utils/requestFactory';
import { selectUser } from '../redux/selectors';
import { setUserProfile } from '../redux/ducks/application';
import type { Store, User, CommunitySimple } from '../Types';
import {
  makeUpdateProfileReq,
  makeReadProfileRq,
} from '../utils/requestFactory';

const { Table, Section, Cell } = TableView;

type P = {
  navigation: Object,
  screenProps: any,
  setUserProfile: Function,
  showActionSheetWithOptions: Function,
  user: User,
};

const BG_COLOR = '#ECEFF1';

const HEADER_RIGHT_ID = 'UserProfile:HeaderRight';
const HEADER_LEFT_ID = 'UserProfile:HeaderLeft';

function DismissModalButton({ onPress, ...a }) {
  return (
    <NavigationIconButton name="close" color="#fc612d" onPress={onPress} />
  );
}

@connectActionSheet
class UserProfileScreen extends React.Component<P> {
  static navigationOptions = ({ screenProps }) => ({
    headerTitle: 'Your Profile',
    headerRight: <WhitePortal name={HEADER_RIGHT_ID} />,
    headerLeft: <DismissModalButton onPress={screenProps.dismissModalRoute} />,
  });

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
    const leaveCommunityReg = makeLeaveCommunity(
      this.props.user.id,
      community.id
    );
    const leaveCommunityRes = await fetch(
      leaveCommunityReg.url,
      leaveCommunityReg.options
    );

    if (leaveCommunityRes.error) {
    } else {
      fetch();
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

  handleFieldChange = (
    setFieldValue: (string, boolean) => void,
    setFieldTouched: (string, boolean) => void,
    fieldName: string,
    fieldValue: string
  ) => {
    setFieldTouched(fieldName, true);
    setFieldValue(fieldName, fieldValue);
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

    return (
      <Fetch url={myProfileReq.url} options={myProfileReq.options}>
        {({ loading, data, error, fetch }) => {
          if (loading === false && data) {
            const user = data ? data : this.props.user;

            return (
              <Form
                onSubmit={this.handleSubmit(fetch)}
                initialValues={{
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email,
                  profile_photo: user.profile_photo,
                }}
                render={form => (
                  <Screen>
                    <BlackPortal name={HEADER_LEFT_ID}>
                      <DismissModalButton
                        onPress={() =>
                          this.handleClose(
                            Object.keys(form.touched).length > 0
                          )}
                      />
                    </BlackPortal>
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
                              'first_name',
                              e.target.value
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
                              'last_name',
                              e.target.value
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
                              'email',
                              e.target.value
                            ),
                        })}
                      </Section>
                      {user.joined_communities &&
                      user.joined_communities.length ? (
                        <Section
                          header="your communities"
                          separatorTintColor={BG_COLOR}
                        >
                          {(user.joined_communities || []).map(community =>
                            this.renderCommunityCell(fetch, community)
                          )}
                        </Section>
                      ) : null}
                    </Table>
                  </Screen>
                )}
              />
            );
          }

          return (
            <CenterView>
              <ActivityIndicator />
            </CenterView>
          );
        }}
      </Fetch>
    );
  }
}
const Provider = (props: Object) => {
  return (
    <ActionSheetProvider>
      <UserProfileScreen {...props} />
    </ActionSheetProvider>
  );
};

Provider.navigationOptions = ({ screenProps }) => ({
  headerTitle: 'Your Profile',
  headerRight: <WhitePortal name={HEADER_RIGHT_ID} />,
  headerLeft: <WhitePortal name={HEADER_LEFT_ID} />,
});

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
