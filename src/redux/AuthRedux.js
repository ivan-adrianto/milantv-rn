import {createActions, createReducer} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

export const {Types, Creators} = createActions({
  // register
  registerRequest: ['data'],
  registerSuccess: ['payload'],
  registerFailure: ['error'],
  resetRegisterState: ['data'],

  loginRequest: ['data'],
  loginSuccess: ['payload'],
  loginFailure: ['error'],
  resetLoginState: ['data'],

  restoreLoginSession: ['data'],

  logout: ['data'],
});

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoggedIn: false,
  isLoadingRegister: false,
  dataRegister: null,
  errorRegister: null,
  isLoadingLogin: false,
  dataLogin: null,
  errorLogin: null,
});

/* ------------- Reducers ------------- */

// Restore login session
export const restoreLoginSession = (state, {data}) => {
  return state.merge({
    isLoggedIn: true,
  });
};

// Register
export const registerRequest = state =>
  state.merge({isLoadingRegister: true, dataRegister: null});

export const registerSuccess = (state, action) => {
  const {payload} = action;
  return state.merge({
    isLoadingRegister: false,
    errorRegister: null,
    dataRegister: payload,
    isLoggedIn: true,
  });
};

export const registerFailure = (state, action) => {
  const {error} = action;
  return state.merge({
    isLoadingRegister: false,
    errorRegister: error,
    dataRegister: null,
  });
};

export const resetRegisterState = state =>
  state.merge({
    isLoadingRegister: false,
    dataRegister: null,
    errorRegister: null,
  });

// Login
export const loginRequest = state =>
  state.merge({isLoadingLogin: true, dataLogin: null});

export const loginSuccess = (state, action) => {
  const {payload} = action;
  return state.merge({
    isLoadingLogin: false,
    errorLogin: null,
    dataLogin: payload,
    isLoggedIn: true,
  });
};

export const loginFailure = (state, action) => {
  const {error} = action;
  return state.merge({
    isLoadingLogin: false,
    errorLogin: error,
    dataLogin: null,
  });
};

export const resetLoginState = state =>
  state.merge({
    isLoadingLogin: false,
    dataLogin: null,
    errorLogin: null,
  });

// logout
export const logout = state =>
  state.merge({
    isLoggedIn: false
  });

/* ------------- Hookup Reducers To Type ------------- */

export const authReducer = createReducer(INITIAL_STATE, {
  // restore login session
  [Types.RESTORE_LOGIN_SESSION]: restoreLoginSession,

  // register
  [Types.REGISTER_REQUEST]: registerRequest,
  [Types.REGISTER_SUCCESS]: registerSuccess,
  [Types.REGISTER_FAILURE]: registerFailure,
  [Types.RESET_REGISTER_STATE]: resetRegisterState,

  // login
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.RESET_LOGIN_STATE]: resetLoginState,

  // logout
  [Types.LOGOUT]: logout,
});
