// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WhitePortal, BlackPortal } from 'react-native-portal';
import { type NavigationProp } from 'react-navigation';

import { selectUser, selectRequest } from '../redux/selectors';
import type { User, LinkAttachment } from '../Types';
import { Screen, NavigationTextButton } from '../atoms';
import PostEditor from '../blocks/PostEditor/PostEditor';
import { createPost } from '../redux/ducks/contentObject';

type Props = {
  user: User,
  navigation: NavigationProp<{}>,
  createPost: Function,
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
  request: selectRequest('req:content-object:create', state),
});

class PostEditorScreen extends Component<Props, State> {
  static navigationOptions = {
    title: 'Start New Conversation',
    headerRight: <WhitePortal name={HEADER_RIGHT_ID} />,
  };

  state = {
    attachment: null,
    communitiesSelection: this.props.navigation.state.params
      ? [this.props.navigation.state.params.preselectedCommunityId]
      : [],
    content: '',
    link: null,
  };

  get busy(): boolean {
    return this.props.request && this.props.request.loading ? true : false;
  }

  get disabled(): boolean {
    return (
      this.busy ||
      this.state.content === '' ||
      this.state.communitiesSelection.length === 0
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.request &&
      this.props.request &&
      prevProps.request.loading === true &&
      this.props.request.loading === false
    ) {
      this.props.navigation.goBack();
    }
  }

  handleFormSubmit = async () => {
    // TODO make sure, state copies content object shape
    this.props.createPost({
      text_content: this.state.content || undefined,
      communities: this.state.communitiesSelection,
      attachment: this.state.attachment || undefined,
      cached_url: this.state.link ? this.state.link.url : undefined,
    });
  };

  onContentChange = (content: string) => {
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

  render() {
    return (
      <Screen fill keyboardShouldPersistTaps="always">
        <BlackPortal name={HEADER_RIGHT_ID}>
          <NavigationTextButton
            title={this.busy ? 'Sending' : 'Send'}
            disabled={this.disabled}
            onPress={this.handleFormSubmit}
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
    );
  }
}

export default connect(mapStateToProps, { createPost })(PostEditorScreen);
