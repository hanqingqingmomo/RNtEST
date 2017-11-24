// @flow

export const CONTENT_CREATE_COMMENT = 'content-object/create-comment';
export const CONTENT_CREATE_POST = 'content-object/create-post';
export const CONTENT_DESTROY = 'content-object/destroy';
export const CONTENT_LIKE = 'content-object/like';
export const CONTENT_REPORT = 'content-object/report';

//
// Typedefs
//

type ContentObject = {
  text_content: string,
  communities: Array<string>,
  attachment?: ?string,
  cached_url?: ?string,
};

export type PostObject = {
  id: string,
  likes_count: number,
  liked: number,
  type: 'post',
};

export type CommentObject = {
  id: string,
  likes_count: number,
  liked: number,
  type: 'comment',
};

export type UserObject = {
  id: string,
  type: 'user',
};

export type RemoteContentObjectBase = PostObject | CommentObject | UserObject;

export type CreatePostAction = {
  type: typeof CONTENT_CREATE_POST,
  payload: {
    object: ContentObject,
  },
};

export type CreateCommentAction = {
  type: typeof CONTENT_CREATE_COMMENT,
  payload: {
    parentId: string,
    content: string,
  },
};

export type ContentDestroyAction = {
  type: typeof CONTENT_DESTROY,
  payload: {
    object: RemoteContentObjectBase,
  },
};

export type ContentLikeAction = {
  type: typeof CONTENT_LIKE,
  payload: {
    object: RemoteContentObjectBase,
  },
};

export type ContentReportAction = {
  type: typeof CONTENT_REPORT,
  payload: {
    object: RemoteContentObjectBase,
  },
};

//
// Action creators
//

export function createPost(object: ContentObject): CreatePostAction {
  return {
    type: CONTENT_CREATE_POST,
    payload: {
      object,
    },
  };
}
export function createComment(
  parentId: string,
  content: string
): CreateCommentAction {
  return {
    type: CONTENT_CREATE_COMMENT,
    payload: { parentId, content },
  };
}

export function contentDestroy(
  object: RemoteContentObjectBase
): ContentDestroyAction {
  return {
    type: CONTENT_DESTROY,
    payload: { object },
  };
}

export function contentReport(
  object: RemoteContentObjectBase
): ContentReportAction {
  return {
    type: CONTENT_REPORT,
    payload: { object },
  };
}

export function contentLike(
  object: RemoteContentObjectBase
): ContentLikeAction {
  return {
    type: CONTENT_LIKE,
    payload: { object },
  };
}
