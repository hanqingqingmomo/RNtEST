// @flow

import { cancel, fork, put, take, select } from 'redux-saga/effects';

import { requestWithCursor } from '../../utils/requestFactory';
import { selectTimeline } from '../selectors';
import { mergeEntity } from '../ducks/entities';
import {
  TIMELINE_LOAD,
  setTimelineState,
  type TimelineLoadAction,
} from '../ducks/timelines';

const fetchTimelineData = function remoteLikeSaga(action: TimelineLoadAction) {
  const { mergeMode, path, id, limit } = action.payload;

  function* _setTimelineState(state: *) {
    yield put(setTimelineState(id, state));
  }

  return function* fetchTimelineDataSaga() {
    const timeline = yield select(selectTimeline(id));

    yield _setTimelineState({
      [mergeMode === 'replace' ? 'refreshing' : 'loading']: true,
    });

    const { data: { data, meta } } = yield requestWithCursor(path, {
      next: mergeMode === 'replace' ? null : timeline.next,
      limit,
    });

    // TODO probably merge entity could be replaced by saga listener
    yield put(mergeEntity(data));
    yield _setTimelineState({
      loading: false,
      refreshing: false,
      next: meta.cursor.next,
      content:
        mergeMode === 'replace' ? data : (timeline.content || []).concat(data),
    });
  };
};

/**
 * Root saga
 */
const timelineSaga = function* timelineSaga(): Generator<*, *, *> {
  const tasks = {};

  while (true) {
    const action: TimelineLoadAction = yield take(TIMELINE_LOAD);
    const taskId = action.payload.id;

    if (tasks[taskId]) {
      yield cancel(tasks[taskId]);
    }

    tasks[taskId] = yield fork(fetchTimelineData(action));
  }
};

export default timelineSaga;
