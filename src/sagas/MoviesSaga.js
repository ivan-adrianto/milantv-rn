import {call, put, all, takeLatest} from 'redux-saga/effects';
import {
  Types as MoviesTypes,
  Creators as MoviesActions,
} from '../redux/MoviesRedux';
import { getAllMovies, getGenres } from '../services/movies';

/* ---- Genre ---- */
function* genreSaga(action) {
  try {
    const res = yield call(getGenres);
    yield put(MoviesActions.genreSuccess(res.data.data));
  } catch (error) {
    yield put(MoviesActions.genreFailure(error.response.data?.message));
  }
}

export function* genreRequestSaga() {
  yield takeLatest(MoviesTypes.GENRE_REQUEST, genreSaga);
}

/* ---- All Movies ---- */
function* allMoviesSaga() {
  try {
    const res = yield call(getAllMovies);
    yield put(MoviesActions.moviesSuccess(res.data.data));
  } catch (error) {
    yield put(MoviesActions.moviesFailure(error.response.data?.message));
  }
}

export function* allMoviesRequestSaga() {
  yield takeLatest(MoviesTypes.MOVIES_REQUEST, allMoviesSaga);
}

export function* moviesSaga() {
  yield all([call(genreRequestSaga), call(allMoviesRequestSaga)]);
}
