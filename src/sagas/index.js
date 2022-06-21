import { all, call } from 'redux-saga/effects'
import { authSaga } from './AuthSaga'
import { moviesSaga } from './MoviesSaga'
import { profileSaga } from './ProfileSaga'

export default function * rootSaga () {
  yield all([
    call(authSaga),
    call(moviesSaga),
    call(profileSaga)
  ])
}