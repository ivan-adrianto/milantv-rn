import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const {Types, Creators} = createActions({
  // get profile
  getProfileRequest: ['data'],
  getProfileSuccess: ['payload'],
  getProfileFailure: ['error'],

  // update profile
  updateProfileRequest: ['data'],
  updateProfileSuccess: ['payload'],
  updateProfileFailure: ['error'],
  resetStateUpdateProfile: ['data'],
});

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoadingGetProfile: false,
  dataGetProfile: null,
  errorGetProfile: null,
  isLoadingUpdateProfile: false,
  dataUpdateProfile: null,
  errorUpdateProfile: null,
});

/* ------------- Reducers ------------- */

// Get Profile
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

// Update Profile
export const updateProfileRequest = state =>
  state.merge({isLoadingUpdateProfile: true, dataUpdateProfile: null});

export const updateProfileSuccess = (state, action) => {
  const {payload} = action;
  return state.merge({
    isLoadingUpdateProfile: false,
    errorUpdateProfile: null,
    dataUpdateProfile: payload,
  });
};

export const updateProfileFailure = (state, action) => {
  const {error} = action;
  return state.merge({
    isLoadingUpdateProfile: false,
    errorUpdateProfile: error,
    dataUpdateProfile: null,
  });
};

export const resetStateUpdateProfile = state =>
  state.merge({
    isLoadingUpdateProfile: false,
    dataUpdateProfile: null,
    errorUpdateProfile: null,
  });
/* ------------- Hookup Reducers To Type ------------- */

export const profileReducer = createReducer(INITIAL_STATE, {
  // get profile
  [Types.GET_PROFILE_REQUEST]: getProfileRequest,
  [Types.GET_PROFILE_SUCCESS]: getProfileSuccess,
  [Types.GET_PROFILE_FAILURE]: getProfileFailure,

  // update profile
  [Types.UPDATE_PROFILE_REQUEST]: updateProfileRequest,
  [Types.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
  [Types.UPDATE_PROFILE_FAILURE]: updateProfileFailure,
  [Types.RESET_STATE_UPDATE_PROFILE]: resetStateUpdateProfile,
});
