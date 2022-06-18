import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const {Types, Creators} = createActions({
  // genre
  genreRequest: ['data'],
  genreSuccess: ['payload'],
  genreFailure: ['error'],

  // setKeyword
  setKeyword: ['data'],

  // movies
  moviesRequest: ['data'],
  moviesSuccess: ['payload'],
  moviesFailure: ['error'],

  // movie
  movieRequest: ['data'],
  movieSuccess: ['payload'],
  movieFailure: ['error'],

  // create review
  createReviewRequest: ['data'],
  createReviewSuccess: ['payload'],
  createReviewFailure: ['error'],
  resetStateCreateReview: ['data'],

  // get reviews by movie
  reviewsByMovieRequest: ['data'],
  reviewsByMovieSuccess: ['payload'],
  reviewsByMovieFailure: ['error'],

  // my reviews
  myReviewsRequest: ['data'],
  myReviewsSuccess: ['payload'],
  myReviewsFailure: ['error'],

  // detail review
  detailReviewRequest: ['data'],
  detailReviewSuccess: ['payload'],
  detailReviewFailure: ['error'],

  // edit review
  editReviewRequest: ['data'],
  editReviewSuccess: ['payload'],
  editReviewFailure: ['error'],
  resetStateEditReview: ['data'],

  // delete review
  deleteReviewRequest: ['data'],
  deleteReviewSuccess: ['payload'],
  deleteReviewFailure: ['error'],
  resetStateDeleteReview: ['data'],
});

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  keyword: '',
  isLoadingGenre: false,
  dataGenre: null,
  errorGenre: null,
  isLoadingMovies: false,
  dataMovies: null,
  errorMovies: null,
  isLoadingMovie: false,
  dataMovie: null,
  errorMovie: null,
  isLoadingCreateReview: false,
  dataCreateReview: null,
  errorCreateReview: null,
  isLoadingReviewsByMovie: false,
  dataReviewsByMovie: null,
  errorReviewsByMovie: null,
  isLoadingMyReviews: false,
  dataMyReviews: null,
  errorMyReviews: null,
  isLoadingDetailReview: false,
  dataDetailReview: null,
  errorDetailReview: null,
  isLoadingEditReview: false,
  dataEditReview: null,
  errorEditReview: null,
  isLoadingDeleteReview: false,
  dataDeleteReview: null,
  errorDeleteReview: null,
});

/* ------------- Reducers ------------- */

// Genre
export const genreRequest = state =>
  state.merge({isLoadingGenre: true, dataGenre: null});

export const genreSuccess = (state, action) => {
  const {payload} = action;
  return state.merge({
    isLoadingGenre: false,
    errorGenre: null,
    dataGenre: payload,
    isLoggedIn: true,
  });
};

export const genreFailure = (state, action) => {
  const {error} = action;
  return state.merge({
    isLoadingGenre: false,
    errorGenre: error,
    dataGenre: null,
  });
};

// Movies
export const setKeyword = (state, action) => {
  const {data} = action;
  return state.merge({keyword: data});
};

export const moviesRequest = state =>
  state.merge({isLoadingMovies: true, dataMovies: null});

export const moviesSuccess = (state, action) => {
  const {payload} = action;
  return state.merge({
    isLoadingMovies: false,
    errorMovies: null,
    dataMovies: payload,
    isLoggedIn: true,
  });
};

export const moviesFailure = (state, action) => {
  const {error} = action;
  return state.merge({
    isLoadingMovies: false,
    errorMovies: error,
    dataMovies: null,
  });
};

// Movie
export const movieRequest = state =>
  state.merge({isLoadingMovie: true, dataMovie: null});

export const movieSuccess = (state, action) => {
  const {payload} = action;
  return state.merge({
    isLoadingMovie: false,
    errorMovie: null,
    dataMovie: payload,
    isLoggedIn: true,
  });
};

export const movieFailure = (state, action) => {
  const {error} = action;
  return state.merge({
    isLoadingMovie: false,
    errorMovie: error,
    dataMovie: null,
  });
};

// Create Review
export const createReviewRequest = state =>
  state.merge({isLoadingCreateReview: true, dataCreateReview: null});

export const createReviewSuccess = (state, action) => {
  const {payload} = action;
  return state.merge({
    isLoadingCreateReview: false,
    errorCreateReview: null,
    dataCreateReview: payload,
    isLoggedIn: true,
  });
};

export const createReviewFailure = (state, action) => {
  const {error} = action;
  return state.merge({
    isLoadingCreateReview: false,
    errorCreateReview: error,
    dataCreateReview: null,
  });
};

export const resetStateCreateReview = state => {
  return state.merge({
    isLoadingCreateReview: false,
    dataCreateReview: null,
    errorCreateReview: null,
  });
};

// Reviews by movie
export const reviewsByMovieRequest = state =>
  state.merge({isLoadingReviewsByMovie: true, dataReviewsByMovie: null});

export const reviewsByMovieSuccess = (state, action) => {
  const {payload} = action;
  return state.merge({
    isLoadingReviewsByMovie: false,
    errorReviewsByMovie: null,
    dataReviewsByMovie: payload,
    isLoggedIn: true,
  });
};

export const reviewsByMovieFailure = (state, action) => {
  const {error} = action;
  return state.merge({
    isLoadingReviewsByMovie: false,
    errorReviewsByMovie: error,
    dataReviewsByMovie: null,
  });
};

