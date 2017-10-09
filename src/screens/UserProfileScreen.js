// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { connect, type Connector } from 'react-redux';
import {
  ActionSheetProvider,
  connectActionSheet,
} from '@expo/react-native-action-sheet';

import {
  AvatarPicker,
  CenterView,
  Form,
  FormField,
  Image,
  Screen,
  TableView,
  Text,
  Button,
  View,
} from '../atoms';
import { api } from '../services';
import { css } from '../utils/style';
import { selectUser } from '../redux/selectors';
import { setUserProfile } from '../redux/ducks/application';
import type { Store, User } from '../Types';

const { Table, Section, Cell } = TableView;

type Row = {
  id: number | string,
  name?: string,
  imageURI?: string,
  leftText?: string,
  rightText?: string,
};

type CommunityProps = {
  id: number | string,
  name: string,
  imageURI: string,
};

type State = {
  imageURI: string,
  user: {
    id: number,
    placeholder: string,
  },
  registrationError: boolean,
  busy: boolean,
};

type Props = {
  user: User,
};

const BG_COLOR = '#ECEFF1';

const SECTIONS = [
  {
    id: 'details',
    sectionTitle: 'PERSONAL DETAILS',
    rows: [
      { name: 'first_name', placeholder: 'First name' },
      { name: 'last_name', placeholder: 'Last name' },
      { name: 'email', placeholder: 'Email' },
    ],
  },
  {
    id: 'communities',
    sectionTitle: 'your communities',
    rows: [
      {
        id: 1,
        name:
          'Child Care Provider Training & Assistance Child Care Provider Training & Assistance',
        imageURI:
          'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png',
      },
      {
        id: 2,
        name: 'Drive to Thrive',
        imageURI:
          'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png',
      },
      {
        id: 3,
        name: 'Child Care Assistance Program',
        imageURI:
          'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png',
      },
      {
        id: 4,
        name: '3D Youth',
        imageURI:
          'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png',
      },
      {
        id: 5,
        name: 'Young Parents Program',
        imageURI:
          'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png',
      },
    ],
  },
];

@connectActionSheet
class EditUserProfileScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Edit Profile',
  };

  state = {
    imageURI:
      'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png',
    registrationError: false,
    busy: false,
  };

  handleSubmit = async (user: FormValues) => {
    this.setState({ registrationError: false, busy: true, user });
    try {
      await api.user.updateProfile(user);
      this.props.setUserProfile(user);
    } catch (err) {
      this.setState({ registrationError: true });
    } finally {
      this.setState({ busy: false });
    }
  };

  onLeaveCommunity(community: CommunityProps) {
    return () => {
      this.props.showActionSheetWithOptions(
        {
          options: ['Leave Community', 'Cancel'],
          cancelButtonIndex: 1,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            console.log('leave', community);
          }
        }
      );
    };
  }

  renderCell(id: string, row: Row | string): React$Element<*> {
    switch (id) {
      case 'communities':
        return (
          <Cell
            key={row.id}
            cellStyle="Basic"
            title={
              <Text size={15} lineHeight={18} color="#455A64">
                {row.name}
              </Text>
            }
            image={
              <Image
                style={{ borderRadius: 3, width: 28, height: 28 }}
                source={{
                  uri: row.imageURI,
                }}
              />
            }
            onPress={this.onLeaveCommunity(row)}
          />
        );
      case 'details':
        return (
          <Cell
            key={`id-${row.name}`}
            cellStyle="RightDetail"
            title={row.placeholder}
            titleTextColor="#90A4AE"
            cellAccessoryView={
              <View style={{ flexGrow: 1 }}>
                <FormField
                  style={{ fontSize: 16, textAlign: 'right' }}
                  label=""
                  name={row.name}
                  baseColor="transparent"
                  inputContainerStyle={{
                    marginBottom: 0,
                    paddingTop: 5,
                    height: 30,
                  }}
                  labelTextStyle={{
                    transform: [{ translateY: -5 }],
                  }}
                />
              </View>
            }
          />
        );

      default:
        return (
          <Cell
            key={row.id}
            cellStyle="Basic"
            title={
              <Text size={15} lineHeight={18} color="#455A64">
                {row.name}
              </Text>
            }
            image={
              <Image
                style={{ borderRadius: 5 }}
                source={{
                  uri: row.imageURI,
                }}
              />
            }
          />
        );
    }
  }

  render() {
    const { id, photo, username, ...initialValues } = this.props.user;

    return (
      <Form
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
        render={form => (
          <Screen tintColor="#F3F3F6" style={css('marginTop', -1)}>
            <Button block onPress={form.handleSubmit} size="lg" title="save" />
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
              {SECTIONS.map(section => (
                <Section
                  key={section.id}
                  sectionPaddingTop={section.sectionTitle ? 15 : 0}
                  header={section.sectionTitle}
                  separatorTintColor={BG_COLOR}
                >
                  {section.rows.map(row => this.renderCell(section.id, row))}
                </Section>
              ))}
            </Table>
          </Screen>
        )}
      />
    );
  }
}

const Provider = ({ ...props }: Object) => {
  return (
    <ActionSheetProvider>
      <EditUserProfileScreen {...props} />
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
