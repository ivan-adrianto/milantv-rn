import { combineReducers } from 'redux'
import { authReducer } from './AuthRedux'
import { moviesReducer } from './MoviesRedux'
import { profileReducer } from './ProfileRedux'

export const rootReducer = combineReducers({
    auth: authReducer, 
    movies: moviesReducer,
    profile: profileReducer,
})



