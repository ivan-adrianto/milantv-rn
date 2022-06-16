import {call, put, all, takeLatest} from 'redux-saga/effects';
import {
  Types as MoviesTypes,
  Creators as MoviesActions,
} from '../redux/MoviesRedux';
import {createReview, getAllMovies, getGenres, getMovie, getReviewsByMovie} from '../services/movies';

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


/* ---- Create Review ---- */
function* createReviewSaga(action) {
  try {
    const res = yield call(createReview, action.data);
    yield put(MoviesActions.createReviewSuccess(res.data.data));
  } catch (error) {
    yield put(MoviesActions.createReviewFailure(error.response.data?.message));
  }
}

export function* createReviewRequestSaga() {
  yield takeLatest(MoviesTypes.CREATE_REVIEW_REQUEST, createReviewSaga);
}


/* ---- Reviews By Movie ---- */
function* reviewsByMovieSaga(action) {
  console.log('action', action)
  try {
    const res = yield call(getReviewsByMovie, action.data);
    yield put(MoviesActions.reviewsByMovieSuccess(res.data.data));
  } catch (error) {
    console.log('error', error)
    yield put(MoviesActions.reviewsByMovieFailure(error.response.data?.message));
  }
}

export function* reviewsByMovieRequestSaga() {
  yield takeLatest(MoviesTypes.REVIEWS_BY_MOVIE_REQUEST, reviewsByMovieSaga);
}

export function* moviesSaga() {
  yield all([
    call(genreRequestSaga),
    call(allMoviesRequestSaga),
    call(movieRequestSaga),
    call(createReviewRequestSaga),
    call(reviewsByMovieRequestSaga)
  ]);
}
