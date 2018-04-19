// @flow

import React, { Component } from 'react';
import {
  Switch,
  StyleSheet,
  DatePickerIOS,
  DatePickerAndroid,
  TimePickerAndroid,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import Collapsible from 'react-native-collapsible';

import { TableView, Icon, Image, View, Text } from '../../atoms';
import { getColor } from '../../utils/color';
import { css } from '../../utils/style';
import { type Community } from '../../Types';

type SetingsProps = {
  title: string,
  name: string,
};

type PrivacyProps = {
  value: 'public' | 'private',
};

type SurveyProps = {
  value: boolean,
};

type SharingProps = {
  value: 'presenters' | 'everyone',
};

type LocationProps = {
  title: string,
  onPress: Function,
};

type DatePickerProps = {
  open: boolean,
  date: Date,
  onDateChange: Date => void,
};

type DateProps = {
  title: string,
  value: Date,
  onPress: Function,
};

export class PrivacyCell extends Component<PrivacyProps> {
  static contextTypes = {
    formik: PropTypes.object,
  };

  render(): React$Node {
    const { value } = this.props;
    const { formik } = this.context;

    return (
      <TableView.Cell
        title={value === 'public' ? 'Public' : 'Private'}
        accessory={formik.values.privacy === value ? 'Checkmark' : undefined}
        titleTextColor={
          formik.values.privacy === value ? '#455A64' : getColor('gray')
        }
        onPress={() => formik.setFieldValue('privacy', value)}
      />
    );
  }
}

export class SurveyCell extends Component<SurveyProps> {
  static contextTypes = {
    formik: PropTypes.object,
  };

  render(): React$Node {
    const { value } = this.props;
    const { formik } = this.context;

    return (
      <TableView.Cell
        title={value ? 'On' : 'Off'}
        accessory={
          formik.values.enable_survey === value ? 'Checkmark' : undefined
        }
        titleTextColor={
          formik.values.enable_survey === value ? '#455A64' : getColor('gray')
        }
        onPress={() => formik.setFieldValue('enable_survey', value)}
      />
    );
  }
}

export class SharingCell extends Component<SharingProps> {
  static contextTypes = {
    formik: PropTypes.object,
  };

  render(): React$Node {
    const { value } = this.props;
    const { formik } = this.context;

    return (
      <TableView.Cell
        title={value === 'presenters' ? 'Only presenters' : 'Everyone'}
        accessory={
          formik.values.sharing_webcams === value ? 'Checkmark' : undefined
        }
        titleTextColor={
          formik.values.sharing_webcams === value ? '#455A64' : getColor('gray')
        }
        onPress={() => formik.setFieldValue('sharing_webcams', value)}
      />
    );
  }
}

export class SettingsCell extends Component<SetingsProps> {
  static contextTypes = {
    formik: PropTypes.object,
  };

  render(): React$Node {
    const { title, name } = this.props;
    const { formik } = this.context;

    return (
      <TableView.Cell
        title={title}
        cellAccessoryView={
          <Switch
            value={formik.values[name]}
            onValueChange={(value: boolean) => {
              formik.setFieldValue(name, value);
            }}
          />
        }
      />
    );
  }
}

export class LocationCell extends Component<LocationProps> {
  render() {
    return (
      <TableView.Cell
        titleTextColor="#455A64"
        cellImageView={
          <Icon
            name="map-pin"
            size="md"
            color="#455A64"
            style={css('marginRight', 15)}
          />
        }
        {...this.props}
      />
    );
  }
}

export class CommunityCell extends Component<
  Community & { onPress: Function, selected: boolean }
> {
  render(): React$Node {
    const { cover_photo, name, onPress, selected } = this.props;

    return (
      <TableView.Cell
        title={name}
        cellImageView={
          <Image source={{ uri: cover_photo }} style={styles.communityImage} />
        }
        cellAccessoryView={
          <View
            style={[
              styles.checkmarkWrapper,
              {
                borderColor: selected ? getColor('red') : '#CFD8DC',
                backgroundColor: selected ? getColor('red') : 'transparent',
              },
            ]}
          >
            <Icon
              name="check"
              size={18}
              color={selected ? 'white' : '#B0BEC5'}
            />
          </View>
        }
        onPress={onPress}
      />
    );
  }
}

export const DatePickerCell = (props: DatePickerProps): React$Node => {
  let date = {};

  async function openAndroidDatePicker() {
    try {
      const { action, ...bag } = await DatePickerAndroid.open({
        date: props.date,
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        date = { ...bag };

        openAndroidTimePicker();
      }
    } catch ({ code, message }) {}
  }

  async function openAndroidTimePicker() {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: props.date.getHours(),
        minute: props.date.getMinutes(),
        is24Hour: false,
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        props.onDateChange(
          new Date(
            date.year,
            date.month,
            date.day,
            hour,
            minute,
            props.date.getSeconds(),
            props.date.getMilliseconds()
          )
        );

        date = {};
      }
    } catch ({ code, message }) {}
  }

  if (props.open && Platform.OS === 'android') {
    openAndroidDatePicker();

    return null;
  }

  return (
    <Collapsible collapsed={!props.open}>
      <TableView.Cell
        cellContentView={
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <DatePickerIOS {...props} />
          </View>
        }
      />
    </Collapsible>
  );
};

export const DateCell = (props: DateProps): React$Node => {
  return (
    <TableView.Cell
      cellStyle="RightDetail"
      title={props.title}
      detail={format(props.value, 'MMM D, YYYY    h:mm A')}
      titleTextColor={getColor('gray')}
      rightDetailColor={getColor('linkBlue')}
      onPress={() => props.onPress('date')}
    />
  );
};

const styles = StyleSheet.create({
  checkmarkWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  communityImage: {
    width: 28,
    height: 28,
    borderRadius: 3,
    marginRight: 10,
  },
});
