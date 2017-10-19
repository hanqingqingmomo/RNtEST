// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WhitePortal, BlackPortal } from 'react-native-portal';

import { selectUser } from '../redux/selectors';
import { type User } from '../Types';
import { Screen, NavigationTextButton, DropdownAlert, Fetch } from '../atoms';
import PostEditor from '../blocks/PostEditor/PostEditor';
import { type AlertPayload } from '../atoms/DropdownAlert';
import { makeCreatePostReq } from '../utils/requestFactory';

type Props = {
  user: User,
};

type State = {
  data: Object,
};

const HEADER_RIGHT_ID = 'PostEditor:HeaderRight';

const mapStateToProps = state => ({
  user: selectUser(state),
});

@connect(mapStateToProps)
export default class PostEditorScreen extends Component<Props, State> {
  static navigationOptions = {
    title: 'Start New Conversation',
    headerRight: <WhitePortal name={HEADER_RIGHT_ID} />,
  };

  state = {
    data: {
      attachment: null,
      communities: [],
      text_content: '',
    },
  };

  dropdown = null;

  handleFormSubmit = (fetch: any) => async () => {
    const createPostReq = makeCreatePostReq(this.state.data);
    const createPostRes = await fetch(createPostReq.url, createPostReq.options);

    if (createPostRes.error) {
      if (this.dropdown) {
        this.dropdown.alertWithType(
          'error',
          'Ooops',
          (createPostRes.error.message: string)
        );
      }
    } else if (this.dropdown) {
      if (this.dropdown) {
        this.dropdown.alertWithType(
          'success',
          'Thanks!',
          'Your post has been successfully created.'
        );
      }
    }
  };

  onAlertClose = (data: AlertPayload) => {
    if (data.type === 'success') {
      this.props.navigation.goBack();
    }
  };

  onChange = (data: Object) => {
    this.setState({ data });
  };

  get isAllowedToSubmit(): boolean {
    const { data } = this.state;

    return !!data.text_content && data.communities.length > 0;
  }

  render() {
    return (
      <Fetch manual>
        {({ loading, data, error, fetch }) => (
          <Screen fill>
            <BlackPortal name={HEADER_RIGHT_ID}>
              <NavigationTextButton
                title="Post"
                disabled={!this.isAllowedToSubmit || loading}
                onPress={this.handleFormSubmit(fetch)}
              />
            </BlackPortal>

            <PostEditor user={this.props.user} onChange={this.onChange} />

            <DropdownAlert
              ref={ref => (this.dropdown = ref)}
              onClose={this.onAlertClose}
            />
          </Screen>
        )}
      </Fetch>
    );
  }
}
