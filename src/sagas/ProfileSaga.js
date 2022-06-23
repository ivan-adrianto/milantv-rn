import {call, put, all, takeLatest} from 'redux-saga/effects';
import {
  Types as ProfileTypes,
  Creators as ProfileActions,
} from '../redux/ProfileRedux';
import {getUser, updateProfile} from '../services/profile';

/* ---- Get Profile ---- */
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

/* ---- Update Profile ---- */
function* updateProfileSaga(action) {
  try {
    const res = yield call(updateProfile, action.data);
    yield put(ProfileActions.updateProfileSuccess(res.data.data));
  } catch (error) {
    yield put(
      ProfileActions.updateProfileFailure(error.response.data?.message || 'System Error'),
    );
  }
}

export function* updateProfileRequestSaga() {
  yield takeLatest(ProfileTypes.UPDATE_PROFILE_REQUEST, updateProfileSaga);
}

export function* profileSaga() {
  yield all([call(getProfileRequestSaga), call(updateProfileRequestSaga)]);
}
