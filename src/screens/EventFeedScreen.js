// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { WhitePortal, BlackPortal } from 'react-native-portal';
import plural from 'plural-parens';
import { type NavigationScreenConfigProps } from 'react-navigation';

import { Screen, Text, View } from '../atoms';
import { EventFeed } from '../blocks';
import { getColor } from '../utils/color';
import EventFeedHeader from './EventFeedScreen/EventFeedHeader';
import { type EventProps } from '../blocks/EventFeed/Event';

const EVENT_FEED_ID = 'EventFeed:Header';

const EVENTS = [
  {
    id: '7352d18dad90',
    name: 'Example Event name 1',
    location: 'Bratislava',
    post_in: [
      {
        id: 'ce571950f574',
        name: 'Test communitasdasdy',
        cover_photo:
          'https://api-testing.poweredbyaction.org/assets/cover_photos/boytelescope.jpg',
        profile_photo:
          'https://api-testing.poweredbyaction.org/assets/club_icons/default_community_icon.jpg',
      },
    ],
    start: '2017-12-07T11:51:06+00:00',
    end: '2017-12-07T12:51:06+00:00',
    rsvp: 'pending',
    presenters_communities: [
      {
        id: '3a758fae966b',
        first_name: 'Pba',
        last_name: 'Pba',
        email: 'pba@dispostable.com',
        profile_photo:
          'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
        members: [
          {
            id: '3a758fae966b',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966c',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966d',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966e',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
        ],
      },
    ],
    presenters_contacts: [
      {
        company: 'Creative Consulting',
        emailAddresses: [
          {
            email: 'anna-haro@mac.com',
            label: 'home',
          },
        ],
        familyName: 'Bell',
        givenName: 'Kate',
        hasThumbnail: false,
        jobTitle: 'Producer',
        middleName: '',
        phoneNumbers: [
          {
            label: 'home',
            number: '555-522-8243',
          },
        ],
        postalAddresses: [
          {
            city: 'Sausalito',
            country: 'USA',
            label: 'home',
            postCode: '94965',
            region: 'CA',
            state: 'CA',
            street: '1001  Leavenworth Street',
          },
        ],
        recordID: 'AE18B251-39AB-452E-99E1-7809EBE7ECE9',
        thumbnailPath: '',
      },
    ],
    privacy: 'public',
    atendees_communities: [
      {
        id: '3a758fae966b',
        first_name: 'Pba',
        last_name: 'Pba',
        email: 'pba@dispostable.com',
        profile_photo:
          'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
        members: [
          {
            id: '3a758fae966b',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966c',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966d',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966e',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
        ],
      },
      {
        id: '3a758fae966c',
        first_name: 'Pba',
        last_name: 'Pba',
        email: 'pba@dispostable.com',
        profile_photo:
          'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
        members: [
          {
            id: '3a758fae966b',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966c',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966d',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966e',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
        ],
      },
    ],
    atendees_contacts: [
      {
        company: 'Creative Consulting',
        emailAddresses: [
          {
            email: 'anna-haro@mac.com',
            label: 'home',
          },
        ],
        familyName: 'Bell',
        givenName: 'Kate',
        hasThumbnail: false,
        jobTitle: 'Producer',
        middleName: '',
        phoneNumbers: [
          {
            label: 'home',
            number: '555-522-8243',
          },
        ],
        postalAddresses: [
          {
            city: 'Sausalito',
            country: 'USA',
            label: 'home',
            postCode: '94965',
            region: 'CA',
            state: 'CA',
            street: '1001  Leavenworth Street',
          },
        ],
        recordID: 'AE18B251-39AB-452E-99E1-7809EBE7ECE9',
        thumbnailPath: '',
      },
    ],
  },
  {
    id: '7352d18dad94',
    name: 'Example Event name 2',
    location: 'Chicago',
    post_in: [
      {
        id: '7352d18dad90',
        name: 'Comunity name',
      },
    ],
    start: '2017-12-24T11:51:06+00:00',
    end: '2017-12-24T12:51:06+00:00',
    rsvp: 'not_going',
    presenters_communities: [
      {
        id: '3a758fae966b',
        first_name: 'Pba',
        last_name: 'Pba',
        email: 'pba@dispostable.com',
        profile_photo:
          'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
        members: [
          {
            id: '3a758fae966b',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966c',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966d',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966e',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
        ],
      },
    ],
    presenters_contacts: [
      {
        company: 'Creative Consulting',
        emailAddresses: [
          {
            email: 'anna-haro@mac.com',
            label: 'home',
          },
        ],
        familyName: 'Bell',
        givenName: 'Kate',
        hasThumbnail: false,
        jobTitle: 'Producer',
        middleName: '',
        phoneNumbers: [
          {
            label: 'home',
            number: '555-522-8243',
          },
        ],
        postalAddresses: [
          {
            city: 'Sausalito',
            country: 'USA',
            label: 'home',
            postCode: '94965',
            region: 'CA',
            state: 'CA',
            street: '1001  Leavenworth Street',
          },
        ],
        recordID: 'AE18B251-39AB-452E-99E1-7809EBE7ECE9',
        thumbnailPath: '',
      },
    ],
    privacy: 'public',
    atendees_communities: [
      {
        id: '3a758fae966b',
        first_name: 'Pba',
        last_name: 'Pba',
        email: 'pba@dispostable.com',
        profile_photo:
          'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
        members: [
          {
            id: '3a758fae966b',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
        ],
      },
    ],
    atendees_contacts: [
      {
        company: 'Creative Consulting',
        emailAddresses: [
          {
            email: 'anna-haro@mac.com',
            label: 'home',
          },
        ],
        familyName: 'Bell',
        givenName: 'Kate',
        hasThumbnail: false,
        jobTitle: 'Producer',
        middleName: '',
        phoneNumbers: [
          {
            label: 'home',
            number: '555-522-8243',
          },
        ],
        postalAddresses: [
          {
            city: 'Sausalito',
            country: 'USA',
            label: 'home',
            postCode: '94965',
            region: 'CA',
            state: 'CA',
            street: '1001  Leavenworth Street',
          },
        ],
        recordID: 'AE18B251-39AB-452E-99E1-7809EBE7ECE9',
        thumbnailPath: '',
      },
    ],
  },
  {
    id: '7352d18dad95',
    name: 'Example Event name 5',
    location: 'Chicago',
    post_in: [
      {
        id: '7352d18dad90',
        name: 'Comunity name',
      },
    ],
    start: '2017-12-24T14:51:06+00:00',
    end: '2017-12-24T15:51:06+00:00',
    rsvp: 'not_going',
    presenters_communities: [
      {
        id: '3a758fae966b',
        first_name: 'Pba',
        last_name: 'Pba',
        email: 'pba@dispostable.com',
        profile_photo:
          'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
        members: [
          {
            id: '3a758fae966b',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966c',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966d',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966e',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
        ],
      },
    ],
    presenters_contacts: [
      {
        company: 'Creative Consulting',
        emailAddresses: [
          {
            email: 'anna-haro@mac.com',
            label: 'home',
          },
        ],
        familyName: 'Bell',
        givenName: 'Kate',
        hasThumbnail: false,
        jobTitle: 'Producer',
        middleName: '',
        phoneNumbers: [
          {
            label: 'home',
            number: '555-522-8243',
          },
        ],
        postalAddresses: [
          {
            city: 'Sausalito',
            country: 'USA',
            label: 'home',
            postCode: '94965',
            region: 'CA',
            state: 'CA',
            street: '1001  Leavenworth Street',
          },
        ],
        recordID: 'AE18B251-39AB-452E-99E1-7809EBE7ECE9',
        thumbnailPath: '',
      },
    ],
    privacy: 'public',
    atendees_communities: [
      {
        id: '3a758fae966b',
        first_name: 'Pba',
        last_name: 'Pba',
        email: 'pba@dispostable.com',
        profile_photo:
          'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
        members: [
          {
            id: '3a758fae966b',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
        ],
      },
    ],
    atendees_contacts: [
      {
        company: 'Creative Consulting',
        emailAddresses: [
          {
            email: 'anna-haro@mac.com',
            label: 'home',
          },
        ],
        familyName: 'Bell',
        givenName: 'Kate',
        hasThumbnail: false,
        jobTitle: 'Producer',
        middleName: '',
        phoneNumbers: [
          {
            label: 'home',
            number: '555-522-8243',
          },
        ],
        postalAddresses: [
          {
            city: 'Sausalito',
            country: 'USA',
            label: 'home',
            postCode: '94965',
            region: 'CA',
            state: 'CA',
            street: '1001  Leavenworth Street',
          },
        ],
        recordID: 'AE18B251-39AB-452E-99E1-7809EBE7ECE9',
        thumbnailPath: '',
      },
    ],
  },
  {
    id: '7352d18dad91',
    name: 'Example Event name 3',
    location: 'Chicago',
    post_in: [
      {
        id: '7352d18dad90',
        name: 'Comunity name',
      },
    ],
    start: '2018-12-24T11:51:06+00:00',
    end: '2018-12-24T12:51:06+00:00',
    rsvp: 'not_going',
    presenters_communities: [
      {
        id: '3a758fae966b',
        first_name: 'Pba',
        last_name: 'Pba',
        email: 'pba@dispostable.com',
        profile_photo:
          'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
        members: [
          {
            id: '3a758fae966b',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966c',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966d',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966e',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
        ],
      },
    ],
    presenters_contacts: [
      {
        company: 'Creative Consulting',
        emailAddresses: [
          {
            email: 'anna-haro@mac.com',
            label: 'home',
          },
        ],
        familyName: 'Bell',
        givenName: 'Kate',
        hasThumbnail: false,
        jobTitle: 'Producer',
        middleName: '',
        phoneNumbers: [
          {
            label: 'home',
            number: '555-522-8243',
          },
        ],
        postalAddresses: [
          {
            city: 'Sausalito',
            country: 'USA',
            label: 'home',
            postCode: '94965',
            region: 'CA',
            state: 'CA',
            street: '1001  Leavenworth Street',
          },
        ],
        recordID: 'AE18B251-39AB-452E-99E1-7809EBE7ECE9',
        thumbnailPath: '',
      },
    ],
    privacy: 'public',
    atendees_communities: [
      {
        id: '3a758fae966b',
        first_name: 'Pba',
        last_name: 'Pba',
        email: 'pba@dispostable.com',
        profile_photo:
          'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
        members: [
          {
            id: '3a758fae966b',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
        ],
      },
    ],
    atendees_contacts: [
      {
        company: 'Creative Consulting',
        emailAddresses: [
          {
            email: 'anna-haro@mac.com',
            label: 'home',
          },
        ],
        familyName: 'Bell',
        givenName: 'Kate',
        hasThumbnail: false,
        jobTitle: 'Producer',
        middleName: '',
        phoneNumbers: [
          {
            label: 'home',
            number: '555-522-8243',
          },
        ],
        postalAddresses: [
          {
            city: 'Sausalito',
            country: 'USA',
            label: 'home',
            postCode: '94965',
            region: 'CA',
            state: 'CA',
            street: '1001  Leavenworth Street',
          },
        ],
        recordID: 'AE18B251-39AB-452E-99E1-7809EBE7ECE9',
        thumbnailPath: '',
      },
    ],
  },
  {
    id: '7352d18dad93',
    name: 'Example Event name 4',
    location: 'Chicago',
    post_in: [
      {
        id: '7352d18dad90',
        name: 'Comunity name',
      },
    ],
    start: '2018-12-24T11:51:06+00:00',
    end: '2018-12-24T12:51:06+00:00',
    rsvp: 'pending',
    presenters_communities: [
      {
        id: '3a758fae966b',
        first_name: 'Pba',
        last_name: 'Pba',
        email: 'pba@dispostable.com',
        profile_photo:
          'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
        members: [
          {
            id: '3a758fae966b',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966c',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966d',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966e',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
        ],
      },
    ],
    presenters_contacts: [
      {
        company: 'Creative Consulting',
        emailAddresses: [
          {
            email: 'anna-haro@mac.com',
            label: 'home',
          },
        ],
        familyName: 'Bell',
        givenName: 'Kate',
        hasThumbnail: false,
        jobTitle: 'Producer',
        middleName: '',
        phoneNumbers: [
          {
            label: 'home',
            number: '555-522-8243',
          },
        ],
        postalAddresses: [
          {
            city: 'Sausalito',
            country: 'USA',
            label: 'home',
            postCode: '94965',
            region: 'CA',
            state: 'CA',
            street: '1001  Leavenworth Street',
          },
        ],
        recordID: 'AE18B251-39AB-452E-99E1-7809EBE7ECE9',
        thumbnailPath: '',
      },
    ],
    privacy: 'public',
    atendees_communities: [
      {
        id: '3a758fae966b',
        first_name: 'Pba',
        last_name: 'Pba',
        email: 'pba@dispostable.com',
        profile_photo:
          'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
        members: [
          {
            id: '3a758fae966b',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
        ],
      },
    ],
    atendees_contacts: [
      {
        company: 'Creative Consulting',
        emailAddresses: [
          {
            email: 'anna-haro@mac.com',
            label: 'home',
          },
        ],
        familyName: 'Bell',
        givenName: 'Kate',
        hasThumbnail: false,
        jobTitle: 'Producer',
        middleName: '',
        phoneNumbers: [
          {
            label: 'home',
            number: '555-522-8243',
          },
        ],
        postalAddresses: [
          {
            city: 'Sausalito',
            country: 'USA',
            label: 'home',
            postCode: '94965',
            region: 'CA',
            state: 'CA',
            street: '1001  Leavenworth Street',
          },
        ],
        recordID: 'AE18B251-39AB-452E-99E1-7809EBE7ECE9',
        thumbnailPath: '',
      },
    ],
  },
  {
    id: '7352d18dad10',
    name: 'Example Event name 7',
    location: 'Chicago',
    post_in: [
      {
        id: '7352d18dad90',
        name: 'Comunity name',
      },
    ],
    start: '2018-12-24T11:51:06+00:00',
    end: '2018-12-24T12:51:06+00:00',
    rsvp: 'going',
    presenters_communities: [
      {
        id: '3a758fae966b',
        first_name: 'Pba',
        last_name: 'Pba',
        email: 'pba@dispostable.com',
        profile_photo:
          'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
        members: [
          {
            id: '3a758fae966b',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966c',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966d',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966e',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
        ],
      },
    ],
    presenters_contacts: [
      {
        company: 'Creative Consulting',
        emailAddresses: [
          {
            email: 'anna-haro@mac.com',
            label: 'home',
          },
        ],
        familyName: 'Bell',
        givenName: 'Kate',
        hasThumbnail: false,
        jobTitle: 'Producer',
        middleName: '',
        phoneNumbers: [
          {
            label: 'home',
            number: '555-522-8243',
          },
        ],
        postalAddresses: [
          {
            city: 'Sausalito',
            country: 'USA',
            label: 'home',
            postCode: '94965',
            region: 'CA',
            state: 'CA',
            street: '1001  Leavenworth Street',
          },
        ],
        recordID: 'AE18B251-39AB-452E-99E1-7809EBE7ECE9',
        thumbnailPath: '',
      },
    ],
    privacy: 'public',
    atendees_communities: [
      {
        id: '3a758fae966b',
        first_name: 'Pba',
        last_name: 'Pba',
        email: 'pba@dispostable.com',
        profile_photo:
          'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
        members: [
          {
            id: '3a758fae966b',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
        ],
      },
    ],
    atendees_contacts: [
      {
        company: 'Creative Consulting',
        emailAddresses: [
          {
            email: 'anna-haro@mac.com',
            label: 'home',
          },
        ],
        familyName: 'Bell',
        givenName: 'Kate',
        hasThumbnail: false,
        jobTitle: 'Producer',
        middleName: '',
        phoneNumbers: [
          {
            label: 'home',
            number: '555-522-8243',
          },
        ],
        postalAddresses: [
          {
            city: 'Sausalito',
            country: 'USA',
            label: 'home',
            postCode: '94965',
            region: 'CA',
            state: 'CA',
            street: '1001  Leavenworth Street',
          },
        ],
        recordID: 'AE18B251-39AB-452E-99E1-7809EBE7ECE9',
        thumbnailPath: '',
      },
    ],
  },
  {
    id: '7352d18dad11',
    name: 'Example Webinar',
    location: 'Chicago',
    post_in: [
      {
        id: '7352d18dad90',
        name: 'Comunity name',
      },
    ],
    start: '2018-12-24T11:51:06+00:00',
    end: '2018-12-24T12:51:06+00:00',
    rsvp: 'going',
    webinar: true,
    presenters_communities: [
      {
        id: '3a758fae966b',
        first_name: 'Pba',
        last_name: 'Pba',
        email: 'pba@dispostable.com',
        profile_photo:
          'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
        members: [
          {
            id: '3a758fae966b',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966c',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966d',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
          {
            id: '3a758fae966e',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
        ],
      },
    ],
    presenters_contacts: [
      {
        company: 'Creative Consulting',
        emailAddresses: [
          {
            email: 'anna-haro@mac.com',
            label: 'home',
          },
        ],
        familyName: 'Bell',
        givenName: 'Kate',
        hasThumbnail: false,
        jobTitle: 'Producer',
        middleName: '',
        phoneNumbers: [
          {
            label: 'home',
            number: '555-522-8243',
          },
        ],
        postalAddresses: [
          {
            city: 'Sausalito',
            country: 'USA',
            label: 'home',
            postCode: '94965',
            region: 'CA',
            state: 'CA',
            street: '1001  Leavenworth Street',
          },
        ],
        recordID: 'AE18B251-39AB-452E-99E1-7809EBE7ECE9',
        thumbnailPath: '',
      },
    ],
    privacy: 'public',
    atendees_communities: [
      {
        id: '3a758fae966b',
        first_name: 'Pba',
        last_name: 'Pba',
        email: 'pba@dispostable.com',
        profile_photo:
          'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
        members: [
          {
            id: '3a758fae966b',
            first_name: 'Pba',
            last_name: 'Pba',
            email: 'pba@dispostable.com',
            profile_photo:
              'https://www.sunderland.ac.uk/assets/Upload/Your_Photo.png',
          },
        ],
      },
    ],
    atendees_contacts: [
      {
        company: 'Creative Consulting',
        emailAddresses: [
          {
            email: 'anna-haro@mac.com',
            label: 'home',
          },
        ],
        familyName: 'Bell',
        givenName: 'Kate',
        hasThumbnail: false,
        jobTitle: 'Producer',
        middleName: '',
        phoneNumbers: [
          {
            label: 'home',
            number: '555-522-8243',
          },
        ],
        postalAddresses: [
          {
            city: 'Sausalito',
            country: 'USA',
            label: 'home',
            postCode: '94965',
            region: 'CA',
            state: 'CA',
            street: '1001  Leavenworth Street',
          },
        ],
        recordID: 'AE18B251-39AB-452E-99E1-7809EBE7ECE9',
        thumbnailPath: '',
      },
    ],
  },
];

type State = {
  searchValue: string,
  events: any,
};

export default class EventFeedScreen extends React.Component<
  NavigationScreenConfigProps,
  State
> {
  static navigationOptions = props => ({
    header: <WhitePortal name={EVENT_FEED_ID} />,
  });

  state = {
    searchValue: '',
    events: EVENTS,
  };

  get filteredEvents(): Array<EventProps> {
    // filter by presenters, atendees, post_in and event name

    return this.state.events.filter((event: EventProps): boolean => {
      const contacts = [
        ...event.atendees_contacts,
        ...event.presenters_contacts,
      ].map((contact: Object): string => {
        return `${contact.givenName}${contact.middleName
          ? ` ${contact.middleName}`
          : ''}${contact.familyName ? ` ${contact.familyName}` : ''}`;
      });

      const communitiesMembers = [
        ...event.atendees_communities,
        ...event.presenters_communities,
      ].map((community: Object): string => {
        return `${community.members.first_name} ${community.members.last_name}`;
      });

      const post_in = event.post_in.map(
        (community: Object): string => community.name
      );

      const string = [
        ...contacts,
        ...communitiesMembers,
        ...post_in,
        event.name,
      ].join(' ');

      return string.includes(this.state.searchValue);
    });
  }

  componentDidMount() {
    // this.props.screenProps.openModalRoute({
    //   routeName: 'CreateEventModal',
    // });
  }

  _onChangeText = (searchValue: string) => {
    this.setState({ searchValue });
  };

  _onCreateEvent = () => {
    this.props.screenProps.openModalRoute({
      routeName: 'CreateEventModal',
    });
  };

  _onActionPress = (action: string, id: string) => {
    console.log('action', action, id);
  };

  render(): React$Node {
    return (
      <Screen>
        <BlackPortal name={EVENT_FEED_ID}>
          <EventFeedHeader
            {...this.props}
            onChangeText={this._onChangeText}
            onPress={this._onCreateEvent}
            searchValue={this.state.searchValue}
          />
        </BlackPortal>

        <Text
          size={12}
          color={getColor('gray')}
          weight="600"
          lineHeight={14}
          style={styles.text}
        >
          {plural(`${EVENTS.length} event(s)`, EVENTS.length).toUpperCase()}
        </Text>

        <View style={styles.container}>
          <EventFeed
            data={this.filteredEvents}
            onActionPress={this._onActionPress}
          />
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  text: {
    paddingTop: 20,
    paddingBottom: 7,
    paddingHorizontal: 10,
  },
});
