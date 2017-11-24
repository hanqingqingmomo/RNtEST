// @flow

import {
  all,
  cancel,
  fork,
  takeEvery,
  put,
  take,
  select,
} from 'redux-saga/effects';
import update from 'immutability-helper';

import {
  createCommentReq,
  createPostReq,
  readContentObjectReq,
  destroyContentObjectReq,
  likeContentObjectReq,
  unlikeContentObjectReq,
  reportReq,
} from '../../utils/requestFactory';
import {
  CONTENT_CREATE_COMMENT,
  CONTENT_CREATE_POST,
  CONTENT_DESTROY,
  CONTENT_LIKE,
  CONTENT_REPORT,
  type ContentDestroyAction,
  type ContentLikeAction,
  type ContentReportAction,
  type CreateCommentAction,
  type CreatePostAction,
} from '../ducks/contentObject';
import {
  startRequest,
  endRequest,
  endRequestWithError,
} from '../ducks/requests';
import { selectEntity } from '../selectors';
import { mergeEntity, destroyEntity } from '../ducks/entities';
import { setTimelineContent, unsetTimelineContent } from '../ducks/timelines';

const fetchObjectSaga = function* fetchObjectSaga(id: string) {
  const { data } = yield readContentObjectReq(id);
  yield put(mergeEntity(data));
};

/**
 * CREATE saga
 */
const createContentSaga = function* createContentSaga(
  action: CreateCommentAction | CreatePostAction
) {
  const id = 'req:content-object:create';
  yield put(startRequest(id));
  const { data, ok } = yield (async function() {
    switch (action.type) {
      case CONTENT_CREATE_POST:
        return createPostReq(action.payload.object);
      case CONTENT_CREATE_COMMENT:
        const { parentId, content } = action.payload;
        return createCommentReq(parentId, content);
      default:
        break;
    }
  })();

  if (ok) {
    yield put(mergeEntity(data));
    if (data.type === 'post') {
      yield all(
        data.communities
          .map(comm => comm.id)
          .concat('content_objects/feed')
          .map(id => put(setTimelineContent(id, 'prepend', [data])))
      );
    }
    yield put(endRequest(id));
  } else {
    yield put(endRequestWithError(id, data));
  }

  if (data.parent_id) {
    yield fetchObjectSaga(data.parent_id);
  }
};

/**
 * DESTROY saga
 */
const destroySaga = function* destroySaga(action: ContentDestroyAction) {
  const { object } = action.payload;
  switch (object.type) {
    case 'post': {
      // Remove post reference from timelines
      yield all(
        object.communities
          .map(comm => comm.id)
          .concat('content_objects/feed')
          .map(id => put(unsetTimelineContent(id, [object.id])))
      );

      break;
    }

    case 'comment': {
      // Remove reply reference from post or parent reply
      const parent = yield select(selectEntity(object.parent_id));
      const nextParent = {
        ...parent,
        replies: parent.replies.filter(id => id !== object.id),
      };
      yield put(mergeEntity(nextParent));
      break;
    }
    default:
      break;
  }

  yield put(destroyEntity(object));
  yield destroyContentObjectReq(object);
};

/**
 * LIKE saga
 */
function localLikeSaga(object) {
  return function* forkedLocalLikeSaga() {
    yield put(
      mergeEntity(
        update(object, {
          liked: { $set: !object.liked },
          likes_count: {
            $set: object.likes_count + (object.liked ? -1 : 1),
          },
        })
      )
    );
  };
}

const remoteLikeSaga = function remoteLikeSaga(object) {
  return function* forkedRemoteLikeSaga() {
    const { data } = yield object.liked
      ? unlikeContentObjectReq(object)
      : likeContentObjectReq(object);
    yield put(mergeEntity(data));
  };
};

const watchLike = function* watchLike() {
  const tasks = {};
  while (true) {
    const action: ContentLikeAction = yield take(CONTENT_LIKE);
    const { object } = action.payload;
    yield fork(localLikeSaga(object));

    if (tasks[object.id]) {
      yield cancel(tasks[object.id]);
    }

    tasks[object.id] = yield fork(remoteLikeSaga(object));
  }
};

/**
 * REPORT saga
 */
const reportSaga = function* reportSaga(action: ContentReportAction) {
  const { object } = action.payload;
  try {
    global.alertWithType(
      'success',
      'Thanks!',
      'Your report has been successfully received and will be reviewed by our support staff.'
    );
    yield reportReq(object);
  } catch (error) {
    global.alertWithType('error', 'Ooops', error.message);
  }
};

/**
 * Root saga
 */
const contentObjectSaga = function* contentObjectSaga(): Generator<*, *, *> {
  yield fork(watchLike);
  yield takeEvery(CONTENT_CREATE_POST, createContentSaga);
  yield takeEvery(CONTENT_CREATE_COMMENT, createContentSaga);
  yield takeEvery(CONTENT_DESTROY, destroySaga);
  yield takeEvery(CONTENT_REPORT, reportSaga);
};

export default contentObjectSaga;
