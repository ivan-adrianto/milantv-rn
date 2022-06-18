import {call, put, all, takeLatest} from 'redux-saga/effects';
import {
  Types as MoviesTypes,
  Creators as MoviesActions,
} from '../redux/MoviesRedux';
import {
  createReview,
  deleteReview,
  editReview,
  getAllMovies,
  getGenres,
  getMovie,
  getMyReviews,
  getReviewDetail,
  getReviewsByMovie,
} from '../services/movies';

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
  try {
    const res = yield call(getReviewsByMovie, action.data);
    yield put(MoviesActions.reviewsByMovieSuccess(res.data.data));
  } catch (error) {
    yield put(
      MoviesActions.reviewsByMovieFailure(error.response.data?.message),
    );
  }
}

export function* reviewsByMovieRequestSaga() {
  yield takeLatest(MoviesTypes.REVIEWS_BY_MOVIE_REQUEST, reviewsByMovieSaga);
}

/* ---- My Reviews ---- */
function* myReviewsSaga() {
  try {
    const res = yield call(getMyReviews);
    yield put(MoviesActions.myReviewsSuccess(res.data.data));
  } catch (error) {
    yield put(MoviesActions.myReviewsFailure(error.response.data?.message));
  }
}

export function* myReviewsRequestSaga() {
  yield takeLatest(MoviesTypes.MY_REVIEWS_REQUEST, myReviewsSaga);
}

/* ---- Detail Review ---- */
function* detailReviewSaga(action) {
  try {
    const res = yield call(getReviewDetail, action.data);
    yield put(MoviesActions.detailReviewSuccess(res.data.data));
  } catch (error) {
    yield put(MoviesActions.detailReviewFailure(error.response.data?.message));
  }
}

export function* detailReviewRequestSaga() {
  yield takeLatest(MoviesTypes.DETAIL_REVIEW_REQUEST, detailReviewSaga);
}

/* ---- Edit Review ---- */
function* editReviewSaga(action) {
  try {
    const res = yield call(editReview, action.data);
    yield put(MoviesActions.editReviewSuccess(res.data.data));
  } catch (error) {
    yield put(MoviesActions.editReviewFailure(error.response.data?.message));
  }
}

export function* editReviewRequestSaga() {
  yield takeLatest(MoviesTypes.EDIT_REVIEW_REQUEST, editReviewSaga);
}

/* ---- Delete Review ---- */
function* deleteReviewSaga(action) {
  try {
    const res = yield call(deleteReview, action.data);
    yield put(MoviesActions.deleteReviewSuccess(res.data.data));
  } catch (error) {
    yield put(MoviesActions.deleteReviewFailure(error.response.data?.message));
  }
}

export function* deleteReviewRequestSaga() {
  yield takeLatest(MoviesTypes.DELETE_REVIEW_REQUEST, deleteReviewSaga);
}

export function* moviesSaga() {
  yield all([
    call(genreRequestSaga),
    call(allMoviesRequestSaga),
    call(movieRequestSaga),
    call(createReviewRequestSaga),
    call(reviewsByMovieRequestSaga),
    call(myReviewsRequestSaga),
    call(detailReviewRequestSaga),
    call(editReviewRequestSaga),
    call(deleteReviewRequestSaga),
  ]);
}
