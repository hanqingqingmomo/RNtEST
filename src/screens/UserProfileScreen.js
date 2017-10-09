// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ActionSheetProvider,
  connectActionSheet,
} from '@expo/react-native-action-sheet';

import {
  AvatarPicker,
  CenterView,
  Image,
  Screen,
  TableView,
  Text,
} from '../atoms';
import { css } from '../utils/style';

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

const BG_COLOR = '#ECEFF1';

const SECTIONS = [
  {
    id: 'details',
    sectionTitle: 'PERSONAL DETAILS',
    rows: [
      {
        id: 11,
        leftText: 'First Name',
        rightText: 'Sean',
      },
      {
        id: 12,
        leftText: 'Last Name',
        rightText: 'Rodgers',
      },
      {
        id: 13,
        leftText: 'Email',
        rightText: 'Sean.Rodgers@ywca.com',
      },
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

type State = {
  imageURI: string,
};

@connectActionSheet
class EditUserProfileScreen extends React.Component<{}, State> {
  static navigationOptions = {
    title: 'Edit Profile',
  };

  state = {
    imageURI:
      'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png',
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

  renderCell(id: string, row: Row): React$Element<*> {
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
            key={row.id}
            cellStyle="RightDetail"
            title={
              <Text size={15} lineHeight={18} color="#90A4AE">
                {row.leftText}
              </Text>
            }
            rightDetailColor="#455A64"
            detail={row.rightText}
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
    return (
      <Screen tintColor="#F3F3F6" style={css('marginTop', -1)}>
        <Table>
          <Section sectionPaddingTop={0}>
            <Cell
              cellContentView={
                <CenterView style={styles.avatarPickerCell}>
                  <AvatarPicker
                    imageURI={this.state.imageURI}
                    size={82}
                    outline={3}
                    onChange={(imageURI: string) => this.setState({ imageURI })}
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
              sectionTintColor={BG_COLOR}
            >
              {section.rows.map(row => this.renderCell(section.id, row))}
            </Section>
          ))}
        </Table>
      </Screen>
    );
  }
}

export default ({ ...props }) => {
  return (
    <ActionSheetProvider>
      <EditUserProfileScreen {...props} />
    </ActionSheetProvider>
  );
};

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
