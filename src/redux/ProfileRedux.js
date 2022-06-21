import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const {Types, Creators} = createActions({
  // get profile
  getProfileRequest: ['data'],
  getProfileSuccess: ['payload'],
  getProfileFailure: ['error'],
});

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoadingGetProfile: false,
  dataGetProfile: null,
  errorGetProfile: null,
});

/* ------------- Reducers ------------- */

// Register
export const getProfileRequest = state =>
  state.merge({isLoadingGetProfile: true, dataGetProfile: null});

export const getProfileSuccess = (state, action) => {
  const {payload} = action;
  return state.merge({
    isLoadingGetProfile: false,
    errorGetProfile: null,
    dataGetProfile: payload,
  });
};

export const getProfileFailure = (state, action) => {
  const {error} = action;
  return state.merge({
    isLoadingGetProfile: false,
    errorGetProfile: error,
    dataGetProfile: null,
  });
};

/* ------------- Hookup Reducers To Type ------------- */

export const profileReducer = createReducer(INITIAL_STATE, {
  // get profile
  [Types.GET_PROFILE_REQUEST]: getProfileRequest,
  [Types.GET_PROFILE_SUCCESS]: getProfileSuccess,
  [Types.GET_PROFILE_FAILURE]: getProfileFailure,
});
