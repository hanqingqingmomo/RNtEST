// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WhitePortal, BlackPortal } from 'react-native-portal';

import { selectUser } from '../redux/selectors';
import type { User, Attachment } from '../Types';
import { Screen, NavigationTextButton, DropdownAlert, Fetch } from '../atoms';
import PostEditor from '../blocks/PostEditor/PostEditor';
import { type AlertPayload } from '../atoms/DropdownAlert';
import { makeCreatePostReq } from '../utils/requestFactory';

type Props = {
  user: User,
};

type State = {
  attachment: ?Attachment,
  content: string,
  communitiesSelection: Array<string>,
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
    attachment: null,
    communitiesSelection: [],
    content: '',
  };

  dropdown = null;

  handleFormSubmit = (fetch: any) => async () => {
    const createPostReq = makeCreatePostReq(
      this.state.content,
      this.state.communitiesSelection
    );

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

  onContentChange = (content: string) => {
    this.setState({ content });
  };

  onAttachmentChange = (attachment: ?Attachment) => {
    this.setState({ attachment });
  };

  onCommunitiesChange = (communitiesSelection: Array<string>) => {
    this.setState({ communitiesSelection });
  };

  get isAllowedToSubmit(): boolean {
    const { content, communitiesSelection } = this.state;

    return !!content && communitiesSelection.length > 0;
  }

  render() {
    return (
      <Fetch manual>
        {({ loading, data, error, fetch }: { loading: boolean }) => (
          <Screen fill>
            <BlackPortal name={HEADER_RIGHT_ID}>
              <NavigationTextButton
                title="Post"
                disabled={!this.isAllowedToSubmit || loading}
                onPress={this.handleFormSubmit(fetch)}
              />
            </BlackPortal>

            <PostEditor
              attachment={this.state.attachment}
              onAttachmentChange={this.onAttachmentChange}
              content={this.state.content}
              onContentChange={this.onContentChange}
              communities={this.props.user.joined_communities}
              communitiesSelection={this.state.communitiesSelection}
              onCommunitiesChange={this.onCommunitiesChange}
            />

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
