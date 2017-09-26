// @flow

import React from 'react';

import { CommunityHeader } from '../atoms';

export default class CommunityHeaderPlayground extends React.Component {
  static navigationOptions = { headerTitle: 'Community header' };

  render() {
    return (
      <CommunityHeader
        title="Child Care Assistance Program"
        profileImageURI="https://www.ywcaknox.com/wp-content/uploads/photo3-407x222.jpg"
        coverImageURI="https://logos-download.com/wp-content/uploads/2016/11/YWCA_logo_logotype.png"
      />
    );
  }
}
