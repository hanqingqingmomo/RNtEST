// @flow

import DropdownAlert from 'react-native-dropdownalert';

export type AlertPayload = {
  type: 'error',
  title: string,
  message: string,
  action: 'automatic',
};

export default DropdownAlert;
