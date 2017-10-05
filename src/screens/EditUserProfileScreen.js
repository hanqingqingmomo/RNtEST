// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ActionSheetProvider,
  connectActionSheet,
} from '@expo/react-native-action-sheet';

import {
  AvatarPicker,
  Image,
  ScrollView,
  TableView,
  Text,
  View,
} from '../atoms';

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
    id: 'photo',
    sectionTitle: '',
    rows: [
      {
        id: 21,
        imageURI:
          'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png',
      },
    ],
  },
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

@connectActionSheet
class EditUserProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit Profile',
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

  cellPhotoContentView(row: Row) {
    return (
      <View style={[{ flexGrow: 1, paddingVertical: 20 }, styles.center]}>
        <AvatarPicker imageURI={row.imageURI} size={82} outline={3} />
      </View>
    );
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
      case 'photo':
        return (
          <Cell key={row.id} cellContentView={this.cellPhotoContentView(row)} />
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
      <ScrollView style={styles.container}>
        <Table>
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
      </ScrollView>
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
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
