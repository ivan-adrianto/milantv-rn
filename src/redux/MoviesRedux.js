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
});
