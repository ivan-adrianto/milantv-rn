import { all, call } from 'redux-saga/effects'
import { authSaga } from './AuthSaga'
import { moviesSaga } from './MoviesSaga'

export default function * rootSaga () {
  yield all([
    call(authSaga),
    call(moviesSaga),
  ])
}