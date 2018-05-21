// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CommentInput as CommentInputAtom } from '../../atoms';
import { selectRequest } from '../../redux/selectors';
import { createComment } from '../../redux/ducks/contentObject';
import { type Comment } from '../../Types';

type Props = {
  createComment: typeof createComment,
  onCreateComment: Function,
  onReplyCancel: Function,
  passRef: Function,
  request: Object,
  target: { id: string } | Comment,
};

class CommentInput extends Component<Props> {
  get busy(): boolean {
    const { request } = this.props;
    return request && request.loading ? true : false;
  }

  render() {
    return (
      <CommentInputAtom
        busy={this.busy}
        onCreateComment={this.props.createComment}
        onReplyCancel={this.props.onReplyCancel}
        passRef={this.props.passRef}
        target={this.props.target}
      />
    );
  }
}

export default connect(
  state => ({
    request: selectRequest('req:content-object:create', state),
  }),
  { createComment }
)(CommentInput);
