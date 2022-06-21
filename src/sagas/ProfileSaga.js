import {call, put, all, takeLatest} from 'redux-saga/effects';
import {Types as ProfileTypes, Creators as ProfileActions} from '../redux/ProfileRedux';
import { getUser } from '../services/profile';

/* ---- Register ---- */
function* getProfileSaga() {
  try {
    const res = yield call(getUser);
    yield put(ProfileActions.getProfileSuccess(res.data.data));
  } catch (error) {
    yield put(ProfileActions.getProfileFailure(error.response.data?.message));
  }
}

export function* getProfileRequestSaga() {
  yield takeLatest(ProfileTypes.GET_PROFILE_REQUEST, getProfileSaga);
}

export function* profileSaga() {
  yield all([call(getProfileRequestSaga)]);
}
