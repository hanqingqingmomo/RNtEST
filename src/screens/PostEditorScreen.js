// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WhitePortal, BlackPortal } from 'react-native-portal';

import { selectUser } from '../redux/selectors';
import type { User, LinkAttachment } from '../Types';
import { Screen, NavigationTextButton, Fetch } from '../atoms';
import PostEditor from '../blocks/PostEditor/PostEditor';
import { type AlertPayload } from '../atoms/DropdownAlert';
import { makeCreatePostReq } from '../utils/requestFactory';

type Props = {
  user: User,
};

type State = {
  attachment: ?string,
  content: string,
  communitiesSelection: Array<string>,
  link: ?LinkAttachment,
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
    link: null,
  };

  dropdown = null;

  handleFormSubmit = (fetch: any) => async () => {
    const createPostReq = makeCreatePostReq(
      this.state.content,
      this.state.communitiesSelection,
      this.state.attachment,
      this.state.link ? this.state.link.url : undefined
    );

    const createPostRes = await fetch(createPostReq.url, createPostReq.options);

    if (createPostRes.error) {
      global.alertWithType(
        'error',
        'Ooops',
        (createPostRes.error.message: string)
      );
    } else {
      this.props.navigation.goBack();
      global.alertWithType(
        'success',
        'Thanks!',
        'Your post has been successfully created.'
      );
    }
  };

  onContentChange = (content: ?string) => {
    this.setState({ content });
  };

  onAttachmentChange = (attachment: ?string) => {
    this.setState({ attachment });
  };

  onCommunitiesChange = (communitiesSelection: Array<string>) => {
    this.setState({ communitiesSelection });
  };

  onLinkScraped = (link: ?LinkAttachment) => {
    this.setState({ link });
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
              link={this.state.link}
              onContentChange={this.onContentChange}
              communities={this.props.user.joined_communities}
              communitiesSelection={this.state.communitiesSelection}
              onCommunitiesChange={this.onCommunitiesChange}
              onLinkScraped={this.onLinkScraped}
            />
          </Screen>
        )}
      </Fetch>
    );
  }
}
