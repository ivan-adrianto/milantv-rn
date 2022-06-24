import {call, put, all, takeLatest} from 'redux-saga/effects';
import {register, login} from '../services/auth';
import {Types as AuthTypes, Creators as AuthActions} from '../redux/AuthRedux';
import {Creators as ProfileActions} from '../redux/ProfileRedux';
import {Creators as MoviesActions} from '../redux/MoviesRedux';
import {addBearerToken, removeBearerToken} from '../services/apiServices';
import * as Keychain from 'react-native-keychain';

/* ---- Register ---- */
function* registerSaga(action) {
  const data = action.data;
  try {
    const res = yield call(register, data);
    yield call(addBearerToken, res.data.data.token);
    Keychain.setInternetCredentials('token', 'token', res.data.data.token);
    yield put(AuthActions.registerSuccess(res.data));
    yield put(ProfileActions.getProfileRequest());
  } catch (error) {
    yield put(AuthActions.registerFailure(error.response.data?.message));
  }
}

export function* registerRequestSaga() {
  yield takeLatest(AuthTypes.REGISTER_REQUEST, registerSaga);
}

/* ---- Login ---- */
function* loginSaga(action) {
  const data = action.data;
  try {
    const res = yield call(login, data);
    yield put(AuthActions.loginSuccess(res.data.data));
    yield call(addBearerToken, res.data.data.token);
    Keychain.setInternetCredentials('token', 'token', res.data.data.token);
    yield put(ProfileActions.getProfileRequest());
  } catch (error) {
    yield put(AuthActions.loginFailure(error.response?.data?.message));
  }
}

export function* loginRequestSaga() {
  yield takeLatest(AuthTypes.LOGIN_REQUEST, loginSaga);
}

/* ---- Logout ---- */
function* logoutSaga() {
  try {
    yield call(removeBearerToken);
    yield put(MoviesActions.setKeyword(''));
    yield put(MoviesActions.setActiveGenre(''));
    Keychain.resetInternetCredentials('token');
  } catch (error) {}
}

export function* logoutRequestSaga() {
  yield takeLatest(AuthTypes.LOGOUT, logoutSaga);
}

export function* authSaga() {
  yield all([
    call(registerRequestSaga),
    call(loginRequestSaga),
    call(logoutRequestSaga),
  ]);
}