// My Reviews
export const myReviewsRequest = state =>
  state.merge({isLoadingMyReviews: true, dataMyReviews: null});

export const myReviewsSuccess = (state, action) => {
  const {payload} = action;
  return state.merge({
    isLoadingMyReviews: false,
    errorMyReviews: null,
    dataMyReviews: payload,
    isLoggedIn: true,
  });
};

export const myReviewsFailure = (state, action) => {
  const {error} = action;
  return state.merge({
    isLoadingMyReviews: false,
    errorMyReviews: error,
    dataMyReviews: null,
  });
};

// Detail Review
export const detailReviewRequest = state =>
  state.merge({isLoadingDetailReview: true, dataDetailReview: null});

export const detailReviewSuccess = (state, action) => {
  const {payload} = action;
  return state.merge({
    isLoadingDetailReview: false,
    errorDetailReview: null,
    dataDetailReview: payload,
    isLoggedIn: true,
  });
};

export const detailReviewFailure = (state, action) => {
  const {error} = action;
  return state.merge({
    isLoadingDetailReview: false,
    errorDetailReview: error,
    dataDetailReview: null,
  });
};

// Edit Review
export const editReviewRequest = state =>
  state.merge({isLoadingEditReview: true, dataEditReview: null});

export const editReviewSuccess = (state, action) => {
  const {payload} = action;
  return state.merge({
    isLoadingEditReview: false,
    errorEditReview: null,
    dataEditReview: payload,
    isLoggedIn: true,
  });
};

export const editReviewFailure = (state, action) => {
  const {error} = action;
  return state.merge({
    isLoadingEditReview: false,
    errorEditReview: error,
    dataEditReview: null,
  });
};

export const resetStateEditReview = state => {
  return state.merge({
    isLoadingEditReview: false,
    dataEditReview: null,
    errorEditReview: null,
  });
};

// Delete Review
export const deleteReviewRequest = state =>
  state.merge({isLoadingDeleteReview: true, dataDeleteReview: null});

export const deleteReviewSuccess = (state, action) => {
  const {payload} = action;
  return state.merge({
    isLoadingDeleteReview: false,
    errorDeleteReview: null,
    dataDeleteReview: payload,
    isLoggedIn: true,
  });
};

export const deleteReviewFailure = (state, action) => {
  const {error} = action;
  return state.merge({
    isLoadingDeleteReview: false,
    errorDeleteReview: error,
    dataDeleteReview: null,
  });
};

export const resetStateDeleteReview = state => {
  return state.merge({
    isLoadingDeleteReview: false,
    dataDeleteReview: null,
    errorDeleteReview: null,
  });
};

/* ------------- Hookup Reducers To Type ------------- */

export const moviesReducer = createReducer(INITIAL_STATE, {
  // genre
  [Types.GENRE_REQUEST]: genreRequest,
  [Types.GENRE_SUCCESS]: genreSuccess,
  [Types.GENRE_FAILURE]: genreFailure,

  // movies
  [Types.SET_KEYWORD]: setKeyword,
  [Types.MOVIES_REQUEST]: moviesRequest,
  [Types.MOVIES_SUCCESS]: moviesSuccess,
  [Types.MOVIES_FAILURE]: moviesFailure,

  // movie
  [Types.MOVIE_REQUEST]: movieRequest,
  [Types.MOVIE_SUCCESS]: movieSuccess,
  [Types.MOVIE_FAILURE]: movieFailure,

  // create review
  [Types.CREATE_REVIEW_REQUEST]: createReviewRequest,
  [Types.CREATE_REVIEW_SUCCESS]: createReviewSuccess,
  [Types.CREATE_REVIEW_FAILURE]: createReviewFailure,
  [Types.RESET_STATE_CREATE_REVIEW]: resetStateCreateReview,

  // create review
  [Types.REVIEWS_BY_MOVIE_REQUEST]: reviewsByMovieRequest,
  [Types.REVIEWS_BY_MOVIE_SUCCESS]: reviewsByMovieSuccess,
  [Types.REVIEWS_BY_MOVIE_FAILURE]: reviewsByMovieFailure,

  // my reviews
  [Types.MY_REVIEWS_REQUEST]: myReviewsRequest,
  [Types.MY_REVIEWS_SUCCESS]: myReviewsSuccess,
  [Types.MY_REVIEWS_FAILURE]: myReviewsFailure,

  // detail review
  [Types.DETAIL_REVIEW_REQUEST]: detailReviewRequest,
  [Types.DETAIL_REVIEW_SUCCESS]: detailReviewSuccess,
  [Types.DETAIL_REVIEW_FAILURE]: detailReviewFailure,

  // edit review
  [Types.EDIT_REVIEW_REQUEST]: editReviewRequest,
  [Types.EDIT_REVIEW_SUCCESS]: editReviewSuccess,
  [Types.EDIT_REVIEW_FAILURE]: editReviewFailure,
  [Types.RESET_STATE_EDIT_REVIEW]: resetStateEditReview,

  // edit review
  [Types.DELETE_REVIEW_REQUEST]: deleteReviewRequest,
  [Types.DELETE_REVIEW_SUCCESS]: deleteReviewSuccess,
  [Types.DELETE_REVIEW_FAILURE]: deleteReviewFailure,
  [Types.RESET_STATE_DELETE_REVIEW]: resetStateDeleteReview,
});
