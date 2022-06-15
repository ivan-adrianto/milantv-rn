import {call, put, all, takeLatest} from 'redux-saga/effects';
import {
  Types as MoviesTypes,
  Creators as MoviesActions,
} from '../redux/MoviesRedux';
import {getAllMovies, getGenres, getMovie} from '../services/movies';

/* ---- Genre ---- */
function* genreSaga() {
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
function* allMoviesSaga(action) {
  try {
    const res = yield call(getAllMovies, action.data);
    yield put(MoviesActions.moviesSuccess(res.data.data));
  } catch (error) {
    yield put(MoviesActions.moviesFailure(error.response.data?.message));
  }
}

export function* allMoviesRequestSaga() {
  yield takeLatest(MoviesTypes.MOVIES_REQUEST, allMoviesSaga);
}

/* ---- Movie Detail ---- */
function* movieSaga(action) {
  try {
    const res = yield call(getMovie, action.data);
    yield put(MoviesActions.movieSuccess(res.data.data));
  } catch (error) {
    yield put(MoviesActions.movieFailure(error.response.data?.message));
  }
}

export function* movieRequestSaga() {
  yield takeLatest(MoviesTypes.MOVIE_REQUEST, movieSaga);
}

export function* moviesSaga() {
  yield all([
    call(genreRequestSaga),
    call(allMoviesRequestSaga),
    call(movieRequestSaga),
  ]);
}
