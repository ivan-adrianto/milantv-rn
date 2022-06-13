import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const {Types, Creators} = createActions({
  // genre
  genreRequest: ['data'],
  genreSuccess: ['payload'],
  genreFailure: ['error'],

  // movies
  moviesRequest: ['data'],
  moviesSuccess: ['payload'],
  moviesFailure: ['error'],

});

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoadingGenre: false,
  dataGenre: null,
  errorGenre: null,
  isLoadingMovies: false,
  dataMovies: null,
  errorMovies: null,
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


/* ------------- Hookup Reducers To Type ------------- */

export const moviesReducer = createReducer(INITIAL_STATE, {
  // genre
  [Types.GENRE_REQUEST]: genreRequest,
  [Types.GENRE_SUCCESS]: genreSuccess,
  [Types.GENRE_FAILURE]: genreFailure,

  // movies
  [Types.MOVIES_REQUEST]: moviesRequest,
  [Types.MOVIES_SUCCESS]: moviesSuccess,
  [Types.MOVIES_FAILURE]: moviesFailure,

});
