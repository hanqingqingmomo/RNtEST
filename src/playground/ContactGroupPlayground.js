// @flow

import React from 'react';

import { ContactGroup } from '../atoms';
import { User } from '../Types';

const users = [
  {
    profilePhoto:
      'http://cdn1.thr.com/sites/default/files/imagecache/nfe_square_383x383/2016/10/johnwick2_0.jpg',
    first_name: 'Johnathanios',
    last_name: 'Wick',
    role: 'Founder',
    email: 'bla',
    id: 1,
  },
  {
    profilePhoto:
      'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
    first_name: 'Johnathanios',
    last_name: 'Wick',
    role: 'Member',
    email: 'bla',
    id: 2,
  },
  {
    profilePhoto:
      'http://cdn1.thr.com/sites/default/files/imagecache/nfe_square_383x383/2016/10/johnwick2_0.jpg',
    first_name: 'Fero',
    last_name: 'Wick',
    role: 'Member',
    email: 'bla',
    id: 3,
  },
  {
    profilePhoto:
      'https://s3.amazonaws.com/uifaces/faces/twitter/iannnnn/128.jpg',
    first_name: 'Armani',
    last_name: 'Wick',
    role: 'Member',
    email: 'bla',
    id: 4,
  },
  {
    profilePhoto:
      'http://cdn1.thr.com/sites/default/files/imagecache/nfe_square_383x383/2016/10/johnwick2_0.jpg',
    first_name: 'Lucinda',
    last_name: 'Wick',
    role: 'Member',
    email: 'bla',
    id: 5,
  },
  {
    profilePhoto:
      'https://s3.amazonaws.com/uifaces/faces/twitter/csswizardry/128.jpg',
    first_name: 'Petko',
    last_name: 'Wick',
    role: 'Member',
    email: 'bla',
    id: 6,
  },
  {
    profilePhoto:
      'http://cdn1.thr.com/sites/default/files/imagecache/nfe_square_383x383/2016/10/johnwick2_0.jpg',
    first_name: 'Dagmar',
    last_name: 'Wick',
    role: 'Member',
    email: 'bla',
    id: 7,
  },
  {
    profilePhoto:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ekvium/128.jpg',
    first_name: 'Jozo',
    last_name: 'Wick',
    role: 'Member',
    email: 'bla',
    id: 8,
  },
  {
    profilePhoto:
      'http://cdn1.thr.com/sites/default/files/imagecache/nfe_square_383x383/2016/10/johnwick2_0.jpg',
    first_name: 'Miro',
    last_name: 'Wick',
    role: 'Member',
    email: 'bla',
    id: 9,
  },
  {
    profilePhoto:
      'https://s3.amazonaws.com/uifaces/faces/twitter/guiiipontes/128.jpg',
    first_name: 'Vlado',
    last_name: 'Wick',
    role: 'Member',
    email: 'bla',
    id: 10,
  },
  {
    profilePhoto:
      'http://cdn1.thr.com/sites/default/files/imagecache/nfe_square_383x383/2016/10/johnwick2_0.jpg',
    first_name: 'John',
    last_name: 'Wick',
    role: 'Founder',
    email: 'bla',
    id: 11,
  },
  {
    profilePhoto:
      'https://s3.amazonaws.com/uifaces/faces/twitter/zeldman/128.jpg',
    first_name: 'Bonifac',
    last_name: 'Wick',
    role: 'Member',
    email: 'bla',
    id: 12,
  },
  {
    profilePhoto:
      'http://cdn1.thr.com/sites/default/files/imagecache/nfe_square_383x383/2016/10/johnwick2_0.jpg',
    first_name: 'Ingeborga',
    last_name: 'Wick',
    role: 'Member',
    email: 'bla',
    id: 13,
  },
  {
    profilePhoto:
      'https://s3.amazonaws.com/uifaces/faces/twitter/iannnnn/128.jpg',
    first_name: 'Stanko',
    last_name: 'Wick',
    role: 'Member',
    email: 'bla',
    id: 14,
  },
  {
    profilePhoto:
      'http://cdn1.thr.com/sites/default/files/imagecache/nfe_square_383x383/2016/10/johnwick2_0.jpg',
    first_name: 'Pato',
    last_name: 'Wick',
    role: 'Member',
    email: 'bla',
    id: 15,
  },
];

export default class CommunityHeaderPlayground extends React.Component {
  static navigationOptions = { headerTitle: 'Contact Group' };

  render() {
    return (
      <ContactGroup
        onContactSelect={user => console.warn(user.first_name)}
        style={{ backgroundColor: 'orange' }}
        users={users}
      />
    );
  }
}
