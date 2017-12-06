// @flow

import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { connect, type Connector } from 'react-redux';
import { WhitePortal, BlackPortal } from 'react-native-portal';
import { connectActionSheet } from '@expo/react-native-action-sheet';

import {
  ActivityIndicator,
  AvatarPicker,
  CenterView,
  Form,
  FormField,
  Image,
  NavigationIconButton,
  NavigationTextButton,
  Screen,
  TableView,
  View,
} from '../atoms';
import { getColor } from '../utils/color';
import { selectUser } from '../redux/selectors';
import { setUserProfile } from '../redux/ducks/application';
import type { CommunitySimple, ScreenProps, Store, User } from '../Types';
import {
  RQLeaveCommunity,
  RQReadProfile,
  RQUpdateProfile,
} from '../utils/requestFactory';

const { Table, Section, Cell } = TableView;

type Props = ScreenProps<*> & {
  screenProps: any,
  setUserProfile: Function,
  showActionSheetWithOptions: Function,
  user: User,
};

type State = {
  busy: boolean,
  initFetchDone: boolean,
  leavingCommunity: ?CommunitySimple,
};

const BG_COLOR = '#ECEFF1';
const HEADER_RIGHT_ID = 'UserProfile:HeaderRight';
const HEADER_LEFT_ID = 'UserProfile:HeaderLeft';

function DismissModalButton({ onPress }) {
  return (
    <NavigationIconButton name="close" color={'orange'} onPress={onPress} />
  );
}

@connectActionSheet
class UserProfileScreen extends React.Component<Props, State> {
  static navigationOptions = {
    headerTitle: 'Your Profile',
    headerRight: <WhitePortal name={HEADER_RIGHT_ID} />,
    headerLeft: <WhitePortal name={HEADER_LEFT_ID} />,
  };

  state = {
    busy: false,
    initFetchDone: false,
    leavingCommunity: null,
  };

  componentWillMount() {
    this.loadProfile();
  }

  onAvatarChange = (
    setFieldValue: (string, any) => void,
    setFieldTouched: (string, boolean) => void
  ) => (photo: string) => {
    setFieldValue('profile_photo', photo);
    setFieldTouched('profile_photo', true);
  };

  handleSubmit = async (values: User) => {
    const nextValues = { ...values };
    if (nextValues.profile_photo.startsWith('http')) {
      delete nextValues.profile_photo;
    }
    this.setState({ busy: true });
    await RQUpdateProfile(nextValues);
    await this.loadProfile();
    this.setState({ busy: false });
  };

  loadProfile = async () => {
    const response = await RQReadProfile('me');
    this.setState({ initFetchDone: true });
    this.props.setUserProfile(response.data);
  };

  onLeaveCommunity(community: CommunitySimple) {
    return () => {
      this.props.showActionSheetWithOptions(
        {
          options: ['Leave Community', 'Cancel'],
          cancelButtonIndex: 1,
          destructiveButtonIndex: 0,
        },
        async buttonIndex => {
          if (buttonIndex === 0) {
            this.setState({ leavingCommunity: community });
            await RQLeaveCommunity(this.props.user.id, community.id);
            await this.loadProfile();
            this.setState({ leavingCommunity: null });
          }
        }
      );
    };
  }

  renderUserDetailCell = ({
    placeholder,
    name,
    editable,
  }: Object): React$Node => {
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
            />
          </View>
        }
      />
    );
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

  renderJoinedCommunities() {
    const { user } = this.props;

    return (
      <Section header="your communities" separatorTintColor={BG_COLOR}>
        {this.state.initFetchDone === false ? (
          <Cell cellContentView={<ActivityIndicator />} />
        ) : user.joined_communities.length === 0 ? (
          <Cell title="You're not following any community yet" />
        ) : (
          user.joined_communities.map((community: CommunitySimple) => (
            <Cell
              key={community.id}
              cellStyle="Basic"
              title={community.name}
              image={
                <Image
                  style={{ borderRadius: 3, width: 28, height: 28 }}
                  source={{
                    uri: community.cover_photo,
                  }}
                />
              }
              cellAccessoryView={
                this.state.leavingCommunity &&
                this.state.leavingCommunity.id === community.id ? (
                  <ActivityIndicator />
                ) : null
              }
              onPress={this.onLeaveCommunity(community)}
            />
          ))
        )}
      </Section>
    );
  }

  render() {
    const { user } = this.props;
    return (
      <Form
        onSubmit={this.handleSubmit}
        enableReinitialize
        initialValues={{
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          profile_photo: user.profile_photo,
        }}
        render={form => (
          <Screen fill>
            <BlackPortal name={HEADER_LEFT_ID}>
              <DismissModalButton
                onPress={() =>
                  this.handleClose(Object.keys(form.touched).length > 0)}
              />
            </BlackPortal>
            <BlackPortal name={HEADER_RIGHT_ID}>
              <NavigationTextButton
                title={this.state.busy ? 'Saving' : 'Save'}
                onPress={form.submitForm}
                disabled={
                  this.state.busy ||
                  this.compareData(this.props.user, {
                    ...this.props.user,
                    ...form.values,
                  })
                }
              />
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
              <Section header="personal details" separatorTintColor={BG_COLOR}>
                {this.renderUserDetailCell({
                  placeholder: 'First name',
                  name: 'first_name',
                  editable: true,
                })}
                {this.renderUserDetailCell({
                  placeholder: 'Last name',
                  name: 'last_name',
                  editable: true,
                })}
                {this.renderUserDetailCell({
                  placeholder: 'Email',
                  name: 'email',
                  editable: false,
                })}
              </Section>
              {this.renderJoinedCommunities()}
            </Table>
          </Screen>
        )}
      />
    );
  }
}

export default (connect(
  (state: Store) => ({
    user: selectUser(state),
  }),
  { setUserProfile }
): Connector<{}, Props>)(UserProfileScreen);

const styles = StyleSheet.create({
  avatarPickerCell: {
    padding: 20,
  },
});
