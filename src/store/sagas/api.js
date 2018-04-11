// @flow
import { takeEvery, put } from 'redux-saga/effects';

import { API_REQUEST } from '../apiAction';

function* api({ types, call, deferred, ...rest }) {
  const [REQUEST, SUCCESS, FAILURE] = types;
  yield put({ ...rest, type: REQUEST });
  try {
    const result = yield call();
    yield put({ ...rest, type: SUCCESS, result });
    if (deferred && typeof deferred.resolve === 'function') {
      deferred.resolve(result);
    }
  } catch (error) {
    yield put({ ...rest, type: FAILURE, error });
    if (deferred && typeof deferred.reject === 'function') {
      deferred.reject(error);
    }
  }
}

// f(): Generator<Yield, Return, Next>
export default function*(): Generator<*, *, *> {
  yield takeEvery(API_REQUEST, api);
}
